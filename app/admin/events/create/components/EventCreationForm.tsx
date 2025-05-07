'use client';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form } from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { useEventCreation } from '../context/EventCreationContext';
import EventDetailsForm from './EventDetailsForm';
import PricingCapacityForm from './PricingCapacityForm';
import RegistrationFormBuilder from './RegistrationFormBuilder';
import EventPreview from './EventPreview';
import { Loader2, ArrowLeft, ArrowRight } from 'lucide-react';

export default function EventCreationForm() {
  const {
    form,
    activeTab,
    setActiveTab,
    handleSubmit,
    submitting,
    navigateBack,
  } = useEventCreation();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission

    // If on the last tab, submit the form
    if (activeTab === 'preview') {
      handleSubmit();
    } else {
      // Otherwise navigate to the next tab
      if (activeTab === 'details') setActiveTab('pricing');
      else if (activeTab === 'pricing') setActiveTab('registration');
      else if (activeTab === 'registration') setActiveTab('preview');
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={onSubmit}
        className="space-y-6"
        // Add this for clearer debugging
        id="event-creation-form"
      >
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              navigateBack();
            }}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>

          <h1 className="sm:text-2xl font-bold">Create New Event</h1>

          <div className="invisible hidden sm:block">
            {' '}
            {/* Empty div for flex alignment */}
            <Button type="button" variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Events
            </Button>
          </div>
        </div>

        <Card className="bg-white dark:bg-gray-900">
          <CardContent className="pt-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-4 mb-8">
                <TabsTrigger value="details" type="button">
                  <span className="hidden sm:inline mr-1">Event</span> Details
                </TabsTrigger>
                <TabsTrigger value="pricing" type="button">
                  Pricing
                  <span className="hidden sm:inline ml-1"> & Capacity</span>
                </TabsTrigger>
                <TabsTrigger value="registration" type="button">
                  <span className="hidden sm:inline mr-1"> Registration</span>
                  Form
                </TabsTrigger>
                <TabsTrigger value="preview" type="button">
                  Preview
                  <span className="hidden sm:inline ml-1"> & Save</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <EventDetailsForm />
              </TabsContent>

              <TabsContent value="pricing">
                <PricingCapacityForm />
              </TabsContent>

              <TabsContent value="registration">
                <RegistrationFormBuilder />
              </TabsContent>

              <TabsContent value="preview">
                <EventPreview />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              if (activeTab === 'pricing') setActiveTab('details');
              else if (activeTab === 'registration') setActiveTab('pricing');
              else if (activeTab === 'preview') setActiveTab('registration');
            }}
            disabled={activeTab === 'details' || submitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Step
          </Button>

          <Button type="submit" disabled={submitting}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {activeTab === 'preview' ? (
              'Create Event'
            ) : (
              <>
                Next Step
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
