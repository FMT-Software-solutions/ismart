'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/components/ui/use-toast';
import { deleteFormSubmission } from '../../services/form-submission-service';
import { useEffect } from 'react';

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  submissionId: string;
  onDeleted: () => void;
}

export function DeleteConfirmationDialog({
  isOpen,
  onClose,
  submissionId,
  onDeleted,
}: DeleteConfirmationDialogProps) {
  const { toast } = useToast();

  // Clean up pointer-events style when dialog closes
  useEffect(() => {
    const cleanup = () => {
      document.body.style.pointerEvents = 'auto';
    };

    if (!isOpen) {
      cleanup();
    }

    // Ensure cleanup runs when component unmounts
    return () => {
      cleanup();
    };
  }, [isOpen]);

  const handleDelete = async () => {
    try {
      await deleteFormSubmission(submissionId);
      toast({
        title: 'Success',
        description: 'Submission deleted successfully',
      });
      onDeleted();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete submission',
        variant: 'destructive',
      });
    } finally {
      // Ensure pointer-events is restored before closing
      document.body.style.pointerEvents = 'auto';
      onClose();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Ensure pointer-events is restored before closing
      document.body.style.pointerEvents = 'auto';
    }
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            submission and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
