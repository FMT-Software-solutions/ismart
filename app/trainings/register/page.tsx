'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// Form schemas for each step
const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: 'First name must be at least 2 characters.' }),
  lastName: z
    .string()
    .min(2, { message: 'Last name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  address: z
    .string()
    .min(5, { message: 'Address must be at least 5 characters.' }),
  city: z.string().min(2, { message: 'City must be at least 2 characters.' }),
  country: z
    .string()
    .min(2, { message: 'Country must be at least 2 characters.' }),
});

const courseSelectionSchema = z.object({
  department: z.string().min(1, { message: 'Please select a department.' }),
  course: z.string().min(1, { message: 'Please select a course.' }),
  format: z.enum(['in-person', 'online', 'hybrid'], {
    required_error: 'Please select a course format.',
  }),
  specialRequirements: z.string().optional(),
});

const paymentSchema = z.object({
  paymentMethod: z.enum(['credit-card', 'bank-transfer', 'mobile-money'], {
    required_error: 'Please select a payment method.',
  }),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the terms and conditions.',
  }),
});

// Combined schema
const formSchema = z.object({
  ...personalInfoSchema.shape,
  ...courseSelectionSchema.shape,
  ...paymentSchema.shape,
});

// Course options by department
const courseOptions = {
  sexuality: [
    'Understanding Human Sexuality',
    'Sexual Health and Wellness',
    'Sexuality Education for Parents',
    'Gender and Sexuality Studies',
  ],
  marriage: [
    'Premarital Counseling Certification',
    'Marriage Enrichment Program',
    'Conflict Resolution in Relationships',
    'Communication Skills for Couples',
  ],
  family: [
    'Effective Parenting Strategies',
    'Family Systems Therapy',
    'Child Development and Nurturing',
    'Family Life Education',
  ],
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // Initialize form with the combined schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(
      step === 1
        ? personalInfoSchema
        : step === 2
        ? courseSelectionSchema
        : paymentSchema
    ),
    defaultValues: formData,
  });

  // Handle form submission for each step
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const updatedData = { ...formData, ...data };
    setFormData(updatedData);

    if (step < 3) {
      setStep(step + 1);
    } else {
      // Final submission
      toast({
        title: 'Registration Submitted',
        description:
          "Your training registration has been received. We'll contact you shortly with confirmation details.",
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl mx-auto"
        >
          <motion.div variants={fadeIn} className="text-center mb-12">
            <h1 className="heading-2 mb-4">Register for Training</h1>
            <p className="paragraph text-muted-foreground">
              Complete the form below to register for one of our training
              programs.
            </p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div variants={fadeIn} className="mb-8">
            <div className="flex justify-between">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= i
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {step > i ? <Check className="h-5 w-5" /> : i}
                  </div>
                  <span className="text-sm mt-2">
                    {i === 1
                      ? 'Personal Info'
                      : i === 2
                      ? 'Course Selection'
                      : 'Payment'}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative mt-2">
              <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                <div
                  className="h-1 bg-primary transition-all duration-300"
                  style={{ width: `${((step - 1) / 2) * 100}%` }}
                ></div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1
                    ? 'Personal Information'
                    : step === 2
                    ? 'Course Selection'
                    : 'Payment Information'}
                </CardTitle>
                <CardDescription>
                  {step === 1
                    ? 'Please provide your contact details'
                    : step === 2
                    ? 'Select your preferred training program'
                    : 'Complete your registration with payment'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    {step === 1 && (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="john.doe@example.com"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="+233 XX XXX XXXX"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="address"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Address</FormLabel>
                              <FormControl>
                                <Input placeholder="123 Main St" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="Accra" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                  <Input placeholder="Ghana" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <FormField
                          control={form.control}
                          name="department"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Department</FormLabel>
                              <Select
                                onValueChange={(value) => {
                                  field.onChange(value);
                                  setSelectedDepartment(value);
                                  form.setValue('course', ''); // Reset course when department changes
                                }}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a department" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="sexuality">
                                    Department of Sexuality Studies
                                  </SelectItem>
                                  <SelectItem value="marriage">
                                    Department of Marriage and Relationships
                                  </SelectItem>
                                  <SelectItem value="family">
                                    Department of Parenting and Family Life
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="course"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Course</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                disabled={!selectedDepartment}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={
                                        selectedDepartment
                                          ? 'Select a course'
                                          : 'Please select a department first'
                                      }
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {selectedDepartment &&
                                    courseOptions[
                                      selectedDepartment as keyof typeof courseOptions
                                    ]?.map((course) => (
                                      <SelectItem key={course} value={course}>
                                        {course}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="format"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Course Format</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="in-person" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      In-Person (Accra, Ghana)
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="online" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Online (Live Webinar)
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="hybrid" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Hybrid (Combination of In-Person and
                                      Online)
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="specialRequirements"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                Special Requirements or Accommodations
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Please let us know if you have any special requirements or accommodations"
                                  className="resize-none"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Optional: Include any accessibility needs or
                                other requirements.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <FormField
                          control={form.control}
                          name="paymentMethod"
                          render={({ field }) => (
                            <FormItem className="space-y-3">
                              <FormLabel>Payment Method</FormLabel>
                              <FormControl>
                                <RadioGroup
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                  className="flex flex-col space-y-1"
                                >
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="credit-card" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Credit/Debit Card
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="bank-transfer" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Bank Transfer
                                    </FormLabel>
                                  </FormItem>
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <RadioGroupItem value="mobile-money" />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      Mobile Money
                                    </FormLabel>
                                  </FormItem>
                                </RadioGroup>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="border p-4 rounded-md bg-muted/30 mb-6">
                          <h3 className="font-medium mb-2">
                            Registration Summary
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Course Fee:
                              </span>
                              <span>GHS 500.00</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">
                                Materials:
                              </span>
                              <span>GHS 100.00</span>
                            </div>
                            <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                              <span>Total:</span>
                              <span>GHS 600.00</span>
                            </div>
                          </div>
                        </div>

                        <FormField
                          control={form.control}
                          name="agreeToTerms"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  I agree to the terms and conditions, including
                                  the cancellation policy and privacy statement.
                                </FormLabel>
                                <FormDescription>
                                  By checking this box, you confirm that you
                                  have read and agree to our{' '}
                                  <a
                                    href="#"
                                    className="text-primary underline"
                                  >
                                    Terms and Conditions
                                  </a>
                                  .
                                </FormDescription>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </>
                    )}

                    <div className="flex justify-between pt-4">
                      {step > 1 ? (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleBack}
                        >
                          <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                      ) : (
                        <div></div>
                      )}
                      <Button type="submit">
                        {step < 3 ? (
                          <>
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                          </>
                        ) : (
                          'Complete Registration'
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center border-t pt-6">
                <p className="text-sm text-muted-foreground">
                  Need assistance? Contact us at{' '}
                  <a
                    href="mailto:ismflrt.official@gmail.com"
                    className="text-primary"
                  >
                    ismflrt.official@gmail.com
                  </a>{' '}
                  or call{' '}
                  <a href="tel:+233271467767" className="text-primary">
                    +233 271 467 767
                  </a>
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
