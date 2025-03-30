import { getFormSubmissions } from '../services/form-submission-service';
import { SubmissionsTable } from './components/SubmissionsTable';

export default async function SubmissionsPage() {
  try {
    const submissions = await getFormSubmissions();

    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Event Submissions</h1>
        <SubmissionsTable submissions={submissions || []} />
      </div>
    );
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-4">Event Submissions</h1>
        <div className="text-red-500">
          Error loading submissions. Please try again later.
        </div>
      </div>
    );
  }
}
