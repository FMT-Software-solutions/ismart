'use client';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertCircle,
  Check,
  MoveDown,
  MoveUp,
  Plus,
  SquareChevronDown,
  Trash2,
  Type,
} from 'lucide-react';
import { formFieldTypes } from '../../models/form-schema';
import { useEventCreation } from '../context/EventCreationContext';
import FieldConditionsManager from './FieldConditionsManager';
import RegistrationFormRenderer from '../../components/registration-form-renderer';

interface RegistrationFormBuilderProps {
  isEditing?: boolean;
}

export default function RegistrationFormBuilder({
  isEditing = false,
}: RegistrationFormBuilderProps) {
  const {
    formTitle,
    setFormTitle,
    formDescription,
    setFormDescription,
    fields,
    moveField,
    addField,
    updateField,
    deleteField,
    activeField,
    setActiveField,
    formBuilderActiveTab: activeTab,
    setFormBuilderActiveTab: setActiveTab,
    isFormLoading: isLoading,
  } = useEventCreation();

  const handlePreviewSubmit = async (data: Record<string, any>) => {
    console.log('Preview form submission:', data);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Registration Form Builder</CardTitle>
          <CardDescription>
            {isEditing ? 'Edit' : 'Customize'} the registration form for your
            event
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Form Settings Column */}
            <div>
              <div className="rounded-md border p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="form-title">Form Title</Label>
                  <Input
                    id="form-title"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="Enter form title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="form-description">
                    Form Description (Optional)
                  </Label>
                  <textarea
                    id="form-description"
                    className="w-full rounded-md border p-2 min-h-[100px]"
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Enter form description"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Add Form Field</h3>
                  <div className="space-y-2">
                    {formFieldTypes.map((type) => (
                      <Button
                        key={type}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={(e) => {
                          // Prevent form submission
                          e.preventDefault();
                          addField(type);
                        }}
                        type="button"
                      >
                        {type === 'checkbox' ? (
                          <Check className="mr-2 h-4 w-4" />
                        ) : type === 'select' ? (
                          <SquareChevronDown className="mr-2 h-4 w-4" />
                        ) : (
                          <Type className="mr-2 h-4 w-4" />
                        )}
                        {type.charAt(0).toUpperCase() + type.slice(1)} Field
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  Use the up/down buttons to reorder fields. Click on a field to
                  edit its properties.
                </AlertDescription>
              </Alert>
            </div>

            {/* Form Fields Column */}
            <div className="md:col-span-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="fields">Form Fields</TabsTrigger>
                  <TabsTrigger value="settings" disabled={!activeField}>
                    Field Settings
                  </TabsTrigger>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                </TabsList>

                <TabsContent value="fields" className="space-y-4">
                  <div className="space-y-2">
                    {fields.length === 0 ? (
                      <div className="flex h-48 items-center justify-center rounded-md border border-dashed border-gray-300 p-4">
                        <p className="text-sm text-gray-500">
                          Add form fields from the panel on the left
                        </p>
                      </div>
                    ) : (
                      fields.map((field, index) => (
                        <div
                          key={field.id}
                          className={`flex items-center justify-between rounded-md border bg-white dark:bg-gray-950 p-3 shadow-sm ${
                            activeField === field.id
                              ? 'border-primary ring-1 ring-primary'
                              : ''
                          }`}
                          onClick={() => {
                            setActiveField(field.id);
                            setActiveTab('settings');
                          }}
                        >
                          <div className="flex items-center">
                            <div className="mr-2 flex flex-col">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  moveField(index, 'up');
                                }}
                                disabled={index === 0}
                                type="button"
                              >
                                <MoveUp className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-5 w-5"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  moveField(index, 'down');
                                }}
                                disabled={index === fields.length - 1}
                                type="button"
                              >
                                <MoveDown className="h-4 w-4" />
                              </Button>
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                {field.label}
                                {field.required && (
                                  <span className="ml-1 text-red-500">*</span>
                                )}
                              </p>
                              <p className="text-xs text-gray-500">
                                {field.type.charAt(0).toUpperCase() +
                                  field.type.slice(1)}
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              deleteField(field.id);
                            }}
                            type="button"
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  {activeField && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="field-label">Field Label</Label>
                        <Input
                          id="field-label"
                          value={
                            fields.find((f) => f.id === activeField)?.label ||
                            ''
                          }
                          onChange={(e) =>
                            updateField(activeField, { label: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="field-placeholder">Placeholder</Label>
                        <Input
                          id="field-placeholder"
                          value={
                            fields.find((f) => f.id === activeField)
                              ?.placeholder || ''
                          }
                          onChange={(e) =>
                            updateField(activeField, {
                              placeholder: e.target.value,
                            })
                          }
                        />
                      </div>

                      <div className="flex items-center space-x-2">
                        <Switch
                          id="field-required"
                          checked={
                            fields.find((f) => f.id === activeField)
                              ?.required || false
                          }
                          onCheckedChange={(checked) =>
                            updateField(activeField, { required: checked })
                          }
                        />
                        <Label htmlFor="field-required">Required Field</Label>
                      </div>

                      {fields.find((f) => f.id === activeField)?.type ===
                        'select' && (
                        <div className="space-y-2">
                          <Label>Options</Label>
                          <div className="space-y-2">
                            {fields
                              .find((f) => f.id === activeField)
                              ?.options?.map((option, i) => (
                                <div
                                  key={i}
                                  className="flex items-center space-x-2"
                                >
                                  <Input
                                    value={option}
                                    onChange={(e) => {
                                      const field = fields.find(
                                        (f) => f.id === activeField
                                      );
                                      if (field && field.options) {
                                        const newOptions = [...field.options];
                                        newOptions[i] = e.target.value;
                                        updateField(activeField, {
                                          options: newOptions,
                                        });
                                      }
                                    }}
                                  />
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={(e) => {
                                      e.preventDefault(); // Prevent form submission
                                      const field = fields.find(
                                        (f) => f.id === activeField
                                      );
                                      if (field && field.options) {
                                        const newOptions = field.options.filter(
                                          (_, index) => index !== i
                                        );
                                        updateField(activeField, {
                                          options: newOptions,
                                        });
                                      }
                                    }}
                                    type="button"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.preventDefault(); // Prevent form submission
                                const field = fields.find(
                                  (f) => f.id === activeField
                                );
                                if (field && field.options) {
                                  updateField(activeField, {
                                    options: [
                                      ...field.options,
                                      `Option ${field.options.length + 1}`,
                                    ],
                                  });
                                }
                              }}
                              type="button"
                            >
                              <Plus className="mr-2 h-4 w-4" />
                              Add Option
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Field Conditions Manager */}
                      <div className="border-t pt-4 mt-4">
                        <FieldConditionsManager
                          field={fields.find((f) => f.id === activeField)!}
                          fields={fields}
                          onConditionsChange={(conditions) =>
                            updateField(activeField, { conditions })
                          }
                        />
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="preview">
                  <div className="rounded-md border p-4">
                    <RegistrationFormRenderer
                      formSchema={{
                        title: formTitle,
                        description: formDescription,
                        fields,
                      }}
                      onSubmit={handlePreviewSubmit}
                      isPreview
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
