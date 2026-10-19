import * as z from 'zod';

// Optional URL inputs submit '' when left blank, which z.string().url() rejects
const optionalUrl = (message: string) =>
  z
    .string()
    .trim()
    .optional()
    .refine((val) => !val || /^https?:\/\/\S+$/i.test(val), { message });

// The description is rich text HTML: measure the visible text, not the markup
const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

// Which create/edit tab each field lives on, so errors can be surfaced
export const eventFieldTabs: Record<string, 'details' | 'pricing'> = {
  bannerImageUrl: 'details',
  galleryImages: 'details',
  videoUrl: 'details',
  title: 'details',
  theme: 'details',
  description: 'details',
  startDate: 'details',
  endDate: 'details',
  registrationDeadline: 'details',
  location: 'details',
  eventType: 'details',
  eventLink: 'details',
  whatsappLink: 'details',
  price: 'pricing',
  hasEarlyBird: 'pricing',
  earlyBirdPrice: 'pricing',
  earlyBirdDeadline: 'pricing',
  capacity: 'pricing',
  isFree: 'pricing',
  requireApproval: 'pricing',
};

// Form schema for event creation
export const eventFormSchema = z
  .object({
    bannerImageUrl: z
      .string({ required_error: 'A banner image is required.' })
      .trim()
      .url({
        message: 'Please enter a valid URL for the banner image.',
      }),
    galleryImages: z
      .array(
        z.string().url({
          message: 'Please enter a valid URL for the gallery image.',
        })
      )
      .max(10, {
        message: 'You can add a maximum of 10 gallery images.',
      })
      .optional(),
    videoUrl: optionalUrl('Please enter a valid URL for the video.'),
    title: z.string().trim().min(5, {
      message: 'Event title must be at least 5 characters.',
    }),
    theme: z.string().optional(),
    description: z
      .string({ required_error: 'Description is required.' })
      .refine((val) => stripHtml(val).length >= 20, {
        message: 'Description must be at least 20 characters.',
      }),
    startDate: z.date({
      required_error: 'Start date is required.',
    }),
    endDate: z.date({
      required_error: 'End date is required.',
    }),
    location: z.string().trim().min(3, {
      message: 'Location must be at least 3 characters.',
    }),
    eventType: z.enum(['physical', 'online', 'hybrid'], {
      required_error: 'Event type is required.',
    }),
    eventLink: optionalUrl('Please enter a valid URL for the event link.'),
    price: z.number().min(0, {
      message: 'Price cannot be negative.',
    }),
    hasEarlyBird: z.boolean().default(false),
    earlyBirdPrice: z
      .number()
      .min(0, {
        message: 'Early bird price cannot be negative.',
      })
      .optional(),
    earlyBirdDeadline: z.date().optional(),
    registrationDeadline: z.date({
      required_error: 'Registration deadline is required.',
    }),
    capacity: z
      .number()
      .min(0, {
        message: 'Capacity cannot be negative.',
      })
      .optional(),
    isFree: z.boolean().default(false),
    requireApproval: z.boolean().default(false),
    additionalInfo: z.string().optional(),
    formSchemaId: z.string().optional(),
    whatsappLink: optionalUrl('Please enter a valid WhatsApp group link.'),
  })
  .superRefine((data, ctx) => {
    const issue = (path: string, message: string) =>
      ctx.addIssue({ code: z.ZodIssueCode.custom, message, path: [path] });

    if (data.startDate && data.endDate && data.startDate > data.endDate) {
      issue('endDate', 'End date must be after start date.');
    }

    if (
      data.registrationDeadline &&
      data.endDate &&
      data.registrationDeadline > data.endDate
    ) {
      issue(
        'registrationDeadline',
        'Registration deadline cannot be after the event ends.'
      );
    }

    if (!data.isFree && !(data.price > 0)) {
      issue('price', 'Enter a ticket price, or mark the event as free.');
    }

    if (data.hasEarlyBird && !data.isFree) {
      if (data.earlyBirdPrice === undefined || data.earlyBirdPrice <= 0) {
        issue('earlyBirdPrice', 'Enter the early bird price.');
      } else if (data.earlyBirdPrice >= data.price) {
        issue(
          'earlyBirdPrice',
          'Early bird price should be lower than the regular price.'
        );
      }

      if (!data.earlyBirdDeadline) {
        issue('earlyBirdDeadline', 'Select when early bird pricing ends.');
      } else if (
        data.registrationDeadline &&
        data.earlyBirdDeadline > data.registrationDeadline
      ) {
        issue(
          'earlyBirdDeadline',
          'Early bird deadline cannot be after the registration deadline.'
        );
      }
    }
  });

