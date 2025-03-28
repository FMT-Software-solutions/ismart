'use client';

import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  Users,
  Info,
  DollarSign,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';
import { useEventCreation } from '../context/EventCreationContext';
import { EventFormValues } from '../../models/event-schema';

export default function EventPreview() {
  const { form, richTextDescription } = useEventCreation();
  const formData = form.getValues();

  const formatDate = (date: Date | undefined | null, formatStr: string) => {
    if (!date) return 'Not set';
    try {
      return format(date, formatStr);
    } catch (error) {
      return 'Invalid date';
    }
  };

  const requiredFields = [
    { key: 'title', label: 'Event Title' },
    { key: 'startDate', label: 'Start Date' },
    { key: 'endDate', label: 'End Date' },
    { key: 'registrationDeadline', label: 'Registration Deadline' },
    { key: 'location', label: 'Location' },
    { key: 'eventType', label: 'Event Type' },
  ];

  const missingFields = requiredFields.filter(
    ({ key }) => !formData[key as keyof EventFormValues]
  );

  return (
    <div className="space-y-6">
      {missingFields.length > 0 && (
        <Alert
          variant="default"
          className="border-yellow-400 dark:border-yellow-900"
        >
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription>
            <p className="font-medium text-yellow-600">
              Required fields missing:
            </p>
            <ul className="mt-2 list-disc pl-4">
              {missingFields.map(({ label }) => (
                <li key={label} className="list-none text-yellow-700">
                  {label}
                </li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">
                {formData.title || 'Untitled Event'}
              </CardTitle>
              {formData.theme && (
                <div className="mt-1 flex items-center text-gray-500">
                  <Tag className="mr-1 h-4 w-4" /> {formData.theme}
                </div>
              )}
            </div>
            <Badge variant={formData.isFree ? 'secondary' : 'default'}>
              {formData.isFree
                ? 'Free Event'
                : formData.price
                ? `$${formData.price}`
                : 'Price not set'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Event Details */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-3">
              <div className="flex items-start">
                <Calendar className="mr-2 mt-1 h-5 w-5 text-gray-500" />
                <div>
                  <h3 className="text-sm font-medium">Date & Time</h3>
                  {formData.startDate ? (
                    <>
                      <p className="text-sm text-gray-500">
                        {formatDate(formData.startDate, 'EEEE, MMMM d, yyyy')}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(formData.startDate, 'h:mm a')} -{' '}
                        {formatDate(formData.endDate, 'h:mm a')}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Date and time not set
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="mr-2 mt-1 h-5 w-5 text-gray-500" />
                <div>
                  <h3 className="text-sm font-medium">Location</h3>
                  <p className="text-sm text-gray-500">
                    {formData.location || 'Location not set'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="mr-2 mt-1 h-5 w-5 text-gray-500" />
                <div>
                  <h3 className="text-sm font-medium">Registration Deadline</h3>
                  <p className="text-sm text-gray-500">
                    {formData.registrationDeadline
                      ? formatDate(
                          formData.registrationDeadline,
                          'MMMM d, yyyy h:mm a'
                        )
                      : 'Deadline not set'}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Info className="mr-2 mt-1 h-5 w-5 text-gray-500" />
                <div>
                  <h3 className="text-sm font-medium">Event Type</h3>
                  <p className="text-sm capitalize text-gray-500">
                    {formData.eventType || 'Type not set'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {formData.capacity !== undefined && (
                <div className="flex items-start">
                  <Users className="mr-2 mt-1 h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="text-sm font-medium">Capacity</h3>
                    <p className="text-sm text-gray-500">
                      {formData.capacity > 0
                        ? `${formData.capacity} attendees`
                        : 'Unlimited'}
                    </p>
                  </div>
                </div>
              )}

              {!formData.isFree &&
                formData.hasEarlyBird &&
                formData.earlyBirdPrice &&
                formData.earlyBirdDeadline && (
                  <div className="flex items-start">
                    <DollarSign className="mr-2 mt-1 h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="text-sm font-medium">Early Bird Price</h3>
                      <p className="text-sm text-gray-500">
                        ${formData.earlyBirdPrice} (until{' '}
                        {formatDate(
                          formData.earlyBirdDeadline,
                          'MMMM d, yyyy h:mm a'
                        )}
                        )
                      </p>
                    </div>
                  </div>
                )}

              {formData.requireApproval && (
                <div className="flex items-start">
                  <CheckCircle className="mr-2 mt-1 h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="text-sm font-medium">
                      Registration Approval
                    </h3>
                    <p className="text-sm text-gray-500">
                      Registrations require approval
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Event Description */}
          <div>
            <h3 className="mb-2 text-lg font-medium">Description</h3>
            {richTextDescription ? (
              <div
                className="prose max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{ __html: richTextDescription }}
              />
            ) : (
              <p className="text-gray-500">No description provided</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
