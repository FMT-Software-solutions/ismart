import { createServerSupabaseClient } from '@/lib/supabase/server';

export interface DonationRecord {
  id: string;
  created_at: string;
  donation_reference: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  amount: number;
  payment_method: string;
  message?: string;
  payment_status?: string;
  payment_details?: {
    transaction_id: string;
    account_name: string;
    amount: number;
  };
}

export interface DonationFilters {
  status?: string;
  search?: string;
  sortBy?: 'created_at' | 'amount';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Save a donation record to the database
 */
export async function saveDonationToDatabase(
  donation: Partial<DonationRecord>
) {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('donations')
      .insert({
        donation_reference: donation.donation_reference,
        first_name: donation.first_name,
        last_name: donation.last_name,
        email: donation.email,
        phone: donation.phone || null,
        amount: donation.amount,
        payment_method: donation.payment_method,
        message: donation.message || null,
        payment_status: donation.payment_status || 'completed',
        payment_date: new Date().toISOString(),
        payment_details: donation.payment_details || null,
      })
      .select()
      .single();

    if (error) {
      console.error('Error saving donation to database:', error);
      throw error;
    }

    return { success: true, data };
  } catch (error) {
    console.error('Failed to save donation:', error);
    throw error;
  }
}

/**
 * Get a donation record by reference
 */
export async function getDonationByReference(reference: string) {
  try {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .eq('donation_reference', reference)
      .single();

    if (error) {
      console.error('Error fetching donation:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Failed to get donation by reference:', error);
    throw error;
  }
}

export async function updateDonationStatus(
  donationId: string,
  status: 'pending' | 'confirmed'
) {
  try {
    const supabase = await createServerSupabaseClient();

    const { error } = await supabase
      .from('donations')
      .update({ payment_status: status })
      .eq('id', donationId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating donation status:', error);
    return { success: false };
  }
}

export async function getDonations(filters: DonationFilters = {}) {
  try {
    const supabase = await createServerSupabaseClient();
    let query = supabase.from('donations').select('*', { count: 'exact' });

    // Apply status filter
    if (filters.status && filters.status !== 'all') {
      query = query.eq('payment_status', filters.status);
    }

    // Apply search filter
    if (filters.search) {
      query = query.or(
        `first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%`
      );
    }

    // Apply sorting
    const sortBy = filters.sortBy || 'created_at';
    const sortOrder = filters.sortOrder || 'desc';
    query = query.order(sortBy, { ascending: sortOrder === 'asc' });

    const { data, error, count } = await query;

    if (error) {
      console.error('Error fetching donations:', error);
      throw error;
    }

    return { data, count };
  } catch (error) {
    console.error('Failed to get donations:', error);
    throw error;
  }
}
