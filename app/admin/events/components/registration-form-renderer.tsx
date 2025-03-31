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
import { getEventFormSchema } from '../services/form-schema-service';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface RegistrationFormRendererProps {
  eventId: string;
  onSubmit?: (data: Record<string, any>) => Promise<void>;
}

export default function RegistrationFormRenderer({
  eventId,
  onSubmit,
}: RegistrationFormRendererProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [formSchema, setFormSchema] = useState<FormSchema | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  // Create a mapping between field IDs and labels
  const [fieldMapping, setFieldMapping] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadFormSchema = async () => {
      try {
        setIsLoading(true);
        const schema = await getEventFormSchema(eventId);

        if (schema) {
          const formattedSchema = {
            ...schema,
            description: schema.description || undefined,
          };
          setFormSchema(formattedSchema);

          // Initialize form data with empty values using unique field IDs
          const initialData: Record<string, any> = {};
          const mapping: Record<string, string> = {};

          schema.fields.forEach((field) => {
            const fieldId = `field_${field.id}`;
            initialData[fieldId] = '';
            mapping[fieldId] = field.label;
          });

          setFormData(initialData);
          setFieldMapping(mapping);
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
  }, [eventId, toast]);

  const handleChange = (field: FormField, value: any) => {
    const fieldId = `field_${field.id}`;
    setFormData({
      ...formData,
      [fieldId]: value,
    });

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
      const value = formData[fieldId];

      if (field.required) {
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[fieldId] = 'This field is required';
          isValid = false;
        }
      }

      // Add more validations based on field type if needed
      if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          newErrors[fieldId] = 'Please enter a valid email address';
          isValid = false;
        }
      }

      if (field.type === 'phone' && value) {
        // Basic phone validation - this can be improved
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
          const label = fieldMapping[fieldId];
          if (label) {
            acc[label] = value;
          }
          return acc;
        },
        {} as Record<string, any>
      );

      // Format the submission data using labels
      const submissionData = {
        event_id: eventId,
        form_schema_id: formSchema?.id,
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>{formSchema.title}</CardTitle>
        {formSchema.description && (
          <CardDescription>{formSchema.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formSchema.fields.map((field) => renderField(field))}

          <CardFooter className="px-0 pt-6 flex justify-end">
            <Button type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Registration'}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
