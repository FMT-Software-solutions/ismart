'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type PaymentMethod = 'manual' | 'online';

export interface PaymentOption {
  id: PaymentMethod;
  title: string;
  description: string;
  disabled?: boolean;
  disabledMessage?: string;
}

interface PaymentOptionsProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  disabled?: boolean;
  options?: PaymentOption[];
}

const defaultOptions: PaymentOption[] = [
  {
    id: 'manual',
    title: 'Manual Payment (MoMo)',
    description: 'Pay via Mobile Money and provide the transaction details',
  },
  {
    id: 'online',
    title: 'Online Payment (Paystack)',
    description: 'Pay online securely using your card or mobile money',
    disabled: true,
    disabledMessage: 'This option is currently disabled',
  },
];

export function PaymentOptions({
  selected,
  onSelect,
  disabled = false,
  options = defaultOptions,
}: PaymentOptionsProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium">Select Payment Method</h3>
      <RadioGroup
        value={selected}
        onValueChange={(value) => onSelect(value as PaymentMethod)}
        className="space-y-3"
        disabled={disabled}
      >
        {options.map((option) => (
          <div
            key={option.id}
            className="rounded-md border p-3 cursor-pointer space-y-4"
          >
            {option.disabled && option.disabledMessage && (
              <p className="text-sm text-muted-foreground italic">
                {option.disabledMessage}
              </p>
            )}
            <div
              className={`flex items-center space-x-2 ${
                option.disabled ? 'opacity-30' : 'hover:bg-muted/50'
              }`}
            >
              <RadioGroupItem
                value={option.id}
                id={option.id}
                disabled={disabled || option.disabled}
              />
              <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                <div className="font-medium">{option.title}</div>
                <p className="text-sm text-muted-foreground">
                  {option.description}
                </p>
              </Label>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
