'use client';

import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { X, Upload, File, Image, FileText, FileIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FileUploadProps {
  bucket: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedFileTypes?: string[];
  onUploadComplete?: (urls: string[]) => void;
  onUploadError?: (error: Error) => void;
  onDelete?: (url: string) => void;
  value?: string[];
  className?: string;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export function FileUpload({
  bucket,
  maxFiles = 1,
  maxSize = MAX_FILE_SIZE,
  acceptedFileTypes,
  onUploadComplete,
  onUploadError,
  onDelete,
  value = [],
  className,
  disabled = false,
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files || files.length === 0) return;

      // Validate number of files
      if (files.length > maxFiles) {
        setError(`Maximum ${maxFiles} file${maxFiles > 1 ? 's' : ''} allowed`);
        return;
      }

      // Validate file types
      if (acceptedFileTypes) {
        const invalidFiles = Array.from(files).filter(
          (file) => !acceptedFileTypes.includes(file.type)
        );
        if (invalidFiles.length > 0) {
          setError(
            `Invalid file type. Accepted types: ${acceptedFileTypes.join(', ')}`
          );
          return;
        }
      }

      // Validate file sizes
      const oversizedFiles = Array.from(files).filter(
        (file) => file.size > maxSize
      );
      if (oversizedFiles.length > 0) {
        setError(`File size must be less than ${maxSize / 1024 / 1024}MB`);
        return;
      }

      setError(null);
      setUploading(true);
      setProgress(0);

      try {
        const uploadPromises = Array.from(files).map(async (file) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
          const filePath = `${fileName}`;

          const { data, error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false,
            });

          if (uploadError) throw uploadError;

          const {
            data: { publicUrl },
          } = supabase.storage.from(bucket).getPublicUrl(filePath);

          return publicUrl;
        });

        const urls = await Promise.all(uploadPromises);
        onUploadComplete?.(urls);
      } catch (err) {
        console.error('Error uploading file:', err);
        onUploadError?.(err as Error);
        setError('Failed to upload file');
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    [
      bucket,
      maxFiles,
      maxSize,
      acceptedFileTypes,
      onUploadComplete,
      onUploadError,
    ]
  );

  const handleDelete = useCallback(
    async (url: string) => {
      try {
        const path = url.split('/').pop();
        if (!path) return;

        const { error: deleteError } = await supabase.storage
          .from(bucket)
          .remove([path]);

        if (deleteError) throw deleteError;

        onDelete?.(url);
      } catch (err) {
        console.error('Error deleting file:', err);
        setError('Failed to delete file');
      }
    },
    [bucket, onDelete]
  );

  const getFileIcon = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    if (!extension) return <FileIcon className="h-8 w-8" />;

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension)) {
      return <Image className="h-8 w-8" />;
    }
    if (['pdf'].includes(extension)) {
      return <FileText className="h-8 w-8" />;
    }
    return <File className="h-8 w-8" />;
  };

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById('file-upload')?.click()}
          disabled={disabled || uploading || value.length >= maxFiles}
        >
          <Upload className="mr-2 h-4 w-4" />
          Upload File
        </Button>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept={acceptedFileTypes?.join(',')}
          disabled={disabled || uploading || value.length >= maxFiles}
        />
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {uploading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-muted-foreground">Uploading...</p>
        </div>
      )}

      {value.length > 0 && (
        <div className="grid gap-4">
          {value.map((url, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {getFileIcon(url)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {url.split('/').pop()}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {url}
                    </p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(url)}
                  disabled={disabled}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
