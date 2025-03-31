'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormField, FormFieldCondition } from '../../models/form-schema';
import { Plus, Trash2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface FieldConditionsManagerProps {
  field: FormField;
  fields: FormField[];
  onConditionsChange: (conditions: FormFieldCondition[]) => void;
}

export default function FieldConditionsManager({
  field,
  fields,
  onConditionsChange,
}: FieldConditionsManagerProps) {
  // Get all select fields that come before this field
  const availableDependentFields = fields
    .filter(
      (f) =>
        f.type === 'select' &&
        f.id !== field.id &&
        fields.indexOf(f) < fields.indexOf(field)
    )
    .map((f) => ({
      id: f.id,
      label: f.label,
      options: f.options || [],
    }));

  const addCondition = () => {
    const newCondition: FormFieldCondition = {
      fieldId: availableDependentFields[0]?.id || '',
      value: availableDependentFields[0]?.options?.[0] || '',
    };
    onConditionsChange([...(field.conditions || []), newCondition]);
  };

  const updateCondition = (
    index: number,
    updates: Partial<FormFieldCondition>
  ) => {
    const newConditions = [...(field.conditions || [])];
    newConditions[index] = { ...newConditions[index], ...updates };
    onConditionsChange(newConditions);
  };

  const removeCondition = (index: number) => {
    const newConditions = [...(field.conditions || [])];
    newConditions.splice(index, 1);
    onConditionsChange(newConditions);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium">Conditional Display</h4>
        {availableDependentFields.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={addCondition}
            type="button"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Condition
          </Button>
        )}
      </div>

      {availableDependentFields.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Add select fields before this field to create conditional display
            rules.
          </AlertDescription>
        </Alert>
      ) : field.conditions?.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No conditions set. This field will always be visible.
        </p>
      ) : (
        field.conditions?.map((condition, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Select
              value={condition.fieldId}
              onValueChange={(value) =>
                updateCondition(index, { fieldId: value })
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select field" />
              </SelectTrigger>
              <SelectContent>
                {availableDependentFields.map((field) => (
                  <SelectItem key={field.id} value={field.id}>
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <span className="text-sm">is</span>

            <Select
              value={condition.value}
              onValueChange={(value) => updateCondition(index, { value })}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select value" />
              </SelectTrigger>
              <SelectContent>
                {availableDependentFields
                  .find((f) => f.id === condition.fieldId)
                  ?.options.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => removeCondition(index)}
              type="button"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        ))
      )}
    </div>
  );
}