export type EventFormValues = z.infer<typeof eventFormSchema>;

// Interface for form field types
export type FormFieldType =
  | 'text'
  | 'email'
  | 'phone'
  | 'select'
  | 'checkbox'
  | 'textarea';

export type EventStatus =
  | 'draft'
  | 'published'
  | 'completed'
  | 'cancelled'
  | 'archived';

// Interface for form field
export interface FormField {
  id: number;
  type: FormFieldType;
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

// Supabase table schema
export interface EventTable {
  id: string;
  banner_image_url: string;
  gallery_images: string[] | null;
  video_url: string | null;
  title: string;
  theme: string | null;
  description: string;
  start_date: string; // ISO date string
  end_date: string; // ISO date string
  location: string;
  event_type: 'physical' | 'online' | 'hybrid';
  event_link: string | null;
  eventLink: string | null;
  price: number;
  has_early_bird: boolean;
  early_bird_price: number | null;
  early_bird_deadline: string | null; // ISO date string
  registration_deadline: string; // ISO date string
  capacity: number | null;
  is_free: boolean;
  require_approval: boolean;
  additional_info: string | null;
  form_schema_id: string | null; // Reference to the form schema
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  status: EventStatus;
  registrations_count: number;
  is_active?: boolean;
  whatsapp_group_url: string | null;
  whatsappGroupUrl?: string | null;
}

// Interface for form schema
export interface FormSchema {
  id: string;
  event_id: string;
  title: string;
  description?: string;
  fields: FormField[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Interface for events as they come from the database
export interface Event {
  id: string;
  bannerImageUrl?: string;
  banner_image_url?: string;
  galleryImages?: string[];
  gallery_images?: string[];
  videoUrl?: string | null;
  video_url?: string | null;
  title: string;
  theme?: string | null;
  description?: string;
  startDate?: string | null; // ISO date string
  endDate?: string | null; // ISO date string
  start_date?: string | null; // Database field names
  end_date?: string | null; // Database field names
  location?: string | null;
  eventType?: string | null;
  event_type?: string | null; // Database field name
  price?: number;
  hasEarlyBird?: boolean;
  has_early_bird?: boolean; // Database field name
  earlyBirdPrice?: number | null;
  early_bird_price?: number | null; // Database field name
  earlyBirdDeadline?: string | null;
  early_bird_deadline?: string | null; // Database field name
  registrationDeadline?: string | null;
  registration_deadline?: string | null; // Database field name
  capacity?: number | null;
  isFree?: boolean;
  is_free?: boolean; // Database field name
  requireApproval?: boolean;
  require_approval?: boolean; // Database field name
  additionalInfo?: string | null;
  additional_info?: string | null; // Database field name
  formSchemaId?: string | null;
  form_schema_id?: string | null; // Database field name
  created_at?: string; // ISO date string
  updated_at?: string; // ISO date string
  status?: EventStatus;
  is_active?: boolean;
  registrations_count?: number;
  whatsapp_group_url?: string | null;
  whatsappGroupUrl?: string | null;
  event_link?: string | null;
  eventLink?: string | null;
}
