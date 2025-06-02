'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface TransactionMessageExampleProps {
  amount: string | number;
  momoNumber: string;
  recipientName: string;
}

export function TransactionMessageExample({
  amount,
  momoNumber,
  recipientName,
}: TransactionMessageExampleProps) {
  return (
    <Tabs defaultValue="mtn" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="mtn">MTN MoMo</TabsTrigger>
        <TabsTrigger value="tcash">T-Cash</TabsTrigger>
      </TabsList>
      <TabsContent value="mtn" className="mt-4">
        <Card className="p-4 font-mono text-sm space-y-2 bg-slate-100 dark:bg-slate-900 rounded-t-2xl rounded-b-none">
          <div className="font-bold">MobileMoney</div>
          <div className="leading-relaxed">
            Payment made for GHS {amount} to {recipientName}. Current balance:
            GHS ***.** Available Balance: GHS ***.**. Reference: iSmart.{' '}
            <span className="relative">
              Transaction ID:{' '}
              <span className="font-bold relative">
                53770543727
                <div className="bg-transparent border-2 border-red-500 rounded-2xl py-3 px-2 absolute -top-1.5 -left-1.5 -right-1.5 -bottom-1.5" />
              </span>
            </span>{' '}
            Fee charged: GHS 0.08. Tax charged: 0
          </div>
        </Card>
      </TabsContent>
      <TabsContent value="tcash" className="mt-4">
        <Card className="p-4 font-mono text-sm space-y-2 bg-slate-100 dark:bg-slate-900">
          <div className="font-bold">T-CASH</div>
          <div className="leading-relaxed">
            <span className="relative">
              0000008610231267
              <div className="bg-transparent border-2 border-red-500 rounded-2xl py-3 px-2 absolute -top-1.5 -left-1.5 -right-1.5 -bottom-1.5" />
            </span>{' '}
            Confirmed. GHS {amount} sent to{' '}
            <span className="underline">{momoNumber}</span> {recipientName} on{' '}
            {new Date().toLocaleDateString()} at{' '}
            {new Date().toLocaleTimeString()}. Your T-Cash balance is GHS
            ***.**.
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
