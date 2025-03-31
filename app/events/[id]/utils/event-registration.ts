import { EventTable } from '@/app/admin/events/models/event-schema';

interface RegistrationStatus {
  canRegister: boolean;
  message: string;
}

export function checkEventRegistrationStatus(
  event: EventTable
): RegistrationStatus {
  const now = new Date();

  // Check if registration deadline is set
  if (!event.registration_deadline) {
    return {
      canRegister: false,
      message: 'Registration is not opened yet',
    };
  }

  // Check if registration deadline has passed
  const registrationDeadline = new Date(event.registration_deadline);
  if (now > registrationDeadline) {
    return {
      canRegister: false,
      message: 'Registration deadline has passed',
    };
  }

  // Check capacity if it's limited
  if (event.capacity && event.registrations_count >= event.capacity) {
    return {
      canRegister: false,
      message: 'Event has reached maximum capacity',
    };
  }

  // Check registration fee for paid events
  if (!event.is_free) {
    // If it's a paid event, price must be set
    if (!event.price || event.price <= 0) {
      return {
        canRegister: false,
        message: 'Registration fee has not been set for this event',
      };
    }
  }

  // Check if event start date has passed
  const startDate = new Date(event.start_date);
  if (now > startDate) {
    return {
      canRegister: false,
      message: 'Event has already started',
    };
  }

  // If all checks pass
  return {
    canRegister: true,
    message: event.require_approval
      ? 'You can register for this event (requires approval)'
      : 'You can register for this event',
  };
}
