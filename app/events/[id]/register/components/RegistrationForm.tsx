'use client';

import RegistrationFormRenderer from '@/app/admin/events/components/registration-form-renderer';
import { EventTable } from '@/app/admin/events/models/event-schema';
import { incrementRegistrationCount } from '@/app/admin/events/services/event-service';
import { createFormSubmission } from '@/app/admin/events/services/form-submission-service';
import { getEventFormSchema } from '@/app/admin/events/services/form-schema-service';
import { Card } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormSchema } from '@/app/admin/events/models/form-schema';

interface RegistrationFormProps {
  event: EventTable;
}

export function RegistrationForm({ event }: RegistrationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFormSchema = async () => {
      try {
        setIsLoading(true);
        if (!event.form_schema_id) {
          setFormSchema(null);
          return;
        }

        const fetchedSchema = await getEventFormSchema(event.id);
        if (fetchedSchema) {
          // Transform the schema to match the FormSchema type
          const transformedSchema: FormSchema = {
            id: fetchedSchema.id,
            title: fetchedSchema.title,
            description: fetchedSchema.description || undefined,
            fields: fetchedSchema.fields,
            event_id: fetchedSchema.event_id,
            is_active: fetchedSchema.is_active,
            created_at: fetchedSchema.created_at,
            updated_at: fetchedSchema.updated_at,
          };
          setFormSchema(transformedSchema);
        } else {
          setFormSchema(null);
        }
      } catch (error) {
        console.error('Error loading form schema:', error);
        toast({
          title: 'Error',
          description: 'Failed to load registration form',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadFormSchema();
  }, [event.id, event.form_schema_id, toast]);

  const handleFormSubmit = async (formData: Record<string, any>) => {
    try {
      setIsSubmitting(true);

      if (!event.form_schema_id) {
        toast({
          title: 'Configuration Error',
          description:
            'This event is not properly configured for registration.',
          variant: 'destructive',
        });
        return;
      }

      // Create submission data
      const submissionData = {
        ...formData,
        event_id: event.id,
        form_schema_id: event.form_schema_id,
        responses: formData.responses || {},
        status: 'approved' as const,
        user_id: '',
      };

      // If it's a free event, create submission immediately
      if (event.is_free) {
        await createFormSubmission(submissionData);

        // Increment registration count
        const { error: countError } = await incrementRegistrationCount(
          event.id
        );

        if (countError) {
          console.error('Error updating registration count:', countError);
          // Don't return here, as the registration itself was successful
        }

        // Show success message
        toast({
          title: 'Registration Successful',
          description: 'You have been registered for the event.',
        });

        // Redirect or clear form as needed
        setIsRedirecting(true);
        router.push(`/events/${event.id}/confirmation`);
      } else {
        // For paid events, store the submission data in session storage
        sessionStorage.setItem(
          `event_registration_${event.id}`,
          JSON.stringify(submissionData)
        );

        // Redirect to payment page
        router.push(`/events/${event.id}/payment`);
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration Failed',
        description:
          'There was an error processing your registration. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isRedirecting) {
    return (
      <Card className="p-6">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
          <h2 className="text-xl font-semibold">
            Redirecting to WhatsApp Group
          </h2>
          <p className="text-muted-foreground">
            Please wait while we redirect you to the event's WhatsApp group...
          </p>
        </div>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
          <span>Loading registration form...</span>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <RegistrationFormRenderer
          formSchema={formSchema}
          onSubmit={handleFormSubmit}
        />
        {isSubmitting && (
          <div className="flex items-center justify-center mt-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
            <span>Processing registration...</span>
          </div>
        )}
      </Card>
    </div>
  );
}
