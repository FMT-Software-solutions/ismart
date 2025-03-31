import { FormField } from '../../models/form-schema';

export const defaultSchemaFields: FormField[] = [
  {
    id: '1',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    id: '2',
    type: 'email',
    label: 'Email Address',
    placeholder: 'Enter your email address',
    required: true,
  },
  {
    id: '3',
    type: 'phone',
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
    required: false,
  },
];
