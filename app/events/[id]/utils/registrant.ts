import { FormSchema } from '@/app/admin/events/models/form-schema';

// Responses are keyed by field label, which admins can rename. Find the
// registrant's email/name from the field types (or label patterns when the
// schema is not at hand) instead of fixed labels.
export function getRegistrantDetails(
  responses: Record<string, any>,
  schema?: FormSchema | null
) {
  const fields = schema?.fields || [];
  const keys = Object.keys(responses || {});

  const emailLabel =
    fields.find((field) => field.type === 'email')?.label ||
    keys.find((key) => /e-?mail/i.test(key));
  const nameLabel =
    fields.find((field) => /full\s*name/i.test(field.label))?.label ||
    fields.find((field) => field.type === 'text' && /name/i.test(field.label))
      ?.label ||
    keys.find((key) => /full\s*name/i.test(key)) ||
    keys.find((key) => /name/i.test(key) && !/account/i.test(key));

  return {
    email: emailLabel ? String(responses[emailLabel] || '').trim() : '',
    name: nameLabel ? String(responses[nameLabel] || '').trim() : '',
  };
}
