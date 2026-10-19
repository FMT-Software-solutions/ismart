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
import { Loader2, ArrowLeft, ArrowRight, Save, Send } from 'lucide-react';
import { eventFieldTabs, EventFormValues } from '../../models/event-schema';

const STEPS = ['details', 'pricing', 'registration', 'preview'];

export default function EventCreationForm() {
  const {
    form,
    activeTab,
    setActiveTab,
    handleSubmit,
    submitting,
    navigateBack,
  } = useEventCreation();

  const stepIndex = STEPS.indexOf(activeTab);

  // Validate only the current step's fields before moving on
  const goToNextStep = async () => {
    const stepFields = Object.keys(eventFieldTabs).filter(
      (key) => eventFieldTabs[key] === activeTab
    ) as (keyof EventFormValues)[];

    if (stepFields.length > 0) {
      const valid = await form.trigger(stepFields, { shouldFocus: true });
      if (!valid) return;
    }
    setActiveTab(STEPS[stepIndex + 1]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission (e.g. Enter key)
    if (activeTab !== 'preview') goToNextStep();
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
              if (stepIndex > 0) setActiveTab(STEPS[stepIndex - 1]);
            }}
            disabled={activeTab === 'details' || submitting}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous Step
          </Button>

          {activeTab === 'preview' ? (
            <div className="flex flex-wrap justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                disabled={submitting}
                onClick={() => handleSubmit('draft')}
              >
                {submitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save as Draft
              </Button>
              <Button
                type="button"
                disabled={submitting}
                onClick={() => handleSubmit('publish')}
              >
                {submitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                Publish Event
              </Button>
            </div>
          ) : (
            <Button type="submit" disabled={submitting}>
              Next Step
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
