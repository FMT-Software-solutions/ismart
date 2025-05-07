import { createServerSupabaseClient } from '@/lib/supabase/server';

export interface DonationRecord {
  donation_reference: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  amount: number;
  payment_method: string;
  message?: string;
  payment_status?: string;
}

/**
 * Save a donation record to the database
 */
export async function saveDonationToDatabase(donation: DonationRecord) {
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
