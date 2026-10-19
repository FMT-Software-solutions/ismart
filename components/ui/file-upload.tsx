'use client';

import { useState, useCallback, useId, useRef, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import {
  X,
  Upload,
  File,
  Image,
  FileText,
  FileIcon,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FileUploadProps {
  bucket: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedFileTypes?: string[]; // MIME types (image/png, image/*) or extensions (.pdf)
  /** Called with the URLs of the newly uploaded files only. */
  onUploadComplete?: (urls: string[]) => void;
  onUploadError?: (error: Error) => void;
  onDelete?: (url: string) => void;
  /** Lets the parent block submission while uploads are in flight. */
  onUploadingChange?: (uploading: boolean) => void;
  value?: string[];
  className?: string;
  disabled?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

// Browsers report an empty MIME type for some documents (notably on
// Windows), so accepted types are also matched by file extension.
const MIME_EXTENSIONS: Record<string, string[]> = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': [
    '.docx',
  ],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/png': ['.png'],
  'image/gif': ['.gif'],
  'image/webp': ['.webp'],
  'application/vnd.ms-excel': ['.xls'],
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
    '.xlsx',
  ],
  'text/plain': ['.txt'],
  'application/zip': ['.zip'],
  'application/x-rar-compressed': ['.rar'],
};

const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

const formatSize = (bytes: number) =>
  bytes >= 1024 * 1024
    ? `${Math.round((bytes / 1024 / 1024) * 10) / 10}MB`
    : `${Math.round(bytes / 1024)}KB`;

const getExtension = (name: string) => {
  const dot = name.lastIndexOf('.');
  return dot === -1 ? '' : name.slice(dot).toLowerCase();
};

const isAccepted = (file: File, accepted: string[]) => {
  // No restriction configured means any file type is allowed
  if (accepted.length === 0) return true;

  const extension = getExtension(file.name);
  return accepted.some((type) => {
    const rule = type.toLowerCase();
    if (rule.startsWith('.')) return rule === extension;
    if (rule.endsWith('/*')) return file.type.startsWith(rule.slice(0, -1));
    return (
      rule === file.type || (MIME_EXTENSIONS[rule] || []).includes(extension)
    );
  });
};

const describeTypes = (accepted: string[]) =>
  accepted.map((type) => MIME_EXTENSIONS[type]?.join('/') || type).join(', ');

// Public URLs look like .../storage/v1/object/public/<bucket>/<path>
const getStoragePath = (url: string, bucket: string) => {
  const marker = `/object/public/${bucket}/`;
  const index = url.indexOf(marker);
  const path =
    index === -1 ? url.split('/').pop() : url.slice(index + marker.length);
  return path ? decodeURIComponent(path.split('?')[0]) : null;
};

const getDisplayName = (url: string) =>
  decodeURIComponent(url.split('/').pop() || '')
    .split('?')[0]
    .replace(/^\d+_[a-z0-9]+_/i, '')
    .replace(/^\d+_/, '');

