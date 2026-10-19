'use client';

import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import {
  EventFormValues,
  eventFieldTabs,
  eventFormSchema,
} from '../../models/event-schema';
import { FormField, FormFieldType } from '../../models/form-schema';
import {
  createEvent,
  publishEvent,
  updateEvent,
} from '../../services/event-service';
import {
  createFormSchema,
  updateFormSchema,
} from '../../services/form-schema-service';
import { defaultSchemaFields } from './default-fields';

interface EventCreationContextType {
  // Form state
  form: UseFormReturn<EventFormValues>;
  richTextDescription: string;
  setRichTextDescription: (value: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  submitting: boolean;

  // Form submission. 'draft' / 'publish' set the status, 'keep' leaves it.
  handleSubmit: (mode?: SubmitMode) => Promise<void>;

  // Registration form builder state
  formTitle: string;
  setFormTitle: (title: string) => void;
  formDescription: string;
  setFormDescription: (description: string) => void;
  formSchemaId: string | null;
  setFormSchemaId: (id: string | null) => void;
  fields: FormField[];
  setFields: (fields: FormField[]) => void;
  activeField: string | null;
  setActiveField: (id: string | null) => void;
  formBuilderActiveTab: string;
  setFormBuilderActiveTab: (tab: string) => void;
  isFormLoading: boolean;

  // Registration form builder methods
  moveField: (index: number, direction: 'up' | 'down') => void;
  addField: (type: FormFieldType) => void;
  updateField: (id: string, updates: Partial<FormField>) => void;
  deleteField: (id: string) => void;
  saveFormSchema: (eventId: string) => Promise<string>;

  // Navigation
  navigateBack: () => void;

  // Event form state
  eventId: string | null;
  setEventId: (id: string | null) => void;

  // New fields
  redirectAfterSubmit: boolean;
  setRedirectAfterSubmit: (redirect: boolean) => void;

  // Reset fields state with new array
  resetFields: (newFields: FormField[]) => void;
}

export type SubmitMode = 'draft' | 'publish' | 'keep';

const EventCreationContext = createContext<
  EventCreationContextType | undefined
>(undefined);

export function EventCreationProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { toast } = useToast();

  // Event form state
  const [richTextDescription, setRichTextDescription] = useState('');
  const [activeTab, setActiveTab] = useState('details');
  const [submitting, setSubmitting] = useState(false);

  // Registration form builder state
  const [formTitle, setFormTitle] = useState('Event Registration Form');
  const [formDescription, setFormDescription] = useState('');
  const [formSchemaId, setFormSchemaId] = useState<string | null>(null);
  const [fields, setFields] = useState<FormField[]>(defaultSchemaFields);
  const [activeField, setActiveField] = useState<string | null>(null);
  const [formBuilderActiveTab, setFormBuilderActiveTab] = useState('fields');
  const [isFormLoading, setIsFormLoading] = useState(false);
  // Event form state
  const [eventId, setEventId] = useState<string | null>(null);

  // New fields
  const [redirectAfterSubmit, setRedirectAfterSubmit] = useState(true);

