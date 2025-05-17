'use client';

import { useCallback } from 'react';
import { recordError } from '@/app/services/error-service';
import { useUser } from '@/app/hooks/useUser';

type ErrorRecordingOptions = {
  component?: string;
  errorType?: string;
  metadata?: Record<string, any>;
  severity?: 'low' | 'medium' | 'high' | 'critical';
};

export function useErrorRecording() {
  const { user } = useUser();

  const logError = useCallback(
    async (error: Error | string, options?: ErrorRecordingOptions) => {
      try {
        return await recordError(error, {
          ...options,
          userId: user?.id,
        });
      } catch (e) {
        console.error('Failed to record error:', e);
        console.error('Original error:', error);
        return { success: false, error: e };
      }
    },
    [user?.id]
  );

  const wrapWithErrorHandling = useCallback(
    <T extends (...args: any[]) => Promise<any>>(
      fn: T,
      options?: ErrorRecordingOptions
    ): ((...args: Parameters<T>) => Promise<ReturnType<T>>) => {
      return async (...args: Parameters<T>) => {
        try {
          return await fn(...args);
        } catch (error) {
          await logError(error as Error, options);
          throw error;
        }
      };
    },
    [logError]
  );

  return {
    logError,
    wrapWithErrorHandling,
  };
}
