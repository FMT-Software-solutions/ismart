'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertCircle,
  Check,
  Plus,
  Settings,
  Trash2,
  Type,
  MoveUp,
  MoveDown,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEventCreation } from '../context/EventCreationContext';
import { formFieldTypes } from '../../models/form-schema';
import { useEffect } from 'react';

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
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="preview">
                  <div className="space-y-4 rounded-md border p-4">
                    <h3 className="text-lg font-medium">{formTitle}</h3>
                    {formDescription && (
                      <p className="text-sm text-gray-500 mb-4">
                        {formDescription}
                      </p>
                    )}
                    {fields.map((field) => (
                      <div key={field.id} className="space-y-2">
                        <Label>
                          {field.label}
                          {field.required && (
                            <span className="ml-1 text-red-500">*</span>
                          )}
                        </Label>
                        {field.type === 'text' ||
                        field.type === 'email' ||
                        field.type === 'phone' ? (
                          <Input placeholder={field.placeholder} disabled />
                        ) : field.type === 'textarea' ? (
                          <textarea
                            className="w-full rounded-md border p-2"
                            placeholder={field.placeholder}
                            disabled
                          />
                        ) : field.type === 'select' ? (
                          <Select disabled>
                            <SelectTrigger>
                              <SelectValue placeholder={field.placeholder} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option, i) => (
                                <SelectItem key={i} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : field.type === 'checkbox' ? (
                          <div className="flex items-center space-x-2">
                            <input type="checkbox" disabled />
                            <span>{field.placeholder}</span>
                          </div>
                        ) : null}
                      </div>
                    ))}
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
