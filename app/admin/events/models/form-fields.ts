// Form field types to be used in event registration
export enum FieldType {
  TEXT = 'text',
  TEXTAREA = 'textarea',
  EMAIL = 'email',
  TEL = 'tel',
  NUMBER = 'number',
  DATE = 'date',
  SELECT = 'select',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
  FILE = 'file',
  RICH_TEXT = 'rich_text',
  GROUP = 'group', // For grouping related fields
  DIVIDER = 'divider', // Visual separator
  HEADING = 'heading', // Section heading
}

// Form field categories
export enum FieldCategory {
  PERSONAL = 'personal',
  CONTACT = 'contact',
  DEMOGRAPHIC = 'demographic',
  EDUCATION = 'education',
  EXPERIENCE = 'experience',
  EVENT_SPECIFIC = 'event_specific',
  DOCUMENTS = 'documents',
  AGREEMENT = 'agreement',
}

// Options for select, radio, checkbox fields
export interface FieldOption {
  label: string;
  value: string;
}

// Base form field interface
export interface FormField {
  id: string;
  type: FieldType;
  name: string;
  label: string;
  category: FieldCategory;
  placeholder?: string;
  helpText?: string;
  required: boolean;
  hidden?: boolean;
  disabled?: boolean;
  defaultValue?: any;
  order: number;
  validations?: FieldValidation[];
  conditional?: FieldCondition; // Show this field based on another field's value
  options?: FieldOption[];
}

// Validation rules for fields
export interface FieldValidation {
  type:
    | 'required'
    | 'min'
    | 'max'
    | 'email'
    | 'pattern'
    | 'minDate'
    | 'maxDate';
  value?: any;
  message: string;
}

// Conditional display logic
export interface FieldCondition {
  fieldId: string; // ID of field this condition depends on
  operator: 'equals' | 'notEquals' | 'contains' | 'greaterThan' | 'lessThan';
  value: any;
}

// Text input field
export interface TextField extends FormField {
  type: FieldType.TEXT | FieldType.EMAIL | FieldType.TEL | FieldType.NUMBER;
  minLength?: number;
  maxLength?: number;
}

// Textarea field
export interface TextareaField extends FormField {
  type: FieldType.TEXTAREA;
  minLength?: number;
  maxLength?: number;
  rows?: number;
}

// Rich text field (uses the rich text editor)
export interface RichTextField extends FormField {
  type: FieldType.RICH_TEXT;
}

// Date field
export interface DateField extends FormField {
  type: FieldType.DATE;
  minDate?: string;
  maxDate?: string;
}

// Select field
export interface SelectField extends FormField {
  type: FieldType.SELECT;
  options: FieldOption[];
  multiple?: boolean;
}

// Radio field
export interface RadioField extends FormField {
  type: FieldType.RADIO;
  options: FieldOption[];
}

// Checkbox field
export interface CheckboxField extends FormField {
  type: FieldType.CHECKBOX;
  options?: FieldOption[]; // If provided, creates multiple checkboxes
}

// File upload field
export interface FileField extends FormField {
  type: FieldType.FILE;
  accept?: string; // File types to accept
  multiple?: boolean;
  maxSize?: number; // Max file size in bytes
}

// Group field for related fields
export interface GroupField extends FormField {
  type: FieldType.GROUP;
  fields: FormField[];
}

// Visual divider
export interface DividerField extends FormField {
  type: FieldType.DIVIDER;
}

// Section heading
export interface HeadingField extends FormField {
  type: FieldType.HEADING;
  headingLevel: 1 | 2 | 3 | 4 | 5 | 6;
}

// All possible field types
export type AnyFormField =
  | TextField
  | TextareaField
  | RichTextField
  | DateField
  | SelectField
  | RadioField
  | CheckboxField
  | FileField
  | GroupField
  | DividerField
  | HeadingField;

// Form section (for organizing fields into sections)
export interface FormSection {
  id: string;
  title: string;
  description?: string;
  order: number;
  fields: AnyFormField[];
}

// Complete form schema
export interface FormSchema {
  id: string;
  eventId: string;
  title: string;
  description?: string;
  sections: FormSection[];
  createdAt: string;
  updatedAt: string;
}