export function FileUpload({
  bucket,
  maxFiles = 1,
  maxSize = MAX_FILE_SIZE,
  acceptedFileTypes = [],
  onUploadComplete,
  onUploadError,
  onDelete,
  onUploadingChange,
  value = [],
  className,
  disabled = false,
}: FileUploadProps) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const supabase = createClient();

  const safeMaxFiles = Math.max(1, maxFiles || 1);
  const safeMaxSize = maxSize && maxSize > 0 ? maxSize : MAX_FILE_SIZE;
  const remainingSlots = Math.max(0, safeMaxFiles - value.length);
  const isDisabled = disabled || uploading || remainingSlots === 0;

  useEffect(() => {
    onUploadingChange?.(uploading);
  }, [uploading, onUploadingChange]);

  const uploadFiles = useCallback(
    async (fileList: FileList | File[]) => {
      const files = Array.from(fileList);
      if (files.length === 0) return;

      // Validate against the slots left, not just the batch size
      if (files.length > remainingSlots) {
        setError(
          remainingSlots === 0
            ? `You have already added the maximum of ${safeMaxFiles} file${
                safeMaxFiles > 1 ? 's' : ''
              }.`
            : `You can add ${remainingSlots} more file${
                remainingSlots > 1 ? 's' : ''
              } (maximum ${safeMaxFiles}).`
        );
        return;
      }

      const rejectedType = files.find(
        (file) => !isAccepted(file, acceptedFileTypes)
      );
      if (rejectedType) {
        setError(
          `"${rejectedType.name}" is not an accepted file type. Accepted: ${describeTypes(
            acceptedFileTypes
          )}`
        );
        return;
      }

      const oversized = files.find((file) => file.size > safeMaxSize);
      if (oversized) {
        setError(
          `"${oversized.name}" is ${formatSize(
            oversized.size
          )}. Files must be smaller than ${formatSize(safeMaxSize)}.`
        );
        return;
      }

      setError(null);
      setUploading(true);
      setProgress({ done: 0, total: files.length });

      const results = await Promise.allSettled(
        files.map(async (file) => {
          // Timestamp + random suffix avoids collisions between users
          const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
          const filePath = `${Date.now()}_${Math.random()
            .toString(36)
            .slice(2, 8)}_${safeName}`;

          const { error: uploadError } = await supabase.storage
            .from(bucket)
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: false,
              contentType: file.type || undefined,
            });

          if (uploadError) throw uploadError;

          setProgress((current) => ({ ...current, done: current.done + 1 }));

          return supabase.storage.from(bucket).getPublicUrl(filePath).data
            .publicUrl;
        })
      );

      const urls = results
        .filter(
          (result): result is PromiseFulfilledResult<string> =>
            result.status === 'fulfilled'
        )
        .map((result) => result.value);
      const failures = results.filter((result) => result.status === 'rejected');

      // Keep whatever succeeded even if part of the batch failed
      if (urls.length > 0) onUploadComplete?.(urls);

      if (failures.length > 0) {
        const reason = (failures[0] as PromiseRejectedResult).reason;
        console.error('Error uploading file:', reason);
        onUploadError?.(reason as Error);
        setError(
          `${failures.length} of ${files.length} file${
            files.length > 1 ? 's' : ''
          } failed to upload. Please try again.`
        );
      }

      setUploading(false);
      setProgress({ done: 0, total: 0 });
    },
    [
      bucket,
      remainingSlots,
      safeMaxFiles,
      safeMaxSize,
      acceptedFileTypes,
      onUploadComplete,
      onUploadError,
      supabase,
    ]
  );

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) uploadFiles(files);
    // Reset so selecting the same file again still fires onChange
    event.target.value = '';
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    if (isDisabled) return;
    uploadFiles(event.dataTransfer.files);
  };

  const handleDelete = useCallback(
    async (url: string) => {
      // Remove from the form right away; storage cleanup is best effort
      // (anonymous users may not be allowed to delete objects).
      onDelete?.(url);
      setError(null);

      const path = getStoragePath(url, bucket);
      if (!path) return;
      const { error: deleteError } = await supabase.storage
        .from(bucket)
        .remove([path]);
      if (deleteError) {
        console.warn('Could not delete uploaded file:', deleteError.message);
      }
    },
    [bucket, onDelete, supabase]
  );

  const getFileIcon = (url: string) => {
    const extension = getExtension(getDisplayName(url)).slice(1);
    if (!extension) return <FileIcon className="h-8 w-8 shrink-0" />;

    if (IMAGE_EXTENSIONS.includes(extension)) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt=""
          className="h-10 w-10 shrink-0 rounded object-cover"
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      );
    }
    if (extension === 'pdf') {
      return <FileText className="h-8 w-8 shrink-0" />;
    }
    return <File className="h-8 w-8 shrink-0" />;
  };

  const typeHint =
    acceptedFileTypes.length > 0
      ? describeTypes(acceptedFileTypes)
      : 'Any file type';

  return (
    <div className={cn('space-y-3', className)}>
      <div
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-disabled={isDisabled}
        onClick={() => !isDisabled && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (!isDisabled && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!isDisabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          'flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors',
          isDisabled
            ? 'cursor-not-allowed opacity-60'
            : 'cursor-pointer hover:border-primary hover:bg-muted/40',
          isDragging && 'border-primary bg-muted/40',
          error && 'border-red-400'
        )}
      >
        {uploading ? (
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        ) : (
          <Upload className="h-6 w-6 text-muted-foreground" />
        )}
        <p className="text-sm font-medium">
          {uploading
            ? `Uploading ${Math.min(progress.done + 1, progress.total)} of ${
                progress.total
              }...`
            : remainingSlots === 0
              ? 'Maximum number of files added'
              : 'Click to choose a file or drag and drop it here'}
        </p>
        <p className="text-xs text-muted-foreground">
          {typeHint} · up to {formatSize(safeMaxSize)} each · {value.length}/
          {safeMaxFiles} added
        </p>
        <input
          id={inputId}
          ref={inputRef}
          type="file"
          className="hidden"
          multiple={remainingSlots > 1}
          onChange={handleFileChange}
          accept={acceptedFileTypes.length ? acceptedFileTypes.join(',') : ''}
          disabled={isDisabled}
        />
      </div>

      {error && (
        <p className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}

      {uploading && progress.total > 1 && (
        <Progress value={(progress.done / progress.total) * 100} />
      )}

      {value.length > 0 && (
        <div className="grid gap-2">
          {value.map((url) => (
            <Card key={url} className="p-3">
              <div className="flex items-center justify-between gap-3">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-w-0 flex-1 items-center gap-3 hover:underline"
                >
                  {getFileIcon(url)}
                  <p
                    className="truncate text-sm font-medium"
                    title={getDisplayName(url)}
                  >
                    {getDisplayName(url)}
                  </p>
                </a>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${getDisplayName(url)}`}
                  onClick={() => handleDelete(url)}
                  disabled={disabled || uploading}
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
