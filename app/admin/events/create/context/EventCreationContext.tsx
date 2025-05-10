'use client';

import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ReactNode, createContext, useContext, useState } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import { EventFormValues, eventFormSchema } from '../../models/event-schema';
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

  // Form submission
  handleSubmit: (isDraft?: boolean) => Promise<void>;

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
  saveFormSchema: (eventId?: string) => Promise<string | null>;

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

  // Form submission
  const handleSubmit = async (isDraft = true) => {
    try {
      setSubmitting(true);

      // Validate form data
      const isValid = await form.trigger();
      if (!isValid) {
        toast({
          title: 'Validation Error',
          description: 'Please check the form for errors',
          variant: 'destructive',
        });
        setSubmitting(false);
        return;
      }

      const formData = form.getValues();

      // Get the actual rich text content
      const richTextContent =
        document.querySelector('.ProseMirror')?.innerHTML ||
        richTextDescription;

      // Filter out empty gallery image URLs
      const galleryImages =
        formData.galleryImages?.filter((url) => url.trim() !== '') || [];

      // First create or update the event
      let result;
      if (eventId) {
        // Update existing event
        result = await updateEvent(eventId, {
          ...formData,
          description: richTextContent,
          galleryImages,
          // Don't include formSchemaId yet as we'll update it after saving the form schema
        });
      } else {
        // Create new event
        result = await createEvent({
          ...formData,
          description: richTextContent,
          galleryImages,
          // Don't include formSchemaId yet as we'll update it after saving the form schema
        });
      }

      if (!result.success) {
        throw new Error(result.error || 'Failed to save event');
      }

      // Set the event ID if it was a new event
      const newEventId = (result as any).eventId;

      // Now save the form schema if there are fields, using the event ID
      let savedFormSchemaId = formSchemaId;
      if (fields.length > 0) {
        // Pass the actual event ID to the form schema
        savedFormSchemaId = await saveFormSchema(newEventId);

        if (!savedFormSchemaId) {
          throw new Error('Failed to save form schema');
        }

        // Update the event with the form schema ID
        if (savedFormSchemaId) {
          const updateResult = await updateEvent(newEventId, {
            formSchemaId: savedFormSchemaId,
          });

          if (!updateResult.success) {
            toast({
              title: 'Warning',
              description: 'Event saved but failed to link registration form',
              variant: 'default',
            });
          }
        }
      }

      // Publish event if not draft
      if (!isDraft && newEventId) {
        const publishResult = await publishEvent(newEventId);
        if (!publishResult.success) {
          toast({
            title: 'Warning',
            description: 'Event saved but failed to publish',
            variant: 'default',
          });
        }
      }

      toast({
        title: 'Success',
        description: isDraft
          ? 'Event saved as draft'
          : 'Event published successfully',
      });

      // Redirect after successful save
      if (redirectAfterSubmit) {
        router.push('/admin/events');
        router.refresh();
      } else {
        // If we're not redirecting, reset submitting state
        setSubmitting(false);
      }
    } catch (error: any) {
      console.error('Error submitting event:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save event',
        variant: 'destructive',
      });
      setSubmitting(false);
    }
  };

  // Handler to save form schema
  const saveFormSchema = async (
    eventIdToSave?: string
  ): Promise<string | null> => {
    try {
      setIsFormLoading(true);

      if (formSchemaId) {
        // Update existing schema
        try {
          const result = await updateFormSchema(formSchemaId, {
            title: formTitle,
            description: formDescription,
            fields,
          });

          if (result && result.id) {
            setIsFormLoading(false);
            toast({
              title: 'Success',
              description: 'Form schema updated successfully',
            });
            return result.id;
          } else {
            throw new Error('Invalid response from updateFormSchema');
          }
        } catch (error: any) {
          console.error('Error updating form schema:', error);
          toast({
            title: 'Error',
            description: error.message || 'Failed to update form schema',
            variant: 'destructive',
          });
          setIsFormLoading(false);
          return null;
        }
      } else {
        // Create new schema
        try {
          if (eventIdToSave) {
            const result = await createFormSchema({
              title: formTitle,
              description: formDescription,
              fields,
              event_id: eventIdToSave,
              is_active: true,
            });

            if (result && result.id) {
              const newSchemaId = result.id;
              setFormSchemaId(newSchemaId);
              form.setValue('formSchemaId', newSchemaId);

              toast({
                title: 'Success',
                description: 'Form schema created successfully',
              });

              setIsFormLoading(false);
              return newSchemaId;
            } else {
              throw new Error('Invalid response from createFormSchema');
            }
          }
          return null;
        } catch (error: any) {
          console.error('Error creating form schema:', error);
          toast({
            title: 'Error',
            description: error.message || 'Failed to create form schema',
            variant: 'destructive',
          });
          setIsFormLoading(false);
          return null;
        }
      }
    } catch (error: any) {
      console.error('Error saving form schema:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to save form schema',
        variant: 'destructive',
      });
      setIsFormLoading(false);
      return null;
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
