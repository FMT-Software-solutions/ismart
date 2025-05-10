'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  EventCreationProvider,
  useEventCreation,
} from '../../create/context/EventCreationContext';
import EventDetailsForm from '../../create/components/EventDetailsForm';
import PricingCapacityForm from '../../create/components/PricingCapacityForm';
import RegistrationFormBuilder from '../../create/components/RegistrationFormBuilder';
import { EventTable, FormField } from '../../models/event-schema';
import { useToast } from '@/components/ui/use-toast';
import { updateEvent } from '../../services/event-service';
import { useRouter } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { FormSchemaTable } from '../../models/form-schema';

// Define extended event type that includes form schema
type EventWithSchema = {
  event: EventTable;
  formSchema?: FormSchemaTable;
};

// Wrapper component to use the EventCreationContext
function EditEventFormContent({ event, formSchema }: EventWithSchema) {
  const {
    form,
    activeTab,
    submitting,
    formSchemaId,
    setRichTextDescription,
    setActiveTab,
    setEventId,
    setFormSchemaId,
    setFormTitle,
    setFormDescription,
    resetFields,
    setFormBuilderActiveTab,
    saveFormSchema,
  } = useEventCreation();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Load all event data and form schema when component mounts
  useEffect(() => {
    async function loadEventData() {
      try {
        setLoading(true);

        // Set the event ID in context
        setEventId(event.id);

        // Set initial rich text description
        setRichTextDescription(event.description || '');

        // Reset form with event data
        form.reset({
          bannerImageUrl: event.banner_image_url,
          title: event.title,
          theme: event.theme || '',
          description: event.description || '',
          startDate: new Date(event.start_date),
          endDate: new Date(event.end_date),
          location: event.location,
          eventType: event.event_type,
          eventLink: event.event_link || '',
          price: event.price,
          hasEarlyBird: event.has_early_bird,
          earlyBirdPrice: event.early_bird_price || undefined,
          earlyBirdDeadline: event.early_bird_deadline
            ? new Date(event.early_bird_deadline)
            : undefined,
          registrationDeadline: new Date(event.registration_deadline),
          capacity: event.capacity || undefined,
          isFree: event.is_free,
          requireApproval: event.require_approval,
          additionalInfo: event.additional_info || '',
          formSchemaId: event.form_schema_id || '',
          galleryImages: event.gallery_images || [],
          videoUrl: event.video_url || '',
        });

        // Load form schema if it exists in the event data
        if (formSchema) {
          // Update form schema state
          setFormSchemaId(formSchema.id);
          setFormTitle(formSchema.title || 'Event Registration Form');
          setFormDescription(formSchema.description || '');

          // Set the registration form fields
          if (formSchema.fields && formSchema.fields.length > 0) {
            // Force a clean update of the fields array
            const formattedFields = JSON.parse(
              JSON.stringify(formSchema.fields)
            );
            resetFields(formattedFields);
          } else {
            resetFields([]);
          }

          // Set the form builder tabs
          setFormBuilderActiveTab('fields');
        } else {
          resetFields([]);
          setFormTitle('Event Registration Form');
          setFormDescription('');
        }
      } catch (error) {
        console.error('Error loading event data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load event data',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    }

    loadEventData();
  }, [event.id]); // Depend only on event ID to prevent unnecessary re-renders

  // Handle form submission for update
  const handleUpdateEvent = async () => {
    try {
      // Validate form data
      const isValid = await form.trigger();
      if (!isValid) {
        toast({
          title: 'Validation Error',
          description: 'Please check the form for errors',
          variant: 'destructive',
        });
        return;
      }

      const formData = form.getValues();

      // Get the actual rich text content
      const richTextContent =
        document.querySelector('.ProseMirror')?.innerHTML ||
        formData.description;

      // Update the event
      const result = await updateEvent(event.id, {
        ...formData,
        description: richTextContent,
      });

      if (formSchemaId) {
        await saveFormSchema();
      }

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Event updated successfully',
        });

        // Redirect to events list
        router.push('/admin/events');
        router.refresh();
      } else {
        throw new Error(result.error || 'Failed to update event');
      }
    } catch (error: any) {
      console.error('Error updating event:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update event',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading event data...</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="details">Event Details</TabsTrigger>
            <TabsTrigger value="pricing">Pricing & Capacity</TabsTrigger>
            <TabsTrigger value="registration">Registration Form</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card className="p-6">
              <EventDetailsForm />
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4">
            <Card className="p-6">
              <PricingCapacityForm />
            </Card>
          </TabsContent>

          <TabsContent value="registration" className="space-y-4">
            <RegistrationFormBuilder isEditing={true} />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push('/admin/events')}
          >
            Cancel
          </Button>
          <Button onClick={handleUpdateEvent} disabled={submitting}>
            {submitting ? 'Updating...' : 'Update Event'}
          </Button>
        </div>
      </div>
    </Form>
  );
}

// Wrapper component with provider
export default function EditEventForm({ event, formSchema }: EventWithSchema) {
  return (
    <EventCreationProvider>
      <EditEventFormContent event={event} formSchema={formSchema} />
    </EventCreationProvider>
  );
}