// Pre-defined general and optional fields based on provided examples
export const generalFields: AnyFormField[] = [
  {
    id: 'title',
    type: FieldType.TEXT,
    name: 'title',
    label: 'Title',
    category: FieldCategory.PERSONAL,
    placeholder: 'Mr/Mrs/Dr/Prof',
    order: 1,
    required: true,
  },
  {
    id: 'firstName',
    type: FieldType.TEXT,
    name: 'firstName',
    label: 'First Name',
    category: FieldCategory.PERSONAL,
    placeholder: 'Enter your first name',
    helpText: 'As it appears on your National ID',
    order: 2,
    required: true,
  },
  {
    id: 'middleName',
    type: FieldType.TEXT,
    name: 'middleName',
    label: 'Middle Name',
    category: FieldCategory.PERSONAL,
    placeholder: 'Enter your middle name',
    order: 3,
    required: false,
  },
  {
    id: 'lastName',
    type: FieldType.TEXT,
    name: 'lastName',
    label: 'Last Name',
    category: FieldCategory.PERSONAL,
    placeholder: 'Enter your last name',
    order: 4,
    required: true,
  },
  {
    id: 'email',
    type: FieldType.EMAIL,
    name: 'email',
    label: 'Email',
    category: FieldCategory.CONTACT,
    placeholder: 'Enter your email address',
    order: 5,
    required: true,
    validations: [
      {
        type: 'email',
        message: 'Please enter a valid email address',
      },
    ],
  },
  {
    id: 'contactNumber',
    type: FieldType.TEL,
    name: 'contactNumber',
    label: 'Contact Number',
    category: FieldCategory.CONTACT,
    placeholder: 'Enter your contact number',
    order: 6,
    required: true,
  },
];