  // Default values for the event form
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      bannerImageUrl: '',
      galleryImages: [],
      videoUrl: '',
      title: '',
      theme: '',
      description: '',
      location: '',
      eventType: 'physical',
      eventLink: '',
      price: 0,
      hasEarlyBird: false,
      isFree: false,
      requireApproval: false,
      whatsappLink: '',
    },
  });

  // Navigation methods
  const navigateBack = () => {
    router.push('/admin/events');
  };

  // Send the admin to the tab holding the first invalid field
  const showValidationErrors = () => {
    const errorKeys = Object.keys(form.formState.errors);
    const firstField = Object.keys(eventFieldTabs).find((key) =>
      errorKeys.includes(key)
    );
    if (firstField) setActiveTab(eventFieldTabs[firstField]);

    toast({
      title: 'Please fix the highlighted fields',
      description: `${errorKeys.length} field${
        errorKeys.length === 1 ? ' needs' : 's need'
      } attention before the event can be saved.`,
      variant: 'destructive',
    });
  };

  // Validate fields of the registration form before saving
  const validateRegistrationFields = () => {
    const unlabeled = fields.filter((field) => !field.label?.trim());
    if (unlabeled.length > 0) {
      return 'Every registration form field needs a label.';
    }
    const labels = fields.map((field) => field.label.trim().toLowerCase());
    const duplicate = labels.find((label, i) => labels.indexOf(label) !== i);
    if (duplicate) {
      // Responses are stored by label, so duplicates overwrite each other
      return `Two registration fields are both labelled "${duplicate}". Labels must be unique.`;
    }
    const emptySelect = fields.find(
      (field) =>
        field.type === 'select' &&
        !(field.options || []).some((option) => option.trim())
    );
    if (emptySelect) {
      return `The dropdown "${emptySelect.label}" needs at least one option.`;
    }
    return null;
  };

  // Form submission (shared by the create and edit screens)
  const handleSubmit = async (mode: SubmitMode = 'draft') => {
    if (submitting) return;
    setSubmitting(true);
    let redirecting = false;

    try {
      const isValid = await form.trigger();
      if (!isValid) {
        showValidationErrors();
        return;
      }

      const fieldsError = validateRegistrationFields();
      if (fieldsError) {
        setActiveTab('registration');
        toast({
          title: 'Registration form needs attention',
          description: fieldsError,
          variant: 'destructive',
        });
        return;
      }

      const formData = form.getValues();
      const eventData = {
        ...formData,
        description: richTextDescription || formData.description,
        // Drop empty gallery rows the admin added but never filled
        galleryImages:
          formData.galleryImages?.filter((url) => url.trim() !== '') || [],
        hasEarlyBird: formData.hasEarlyBird && !formData.isFree,
      };

      // Create the event once; on retry (or when editing) update it instead,
      // so a failure later in this flow never produces duplicate events.
      let currentEventId = eventId;
      if (currentEventId) {
        const result = await updateEvent(currentEventId, eventData);
        if (!result.success) {
          throw new Error(result.error || 'Failed to save event');
        }
      } else {
        const result = await createEvent(eventData);
        if (!result.success || !result.eventId) {
          throw new Error(result.error || 'Failed to save event');
        }
        currentEventId = result.eventId;
        setEventId(currentEventId);
      }

      // Save the registration form and make sure the event points at it
      if (fields.length > 0) {
        let savedFormSchemaId: string;
        try {
          savedFormSchemaId = await saveFormSchema(currentEventId);
        } catch (error: any) {
          throw new Error(
            `The event was saved, but its registration form was not: ${error.message}. Please try saving again.`
          );
        }

        if (savedFormSchemaId !== formData.formSchemaId) {
          const linkResult = await updateEvent(currentEventId, {
            formSchemaId: savedFormSchemaId,
          });
          if (!linkResult.success) {
            throw new Error(
              'The event was saved, but linking its registration form failed. Please try saving again.'
            );
          }
          form.setValue('formSchemaId', savedFormSchemaId);
        }
      }

      if (mode === 'publish') {
        const publishResult = await publishEvent(currentEventId);
        if (!publishResult.success) {
          toast({
            title: 'Saved, but not published',
            description:
              publishResult.error ||
              'The event was saved as a draft. Publish it from the events list.',
            variant: 'destructive',
          });
        }
      }

      toast({
        title: 'Success',
        description:
          mode === 'publish'
            ? 'Event published successfully'
            : mode === 'draft'
              ? 'Event saved as draft'
              : 'Event updated successfully',
      });

      if (redirectAfterSubmit) {
        redirecting = true;
        router.push('/admin/events');
        router.refresh();
      }
    } catch (error: any) {
      console.error('Error submitting event:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save event',
        variant: 'destructive',
      });
    } finally {
      // Keep the buttons disabled while navigating away
      if (!redirecting) setSubmitting(false);
    }
  };

  // Create or update the registration form schema. Throws on failure.
  const saveFormSchema = async (eventIdToSave: string): Promise<string> => {
    setIsFormLoading(true);
    try {
      const payload = {
        title: formTitle.trim() || 'Event Registration Form',
        description: formDescription,
        fields,
      };

      if (formSchemaId) {
        const result = await updateFormSchema(formSchemaId, payload);
        return result.id;
      }

      const result = await createFormSchema({
        ...payload,
        event_id: eventIdToSave,
        is_active: true,
      });
      setFormSchemaId(result.id);
      return result.id;
    } finally {
      setIsFormLoading(false);
    }
  };

  // Reset fields state with new array
  const resetFields = (newFields: FormField[]) => {
    setFields(newFields);
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    const newFields = [...fields];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const field = newFields[index];
    newFields.splice(index, 1);
    newFields.splice(newIndex, 0, field);
    setFields(newFields);
  };

  const addField = (type: FormFieldType) => {
    const newField: FormField = {
      id: `${Date.now()}`,
      type,
      label:
        type === 'file'
          ? 'Attachments'
          : `New ${type.charAt(0).toUpperCase() + type.slice(1)} Field`,
      placeholder: '',
      required: false,
      ...(type === 'select' ? { options: ['Option 1'] } : {}),
      ...(type === 'file'
        ? {
            maxFiles: 5,
            maxSize: 5 * 1024 * 1024, // 5MB
            acceptedFileTypes: [],
          }
        : {}),
    };
    setFields([...fields, newField]);
    setActiveField(newField.id);
    setFormBuilderActiveTab('settings');
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, ...updates } : field
      )
    );
  };

  const deleteField = (id: string) => {
    setFields(fields.filter((field) => field.id !== id));
    if (activeField === id) {
      setActiveField(null);
      setFormBuilderActiveTab('fields');
    }
  };

  const value = {
    // Event form state
    form,
    richTextDescription,
    setRichTextDescription,
    activeTab,
    setActiveTab,
    submitting,

    // Form submission
    handleSubmit,

    // Registration form builder state
    formTitle,
    setFormTitle,
    formDescription,
    setFormDescription,
    formSchemaId,
    setFormSchemaId,
    fields,
    setFields,

    activeField,
    setActiveField,
    formBuilderActiveTab,
    setFormBuilderActiveTab,
    isFormLoading,

    // Registration form builder methods
    moveField,
    addField,
    updateField,
    deleteField,
    saveFormSchema,

    // Navigation
    navigateBack,

    // Event form state
    eventId,
    setEventId,

    // New fields
    redirectAfterSubmit,
    setRedirectAfterSubmit,

    // Reset fields state with new array
    resetFields,
  };

  return (
    <EventCreationContext.Provider value={value}>
      {children}
    </EventCreationContext.Provider>
  );
}

export function useEventCreation() {
  const context = useContext(EventCreationContext);
  if (context === undefined) {
    throw new Error(
      'useEventCreation must be used within an EventCreationProvider'
    );
  }
  return context;
}
