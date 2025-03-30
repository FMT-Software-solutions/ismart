'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Image as ImageIcon, Video as VideoIcon, Plus, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { EventFormValues } from '../models/event-schema';
import ImagePreviewModal from './ImagePreviewModal';
import { useState } from 'react';
import { getVideoEmbedUrl } from '@/lib/utils';

interface EventImagesFormProps {
  form: UseFormReturn<EventFormValues>;
}

export default function EventImagesForm({ form }: EventImagesFormProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Function to handle image preview
  const handleImagePreview = (imageUrl: string) => {
    setPreviewImage(imageUrl);
  };

  // Get current gallery images from form state
  const galleryImages = form.watch('galleryImages') || [];
  const videoUrl = form.watch('videoUrl');

  // Function to add a new gallery image
  const addGalleryImage = () => {
    const currentImages = galleryImages;
    if (currentImages.length < 10) {
      form.setValue('galleryImages', [...currentImages, '']);
    }
  };

  // Function to remove a gallery image
  const removeGalleryImage = (index: number) => {
    const currentImages = [...galleryImages];
    currentImages.splice(index, 1);
    form.setValue('galleryImages', currentImages);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ImageIcon className="mr-2 h-5 w-5" />
            Event Media
          </CardTitle>
          <CardDescription>
            Upload your event banner, video, and gallery images
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name="bannerImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Banner Image</FormLabel>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <div
                    className="w-40 h-24 border rounded overflow-hidden flex items-center justify-center bg-gray-50 cursor-pointer"
                    onClick={() =>
                      field.value && handleImagePreview(field.value)
                    }
                  >
                    {field.value ? (
                      <img
                        src={field.value}
                        alt="Banner preview"
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://placehold.co/600x400?text=Banner+preview';
                          (e.target as HTMLImageElement).classList.add(
                            'opacity-50'
                          );
                        }}
                      />
                    ) : (
                      <span className="text-gray-400 text-xs text-center px-2">
                        Banner preview
                      </span>
                    )}
                  </div>
                  <div className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Enter banner image URL"
                        {...field}
                        value={field.value || ''}
                      />
                    </FormControl>
                  </div>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL</FormLabel>
                <div className="space-y-2">
                  <FormControl>
                    <Input
                      placeholder="Enter video URL (YouTube or other video platform)"
                      {...field}
                      value={field.value || ''}
                    />
                  </FormControl>
                  {field.value && (
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
                      <iframe
                        src={getVideoEmbedUrl(field.value)}
                        title="Video preview"
                        className="absolute top-0 left-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="space-y-4 mt-14">
            <div className="flex items-center justify-between">
              <FormLabel>Gallery Images (Optional)</FormLabel>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addGalleryImage}
                disabled={galleryImages.length >= 10}
              >
                <Plus className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Add Image</span>
              </Button>
            </div>

            {galleryImages.map((url, index) => (
              <FormField
                key={`gallery-${index}`}
                control={form.control}
                name={`galleryImages.${index}`}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div
                        className="w-40 h-24 border rounded overflow-hidden flex items-center justify-center bg-gray-50 cursor-pointer"
                        onClick={() =>
                          field.value && handleImagePreview(field.value)
                        }
                      >
                        {field.value ? (
                          <img
                            src={field.value}
                            alt={`Gallery image ${index + 1}`}
                            className="object-cover w-full h-full"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://placehold.co/600x400?text=Image+preview';
                              (e.target as HTMLImageElement).classList.add(
                                'opacity-50'
                              );
                            }}
                          />
                        ) : (
                          <span className="text-gray-400 text-xs text-center px-2">
                            Image preview
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex gap-2">
                          <FormControl>
                            <Input
                              placeholder={`Enter gallery image ${
                                index + 1
                              } URL`}
                              {...field}
                              value={field.value || ''}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeGalleryImage(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <ImagePreviewModal
        isOpen={!!previewImage}
        onClose={() => setPreviewImage(null)}
        imageUrl={previewImage || ''}
      />
    </>
  );
}