export const optionalFields: AnyFormField[] = [
  {
    id: 'whatsappNumber',
    type: FieldType.TEL,
    name: 'whatsappNumber',
    label: 'WhatsApp Number (if different from Contact Number)',
    category: FieldCategory.CONTACT,
    placeholder: 'Enter your WhatsApp number',
    order: 7,
    required: false,
  },
  {
    id: 'age',
    type: FieldType.NUMBER,
    name: 'age',
    label: 'Age',
    category: FieldCategory.DEMOGRAPHIC,
    placeholder: 'Enter your age',
    order: 8,
    required: false,
  },
  {
    id: 'dateOfBirth',
    type: FieldType.DATE,
    name: 'dateOfBirth',
    label: 'Date of Birth',
    category: FieldCategory.DEMOGRAPHIC,
    placeholder: 'Select your date of birth',
    order: 9,
    required: false,
  },
  {
    id: 'sex',
    type: FieldType.RADIO,
    name: 'sex',
    label: 'Sex',
    category: FieldCategory.DEMOGRAPHIC,
    order: 10,
    required: false,
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
    ],
  },
  {
    id: 'nationality',
    type: FieldType.SELECT,
    name: 'nationality',
    label: 'Nationality',
    category: FieldCategory.DEMOGRAPHIC,
    placeholder: 'Select your nationality',
    order: 11,
    required: false,
    options: [
      { label: 'Ghana', value: 'ghana' },
      { label: 'Nigeria', value: 'nigeria' },
      { label: 'Kenya', value: 'kenya' },
      // Add more countries as needed
    ],
  },
  {
    id: 'profession',
    type: FieldType.TEXT,
    name: 'profession',
    label: 'Profession',
    category: FieldCategory.DEMOGRAPHIC,
    placeholder: 'Enter your profession',
    order: 12,
    required: false,
  },
  {
    id: 'educationalBackground',
    type: FieldType.SELECT,
    name: 'educationalBackground',
    label: 'Educational Background',
    category: FieldCategory.EDUCATION,
    placeholder: 'Select your highest education level',
    order: 13,
    required: false,
    options: [
      { label: 'Primary', value: 'primary' },
      { label: 'Secondary', value: 'secondary' },
      { label: 'Tertiary', value: 'tertiary' },
    ],
  },
  {
    id: 'religiousAffiliation',
    type: FieldType.SELECT,
    name: 'religiousAffiliation',
    label: 'Religious Affiliation',
    category: FieldCategory.DEMOGRAPHIC,
    placeholder: 'Select your religious affiliation',
    order: 14,
    required: false,
    options: [
      { label: 'Christian', value: 'christian' },
      { label: 'Muslim', value: 'muslim' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    id: 'maritalStatus',
    type: FieldType.SELECT,
    name: 'maritalStatus',
    label: 'Marital Status',
    category: FieldCategory.DEMOGRAPHIC,
    placeholder: 'Select your marital status',
    order: 15,
    required: false,
    options: [
      { label: 'Single', value: 'single' },
      { label: 'Married', value: 'married' },
      { label: 'Divorced', value: 'divorced' },
    ],
  },
  {
    id: 'address',
    type: FieldType.GROUP,
    name: 'address',
    label: 'Address',
    category: FieldCategory.CONTACT,
    order: 16,
    required: false,
    fields: [
      {
        id: 'addressLine1',
        type: FieldType.TEXT,
        name: 'addressLine1',
        label: 'Address Line 1',
        category: FieldCategory.CONTACT,
        placeholder: 'Enter your address line 1',
        order: 1,
        required: true,
      },
      {
        id: 'addressLine2',
        type: FieldType.TEXT,
        name: 'addressLine2',
        label: 'Address Line 2',
        category: FieldCategory.CONTACT,
        placeholder: 'Enter your address line 2',
        order: 2,
        required: false,
      },
      {
        id: 'city',
        type: FieldType.TEXT,
        name: 'city',
        label: 'City',
        category: FieldCategory.CONTACT,
        placeholder: 'Enter your city',
        order: 3,
        required: true,
      },
      {
        id: 'zipCode',
        type: FieldType.TEXT,
        name: 'zipCode',
        label: 'GPS Code/Zip Code',
        category: FieldCategory.CONTACT,
        placeholder: 'Enter your GPS/ZIP code',
        order: 4,
        required: false,
      },
      {
        id: 'country',
        type: FieldType.SELECT,
        name: 'country',
        label: 'Country',
        category: FieldCategory.CONTACT,
        placeholder: 'Select your country',
        order: 5,
        required: true,
        options: [
          { label: 'Ghana', value: 'ghana' },
          { label: 'Nigeria', value: 'nigeria' },
          { label: 'Kenya', value: 'kenya' },
          // Add more countries as needed
        ],
      },
    ],
  },
  {
    id: 'expectations',
    type: FieldType.TEXTAREA,
    name: 'expectations',
    label: 'What are your expectations?',
    category: FieldCategory.EVENT_SPECIFIC,
    placeholder: 'Enter your expectations for this event',
    order: 17,
    required: false,
    rows: 3,
  },
  {
    id: 'wantsCertificate',
    type: FieldType.CHECKBOX,
    name: 'wantsCertificate',
    label: 'Do you want certificate(s)?',
    category: FieldCategory.EVENT_SPECIFIC,
    order: 18,
    required: false,
  },
  {
    id: 'interestedInPersonSession',
    type: FieldType.CHECKBOX,
    name: 'interestedInPersonSession',
    label: 'Are you interested in the in-person session?',
    category: FieldCategory.EVENT_SPECIFIC,
    order: 19,
    required: false,
  },
  {
    id: 'hearAboutTraining',
    type: FieldType.SELECT,
    name: 'hearAboutTraining',
    label: 'How did you hear about this training/programme?',
    category: FieldCategory.EVENT_SPECIFIC,
    placeholder: 'Select an option',
    order: 20,
    required: false,
    options: [
      { label: 'Social Media', value: 'social_media' },
      { label: 'Friend/Colleague', value: 'friend_colleague' },
      { label: 'Website', value: 'website' },
      { label: 'Email Newsletter', value: 'email_newsletter' },
      { label: 'Other', value: 'other' },
    ],
  },
  {
    id: 'interestedInNewsletter',
    type: FieldType.CHECKBOX,
    name: 'interestedInNewsletter',
    label: 'Are you interested in receiving our monthly newsletter?',
    category: FieldCategory.EVENT_SPECIFIC,
    order: 21,
    required: false,
  },
  {
    id: 'interestedInVolunteering',
    type: FieldType.CHECKBOX,
    name: 'interestedInVolunteering',
    label: 'Are you interested in volunteering?',
    category: FieldCategory.EVENT_SPECIFIC,
    order: 22,
    required: false,
  },
  {
    id: 'dietaryRestrictions',
    type: FieldType.TEXTAREA,
    name: 'dietaryRestrictions',
    label: 'Do you have any dietary restrictions?',
    category: FieldCategory.EVENT_SPECIFIC,
    placeholder: 'Enter any dietary restrictions',
    order: 23,
    required: false,
    rows: 2,
  },
  {
    id: 'tshirtSize',
    type: FieldType.SELECT,
    name: 'tshirtSize',
    label: 'Select T-shirt size',
    category: FieldCategory.EVENT_SPECIFIC,
    placeholder: 'Select a size',
    order: 24,
    required: false,
    options: [
      { label: 'Small (S)', value: 'S' },
      { label: 'Medium (M)', value: 'M' },
      { label: 'Large (L)', value: 'L' },
      { label: 'Extra Large (XL)', value: 'XL' },
      { label: 'Double Extra Large (XXL)', value: 'XXL' },
      { label: 'Triple Extra Large (XXXL)', value: 'XXXL' },
    ],
  },
  {
    id: 'tshirtColor',
    type: FieldType.SELECT,
    name: 'tshirtColor',
    label: 'Select T-shirt color',
    category: FieldCategory.EVENT_SPECIFIC,
    placeholder: 'Select a color',
    order: 25,
    required: false,
    options: [
      { label: 'White', value: 'white' },
      { label: 'Red', value: 'red' },
      { label: 'Yellow', value: 'yellow' },
      { label: 'Blue', value: 'blue' },
      { label: 'Ash', value: 'ash' },
      { label: 'Purple', value: 'purple' },
      { label: 'Green', value: 'green' },
      { label: 'Black', value: 'black' },
    ],
  },
];

// Special field for consent agreements
export const consentFields: AnyFormField[] = [
  {
    id: 'voluntaryConsent',
    type: FieldType.CHECKBOX,
    name: 'voluntaryConsent',
    label: 'Voluntary Consent',
    category: FieldCategory.AGREEMENT,
    helpText:
      'I/We acknowledge that this training/event is Christ-centered and I am a matured individual who is well informed about sexuality and its impacts. I/We have voluntarily consented to enroll and participate in this event offered by Institute of Sexuality Marriage and Family Life Research Training (iSMART) related to human sexuality, marriage and family life.',
    order: 26,
    required: true,
  },
  {
    id: 'confidentiality',
    type: FieldType.CHECKBOX,
    name: 'confidentiality',
    label: 'Confidentiality',
    category: FieldCategory.AGREEMENT,
    helpText:
      'I/We acknowledge and agree that all materials, case studies, discussions, demonstrations, and personal information shared or provided during this training/event are strictly confidential. I also agree that this confidentiality extends to all verbal, written, and electronic forms of communication and materials used in or derived from the Training.',
    order: 27,
    required: true,
  },
  {
    id: 'conductPledge',
    type: FieldType.CHECKBOX,
    name: 'conductPledge',
    label: 'Conduct Pledge',
    category: FieldCategory.AGREEMENT,
    helpText:
      'We/I the undersigned couple as participating spouses of this iSMART event, pledge solemnly and unreservedly to abide by all terms, regulations and directives pertaining thereto our participation in this training session. We/I also make a commitment NOT to use illicit drugs, alcohol, indecent/disrespecting comment(s), political hostility and inappropriate dressing.',
    order: 28,
    required: true,
  },
  {
    id: 'valuablesPledge',
    type: FieldType.CHECKBOX,
    name: 'valuablesPledge',
    label: 'Valuables Pledge',
    category: FieldCategory.AGREEMENT,
    helpText:
      'I/We will endeavor to declare our valuables for safe keeping. If we do not declare, the Hosting Facility Management and/or iSMART will not be held liable for any loss outside the premises in the course of my/our stay. I/We, the undersigned, do agree to bind ourselves to ALL conditions for Residents and participants of this event.',
    order: 29,
    required: true,
  },
];

// Academic qualification fields
export const academicFields: AnyFormField[] = [
  {
    id: 'academicQualifications',
    type: FieldType.GROUP,
    name: 'academicQualifications',
    label: 'Academic Qualifications',
    category: FieldCategory.EDUCATION,
    order: 30,
    required: false,
    fields: [
      {
        id: 'programme',
        type: FieldType.TEXT,
        name: 'programme',
        label: 'Programme',
        category: FieldCategory.EDUCATION,
        placeholder: 'Enter programme name',
        order: 1,
        required: true,
      },
      {
        id: 'university',
        type: FieldType.TEXT,
        name: 'university',
        label: 'Name of University',
        category: FieldCategory.EDUCATION,
        placeholder: 'Enter university name',
        order: 2,
        required: true,
      },
      {
        id: 'country',
        type: FieldType.TEXT,
        name: 'country',
        label: 'Country of Study',
        category: FieldCategory.EDUCATION,
        placeholder: 'Enter country',
        order: 3,
        required: true,
      },
      {
        id: 'levelOfStudy',
        type: FieldType.SELECT,
        name: 'levelOfStudy',
        label: 'Level of Study',
        category: FieldCategory.EDUCATION,
        placeholder: 'Select level',
        order: 4,
        required: true,
        options: [
          { label: 'Undergraduate', value: 'undergraduate' },
          { label: 'Postgraduate (Masters)', value: 'masters' },
          { label: 'Postgraduate (PhD)', value: 'phd' },
        ],
      },
      {
        id: 'degreeAwarded',
        type: FieldType.TEXT,
        name: 'degreeAwarded',
        label: 'Degree Awarded',
        category: FieldCategory.EDUCATION,
        placeholder: 'Enter degree awarded',
        order: 5,
        required: true,
      },
      {
        id: 'dateStarted',
        type: FieldType.DATE,
        name: 'dateStarted',
        label: 'Date Commenced',
        category: FieldCategory.EDUCATION,
        placeholder: 'Select start date',
        order: 6,
        required: true,
      },
      {
        id: 'dateCompleted',
        type: FieldType.DATE,
        name: 'dateCompleted',
        label: 'Date Completed',
        category: FieldCategory.EDUCATION,
        placeholder: 'Select completion date',
        order: 7,
        required: true,
      },
    ],
  },
];

// Document upload fields
export const documentFields: AnyFormField[] = [
  {
    id: 'cv',
    type: FieldType.FILE,
    name: 'cv',
    label: 'CV',
    category: FieldCategory.DOCUMENTS,
    order: 31,
    required: false,
    accept: '.pdf,.doc,.docx',
  },
  {
    id: 'degreeCertificates',
    type: FieldType.FILE,
    name: 'degreeCertificates',
    label: 'Degree Certificates',
    category: FieldCategory.DOCUMENTS,
    order: 32,
    required: false,
    accept: '.pdf,.jpg,.jpeg,.png',
    multiple: true,
  },
  {
    id: 'transcripts',
    type: FieldType.FILE,
    name: 'transcripts',
    label: 'Transcripts',
    category: FieldCategory.DOCUMENTS,
    order: 33,
    required: false,
    accept: '.pdf,.jpg,.jpeg,.png',
    multiple: true,
  },
  {
    id: 'recommendationLetter',
    type: FieldType.FILE,
    name: 'recommendationLetter',
    label: 'Recommendation Letter',
    category: FieldCategory.DOCUMENTS,
    order: 34,
    required: false,
    accept: '.pdf,.doc,.docx',
  },
  {
    id: 'goalStatement',
    type: FieldType.FILE,
    name: 'goalStatement',
    label: 'Goal Statement',
    category: FieldCategory.DOCUMENTS,
    order: 35,
    required: false,
    accept: '.pdf,.doc,.docx',
  },
];
