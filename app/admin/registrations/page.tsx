'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegistrationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Event Registrations</h1>
        <p className="text-gray-500">Manage and track event registrations</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-purple-100 p-3 mb-4">
              <svg
                className="h-6 w-6 text-purple-600"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1Z" />
                <path d="M12 11h4" />
                <path d="M12 16h4" />
                <path d="M8 11h.01" />
                <path d="M8 16h.01" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              Registration Tracking Coming Soon
            </h2>
            <p className="text-gray-500 max-w-md">
              This section is under development. Soon you will be able to view
              and manage event registrations, attendance tracking, and more.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
