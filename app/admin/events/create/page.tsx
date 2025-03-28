'use client';

import { EventCreationProvider } from './context/EventCreationContext';
import EventCreationForm from './components/EventCreationForm';

export default function CreateEventPage() {
  return (
    <div className="container sm:py-8">
      <EventCreationProvider>
        <EventCreationForm />
      </EventCreationProvider>
    </div>
  );
}
