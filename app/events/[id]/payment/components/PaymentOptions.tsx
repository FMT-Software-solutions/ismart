'use client';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export type PaymentMethod = 'manual' | 'online';

interface PaymentOptionsProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
  disabled?: boolean;
}

export function PaymentOptions({
  selected,
  onSelect,
  disabled = false,
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
        <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer hover:bg-muted/50">
          <RadioGroupItem value="manual" id="manual" disabled={disabled} />
          <Label htmlFor="manual" className="flex-1 cursor-pointer">
            <div className="font-medium">Manual Payment (MoMo)</div>
            <p className="text-sm text-muted-foreground">
              Pay via Mobile Money and provide the transaction details
            </p>
          </Label>
        </div>
        <div className="rounded-md border p-3 cursor-pointer space-y-4">
          <p className="text-sm text-muted-foreground italic ">
            This option is currently disabled
          </p>
          <div className="flex items-center space-x-2 opacity-30">
            <RadioGroupItem value="disabled" id="online" disabled />
            <Label htmlFor="online" className="flex-1 cursor-pointer">
              <div className="font-medium">Online Payment (Paystack)</div>
              <p className="text-sm text-muted-foreground">
                Pay online securely using your card or mobile money
              </p>
            </Label>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}
