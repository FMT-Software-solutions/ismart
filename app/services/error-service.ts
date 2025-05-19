import { createClient } from '@/lib/supabase/client';
import {
  CreateErrorPayload,
  ErrorTable,
} from '@/app/admin/events/models/error-schema';

/**
 * Records an error in the database
 * @param error Error object or error message
 * @param component Component or service where the error occurred
 * @param metadata Additional context like browser info, URL, etc.
 * @param errorType Type of error (API, Client, Database, etc.)
 * @param userId User ID if available
 * @returns The created error record or error object
 */
export async function recordError(
  error: Error | string,
  options?: {
    component?: string;
    metadata?: Record<string, any>;
    errorType?: string;
    userId?: string;
    severity?: 'low' | 'medium' | 'high' | 'critical';
  }
) {
  try {
    const supabase = createClient();

    let errorPayload: CreateErrorPayload = {
      error_message: typeof error === 'string' ? error : error.message,
      stack_trace: typeof error === 'string' ? undefined : error.stack,
      component: options?.component,
      error_type: options?.errorType,
      user_id: options?.userId,
      metadata: options?.metadata,
      severity: options?.severity || 'medium',
      status: 'new',
      is_resolved: false,
    };

    const { data, error: supabaseError } = await supabase
      .from('errors')
      .insert(errorPayload)
      .select()
      .single();

    if (supabaseError) {
      console.error('Failed to record error:', supabaseError);
      return { success: false, error: supabaseError };
    }

    return { success: true, data };
  } catch (catchError) {
    // Fallback logging if we can't record to the database
    console.error('Error recording error:', catchError);
    console.error('Original error:', error);
    return { success: false, error: catchError };
  }
}

/**
 * Fetches errors with pagination and filtering options
 */
export async function getErrors({
  page = 1,
  limit = 50,
  status,
  resolved,
  orderBy = 'created_at',
  ascending = false,
}: {
  page?: number;
  limit?: number;
  status?: string;
  resolved?: boolean;
  orderBy?: string;
  ascending?: boolean;
} = {}) {
  try {
    const supabase = createClient();

    let query = supabase.from('errors').select('*', { count: 'exact' });

    // Apply filters if provided
    if (status) {
      query = query.eq('status', status);
    }

    if (resolved !== undefined) {
      query = query.eq('is_resolved', resolved);
    }

    // Apply pagination
    const startIndex = (page - 1) * limit;
    query = query
      .order(orderBy, { ascending })
      .range(startIndex, startIndex + limit - 1);

    const { data, error, count } = await query;

    if (error) {
      console.error('Failed to fetch errors:', error);
      return { success: false, error };
    }

    return {
      success: true,
      data: data as ErrorTable[],
      pagination: {
        total: count || 0,
        page,
        limit,
        totalPages: count ? Math.ceil(count / limit) : 0,
      },
    };
  } catch (error) {
    console.error('Error fetching errors:', error);
    return { success: false, error };
  }
}

/**
 * Updates the status of an error
 */
export async function updateErrorStatus(
  errorId: string,
  status: 'new' | 'investigating' | 'resolved',
  isResolved?: boolean
) {
  try {
    const supabase = createClient();

    const updateData: Partial<ErrorTable> = { status };

    // Only update is_resolved if explicitly passed
    if (isResolved !== undefined) {
      updateData.is_resolved = isResolved;
    } else if (status === 'resolved') {
      // Automatically set is_resolved to true when status is 'resolved'
      updateData.is_resolved = true;
    }

    const { data, error } = await supabase
      .from('errors')
      .update(updateData)
      .eq('id', errorId)
      .select()
      .single();

    if (error) {
      console.error('Failed to update error status:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error updating error status:', error);
    return { success: false, error };
  }
}

/**
 * Deletes an error record
 */
export async function deleteError(errorId: string) {
  try {
    const supabase = createClient();

    const { error } = await supabase.from('errors').delete().eq('id', errorId);

    if (error) {
      console.error('Failed to delete error:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting error:', error);
    return { success: false, error };
  }
}

/**
 * Creates a wrapper function that automatically records errors
 * @param fn Function to wrap
 * @param options Error recording options
 * @returns Wrapped function that records errors
 */
export function withErrorRecording<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  options?: {
    component?: string;
    errorType?: string;
    getUserId?: () => string | undefined;
  }
): T {
  return (async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      await recordError(error as Error, {
        component: options?.component,
        errorType: options?.errorType,
        userId: options?.getUserId?.(),
        metadata: { args: JSON.stringify(args) },
      });
      throw error; // Re-throw to allow the caller to handle it
    }
  }) as T;
}
