'use client';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { DialogTitle } from '@radix-ui/react-dialog';

interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

export default function ImagePreviewModal({
  isOpen,
  onClose,
  imageUrl,
}: ImagePreviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle className="invisible">Image Preview</DialogTitle>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="relative w-full h-[80vh] bg-black/10">
          <img
            src={imageUrl}
            alt="Preview"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://placehold.co/600x400?text=Image+preview';
              (e.target as HTMLImageElement).classList.add('opacity-50');
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
