'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  FieldCategory,
  type AnyFormField,
  type FormSchema,
  type FormSection,
  generalFields,
  optionalFields,
  consentFields,
  academicFields,
  documentFields,
} from '../models/form-fields';
import { Plus, Save, Trash, MoveVertical, ArrowLeftCircle } from 'lucide-react';

interface FormBuilderProps {
  eventId: string;
  initialForm?: FormSchema;
}

export default function FormBuilder({
  eventId,
  initialForm,
}: FormBuilderProps) {
  const router = useRouter();

  // Initialize form schema with defaults or provided data
  const [formSchema, setFormSchema] = useState<FormSchema>(
    initialForm || {
      id: `form-${eventId}`,
      eventId,
      title: 'Event Registration Form',
      description:
        'Please complete all required fields to register for this event.',
      sections: [
        {
          id: 'personal-information',
          title: 'Personal Information',
          description: 'Please provide your personal details',
          order: 1,
          fields: [...generalFields],
        },
        {
          id: 'agreements',
          title: 'Terms & Agreements',
          description: 'Please read and agree to the following terms',
          order: 2,
          fields: [...consentFields],
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  );

  // Group optional fields by category
  const groupedOptionalFields: Record<string, AnyFormField[]> = {};

  [...optionalFields, ...academicFields, ...documentFields].forEach((field) => {
    const category = field.category;
    if (!groupedOptionalFields[category]) {
      groupedOptionalFields[category] = [];
    }
    groupedOptionalFields[category].push(field);
  });

  // Check if a field is already added to the form
  const isFieldAdded = (fieldId: string) => {
    return formSchema.sections.some((section) =>
      section.fields.some((field) => field.id === fieldId)
    );
  };

  // Add a field to a section
  const addField = (field: AnyFormField, sectionId: string) => {
    setFormSchema((prev) => {
      const newSchema = { ...prev };
      const sectionIndex = newSchema.sections.findIndex(
        (s) => s.id === sectionId
      );

      if (sectionIndex !== -1) {
        // Clone the field to avoid reference issues
        const fieldToAdd = { ...field };

        // Add to the section
        newSchema.sections[sectionIndex].fields.push(fieldToAdd);

        // Update lastModified
        newSchema.updatedAt = new Date().toISOString();
      }

      return newSchema;
    });
  };

  // Remove a field from a section
  const removeField = (fieldId: string, sectionId: string) => {
    setFormSchema((prev) => {
      const newSchema = { ...prev };
      const sectionIndex = newSchema.sections.findIndex(
        (s) => s.id === sectionId
      );

      if (sectionIndex !== -1) {
        newSchema.sections[sectionIndex].fields = newSchema.sections[
          sectionIndex
        ].fields.filter((f) => f.id !== fieldId);

        // Update lastModified
        newSchema.updatedAt = new Date().toISOString();
      }

      return newSchema;
    });
  };

  // Add a new section
  const addSection = () => {
    const newSectionId = `section-${Date.now()}`;
    setFormSchema((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          id: newSectionId,
          title: 'New Section',
          description: 'Section description',
          order: prev.sections.length + 1,
          fields: [],
        },
      ],
      updatedAt: new Date().toISOString(),
    }));
  };

  // Remove a section
  const removeSection = (sectionId: string) => {
    setFormSchema((prev) => ({
      ...prev,
      sections: prev.sections.filter((s) => s.id !== sectionId),
      updatedAt: new Date().toISOString(),
    }));
  };

  // Update section title or description
  const updateSection = (sectionId: string, updates: Partial<FormSection>) => {
    setFormSchema((prev) => {
      const newSchema = { ...prev };
      const sectionIndex = newSchema.sections.findIndex(
        (s) => s.id === sectionId
      );

      if (sectionIndex !== -1) {
        newSchema.sections[sectionIndex] = {
          ...newSchema.sections[sectionIndex],
          ...updates,
        };

        newSchema.updatedAt = new Date().toISOString();
      }

      return newSchema;
    });
  };

  // Handle form save
  const handleSave = async () => {
    try {
      // Navigate back to event details
      router.push(`/admin/events/${eventId}`);
    } catch (error) {
      console.error('Error saving form:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push(`/admin/events/${eventId}`)}
        >
          <ArrowLeftCircle className="mr-2 h-4 w-4" />
          Back to Event
        </Button>
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Save Form
        </Button>
      </div>

      <Tabs defaultValue="fields">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fields">Form Builder</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="fields" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Form Structure</CardTitle>
              <CardDescription>
                Organize your form into sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="space-y-4">
                {formSchema.sections.map((section) => (
                  <AccordionItem
                    key={section.id}
                    value={section.id}
                    className="border rounded-md p-2"
                  >
                    <div className="flex items-center justify-between">
                      <AccordionTrigger className="hover:no-underline">
                        <div className="text-left">
                          <h3 className="text-base font-medium">
                            {section.title}
                          </h3>
                          <p className="text-xs text-gray-500">
                            {section.description}
                          </p>
                        </div>
                      </AccordionTrigger>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSection(section.id);
                          }}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`section-title-${section.id}`}>
                              Section Title
                            </Label>
                            <input
                              id={`section-title-${section.id}`}
                              className="w-full border rounded-md p-2"
                              value={section.title}
                              onChange={(e) =>
                                updateSection(section.id, {
                                  title: e.target.value,
                                })
                              }
                              placeholder="Section Title"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`section-desc-${section.id}`}>
                              Section Description
                            </Label>
                            <input
                              id={`section-desc-${section.id}`}
                              className="w-full border rounded-md p-2"
                              value={section.description || ''}
                              onChange={(e) =>
                                updateSection(section.id, {
                                  description: e.target.value,
                                })
                              }
                              placeholder="Section Description"
                            />
                          </div>
                        </div>

                        <Separator />

                        <h4 className="font-medium">
                          Fields ({section.fields.length})
                        </h4>

                        {section.fields.length > 0 ? (
                          <div className="space-y-2">
                            {section.fields.map((field) => (
                              <div
                                key={field.id}
                                className="flex items-center justify-between border rounded-md p-3"
                              >
                                <div className="flex items-center">
                                  <MoveVertical className="h-4 w-4 text-muted-foreground mr-2" />
                                  <div>
                                    <p className="font-medium">{field.label}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {field.category} •{' '}
                                      {field.required ? 'Required' : 'Optional'}
                                    </p>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    removeField(field.id, section.id)
                                  }
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center py-4 text-sm text-muted-foreground">
                            No fields added to this section yet. Add fields from
                            the right panel.
                          </div>
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <Button onClick={addSection} className="mt-4" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Section
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Available Fields</CardTitle>
              <CardDescription>
                Drag fields into your form sections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="general">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="general">General Fields</TabsTrigger>
                  <TabsTrigger value="optional">Optional Fields</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    These fields are recommended for all events.
                  </p>
                  <div className="space-y-2">
                    {generalFields.map((field) => (
                      <div
                        key={field.id}
                        className="flex items-center justify-between border rounded-md p-3"
                      >
                        <div>
                          <p className="font-medium">{field.label}</p>
                          <p className="text-sm text-muted-foreground">
                            {field.category} •{' '}
                            {field.required ? 'Required' : 'Optional'}
                          </p>
                        </div>
                        {formSchema.sections.map((section) => (
                          <Button
                            key={section.id}
                            size="sm"
                            variant={
                              isFieldAdded(field.id) ? 'outline' : 'default'
                            }
                            disabled={isFieldAdded(field.id)}
                            onClick={() => addField(field, section.id)}
                          >
                            {isFieldAdded(field.id)
                              ? 'Added'
                              : `Add to ${section.title}`}
                          </Button>
                        ))}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="optional" className="space-y-4 pt-4">
                  <p className="text-sm text-muted-foreground">
                    These fields can be added based on the event requirements.
                  </p>

                  <Accordion type="multiple" className="space-y-4">
                    {Object.entries(groupedOptionalFields).map(
                      ([category, fields]) => (
                        <AccordionItem
                          key={category}
                          value={category}
                          className="border rounded-md"
                        >
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <h3 className="text-base font-medium">
                              {category.charAt(0).toUpperCase() +
                                category.slice(1).replace('_', ' ')}{' '}
                              Fields ({fields.length})
                            </h3>
                          </AccordionTrigger>
                          <AccordionContent className="px-4">
                            <div className="space-y-2">
                              {fields.map((field) => (
                                <div
                                  key={field.id}
                                  className="flex items-center justify-between border rounded-md p-3"
                                >
                                  <div>
                                    <p className="font-medium">{field.label}</p>
                                    <p className="text-sm text-muted-foreground">
                                      {field.type} •{' '}
                                      {field.required ? 'Required' : 'Optional'}
                                    </p>
                                  </div>
                                  <div className="flex space-x-2">
                                    {formSchema.sections.map((section) => (
                                      <Button
                                        key={section.id}
                                        size="sm"
                                        variant={
                                          isFieldAdded(field.id)
                                            ? 'outline'
                                            : 'default'
                                        }
                                        disabled={isFieldAdded(field.id)}
                                        onClick={() =>
                                          addField(field, section.id)
                                        }
                                      >
                                        {isFieldAdded(field.id)
                                          ? 'Added'
                                          : `Add to ${section.title.substring(
                                              0,
                                              8
                                            )}...`}
                                      </Button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      )
                    )}
                  </Accordion>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>Form Preview</CardTitle>
              <CardDescription>
                This is how your form will appear to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {formSchema.sections.map((section) => (
                  <div key={section.id} className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">{section.title}</h3>
                      {section.description && (
                        <p className="text-sm text-muted-foreground">
                          {section.description}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.fields.map((field) => (
                        <div key={field.id} className="space-y-2">
                          <Label
                            htmlFor={field.id}
                            className="flex items-center"
                          >
                            {field.label}
                            {field.required && (
                              <span className="text-red-500 ml-1">*</span>
                            )}
                          </Label>
                          <div className="border rounded-md p-2 bg-gray-50 dark:bg-gray-800">
                            <p className="text-sm text-muted-foreground">
                              {field.type} field
                            </p>
                          </div>
                          {field.helpText && (
                            <p className="text-xs text-muted-foreground">
                              {field.helpText}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    <Separator />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
