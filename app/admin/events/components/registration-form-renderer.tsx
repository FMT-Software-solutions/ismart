'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { FormSchema, FormField } from '../models/form-schema';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RegistrationFormRendererProps {
  eventId?: string;
  formSchema?: FormSchema | null;
  onSubmit?: (data: Record<string, any>) => Promise<void>;
  isPreview?: boolean;
}

export default function RegistrationFormRenderer({
  eventId,
  formSchema: initialFormSchema,
  onSubmit,
  isPreview = false,
}: RegistrationFormRendererProps) {
  const { toast } = useToast();
  const [formSchema, setFormSchema] = useState<FormSchema | null>(
    initialFormSchema || null
  );
  const [isLoading, setIsLoading] = useState(!initialFormSchema && !!eventId);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [visibleFields, setVisibleFields] = useState<string[]>([]);

  // Create a mapping between field IDs and labels
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadFormSchema = async () => {
      if (!eventId || initialFormSchema) return;

      try {
        setIsLoading(true);
        // This would be your API call to get the schema
        // const schema = await getEventFormSchema(eventId);
        const schema: FormSchema | null = null; // Replace with actual API call

        if (schema) {
          setFormSchema(schema);
          initializeFormData(schema);
        } else {
          setFormSchema(null);
        }
      } catch (error) {
        console.error('Error loading form schema:', error);
        toast({
          title: 'Error',
          description: 'Failed to load registration form',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadFormSchema();
  }, [eventId, initialFormSchema, toast]);

  useEffect(() => {
    if (initialFormSchema) {
      setFormSchema(initialFormSchema);
      initializeFormData(initialFormSchema);
    }
  }, [initialFormSchema]);

  const initializeFormData = (schema: FormSchema) => {
    const initialData: Record<string, any> = {};
    const mapping: Record<string, string> = {};

    schema.fields.forEach((field) => {
      const fieldId = `field_${field.id}`;
      initialData[fieldId] = '';
      mapping[fieldId] = field.label;
    });

    setFormData(initialData);
    setFieldMapping(mapping);
    updateVisibleFields(initialData, schema.fields);
  };

  const updateVisibleFields = (
    currentFormData: Record<string, any>,
    fields: FormField[]
  ) => {
    const visible = fields
      .filter((field) => {
        if (!field.conditions || field.conditions.length === 0) return true;

        return field.conditions.some((condition) => {
          const dependentFieldId = `field_${condition.fieldId}`;
          const dependentValue = currentFormData[dependentFieldId];
          return condition.value === dependentValue;
        });
      })
      .map((field) => `field_${field.id}`);

    setVisibleFields(visible);
  };

  const handleChange = (field: FormField, value: any) => {
    const fieldId = `field_${field.id}`;
    const newFormData = {
      ...formData,
      [fieldId]: value,
    };

    setFormData(newFormData);

    // Update visible fields based on new value
    if (formSchema) {
      updateVisibleFields(newFormData, formSchema.fields);
    }

    // Clear error when field is updated
    if (errors[fieldId]) {
      const newErrors = { ...errors };
      delete newErrors[fieldId];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    if (!formSchema) return false;

    const newErrors: Record<string, string> = {};
    let isValid = true;

    formSchema.fields.forEach((field) => {
      const fieldId = `field_${field.id}`;

      // Skip validation for hidden fields
      if (!visibleFields.includes(fieldId)) return;

      const value = formData[fieldId];

      if (field.required) {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[fieldId] = 'This field is required';
          isValid = false;
        }
      }

      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[fieldId] = 'Please enter a valid email address';
          isValid = false;
        }
      }

      if (field.type === 'phone' && value) {
        const phoneRegex = /^[0-9+\s()-]{7,15}$/;
        if (!phoneRegex.test(value)) {
          newErrors[fieldId] = 'Please enter a valid phone number';
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSubmitting(true);

      // Transform the form data to use labels as keys for submission
      const labelBasedData = Object.entries(formData).reduce(
        (acc, [fieldId, value]) => {
          // Only include visible fields
          if (visibleFields.includes(fieldId)) {
            const label = fieldMapping[fieldId];
            if (label) {
              acc[label] = value;
            }
          }
          return acc;
        },
        {} as Record<string, any>
      );

      // Format the submission data using labels
      const submissionData = {
        ...(eventId && { event_id: eventId }),
        ...(formSchema?.id && { form_schema_id: formSchema.id }),
        responses: labelBasedData,
      };

      if (onSubmit) {
        await onSubmit(submissionData);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit registration form',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const fieldId = `field_${field.id}`;

    // Don't render if field should be hidden
    if (!visibleFields.includes(fieldId)) return null;

    const value = formData[fieldId] || '';
    const error = errors[fieldId];

    return (
      <div key={field.id} className="space-y-2">
        <Label htmlFor={fieldId}>
          {field.label}
          {field.required && <span className="ml-1 text-red-500">*</span>}
        </Label>

        {field.type === 'text' && (
          <Input
            id={fieldId}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        )}

        {field.type === 'email' && (
          <Input
            id={fieldId}
            type="email"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        )}

        {field.type === 'phone' && (
          <Input
            id={fieldId}
            type="tel"
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        )}

        {field.type === 'textarea' && (
          <Textarea
            id={fieldId}
            placeholder={field.placeholder}
            value={value}
            onChange={(e) => handleChange(field, e.target.value)}
            className={error ? 'border-red-500' : ''}
          />
        )}

        {field.type === 'select' && (
          <Select
            value={value}
            onValueChange={(value) => handleChange(field, value)}
          >
            <SelectTrigger className={error ? 'border-red-500' : ''}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {field.type === 'checkbox' && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id={fieldId}
              checked={!!value}
              onCheckedChange={(checked) => handleChange(field, checked)}
            />
            <label htmlFor={fieldId} className="text-sm cursor-pointer">
              {field.placeholder || 'Yes, I agree'}
            </label>
          </div>
        )}

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  };

  const formContent = formSchema ? (
    <div className="space-y-6">
      {formSchema.fields.map((field) => renderField(field))}
      {!isPreview && (
        <div className="flex justify-end pt-6">
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Submit Registration'}
          </Button>
        </div>
      )}
    </div>
  ) : null;

  if (isLoading) {
    return <div className="flex justify-center py-8">Loading form...</div>;
  }

  if (!formSchema) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          No registration form has been configured for this event.
        </AlertDescription>
      </Alert>
    );
  }

  if (isPreview) {
    return (
      <div className="space-y-6">
        <h3 className="text-lg font-medium">{formSchema.title}</h3>
        {formSchema.description && (
          <p className="text-sm text-gray-500 mb-4">{formSchema.description}</p>
        )}
        <form onSubmit={handleSubmit}>{formContent}</form>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{formSchema.title}</CardTitle>
        {formSchema.description && (
          <CardDescription>{formSchema.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>{formContent}</form>
      </CardContent>
    </Card>
  );
}
