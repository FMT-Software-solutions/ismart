'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { EventTable } from '@/app/admin/events/models/event-schema';
import RegistrationFormRenderer from '@/app/admin/events/components/registration-form-renderer';
import { createFormSubmission } from '@/app/admin/events/services/form-submission-service';
import { incrementRegistrationCount } from '@/app/admin/events/services/event-service';
import { createClient } from '@/lib/supabase/client';

interface RegistrationFormProps {
  event: EventTable;
}

export function RegistrationForm({ event }: RegistrationFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

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

      // Create form submission
      const submissionData = {
        ...formData,
        event_id: event.id,
        form_schema_id: event.form_schema_id,
        responses: formData.responses || {},
        status: 'approved' as const,
        user_id: '',
      };

      // If it's a free event, show WhatsApp redirect message
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
        router.push(`/events/${event.id}/confirmation`);

        setIsRedirecting(true);
        // Simulate a delay before redirecting to WhatsApp
        setTimeout(() => {
          // Use a default WhatsApp group link if not provided
          const whatsappLink =
            event.whatsapp_group_url || 'https://whatsapp.com';
          window.location.href = whatsappLink;
        }, 5000);
      } else {
        // For paid events, redirect to payment page
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

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <RegistrationFormRenderer
          eventId={event.id}
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
