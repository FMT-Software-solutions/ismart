import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface EventConfirmationEmailProps {
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  recipientName: string;
  whatsappGroupUrl?: string;
  requireApproval?: boolean;
}

export const EventConfirmationEmail = ({
  eventTitle,
  eventDate,
  eventLocation,
  recipientName,
  whatsappGroupUrl,
  requireApproval,
}: EventConfirmationEmailProps) => {
  const previewText = requireApproval
    ? `Your registration for ${eventTitle} is pending approval`
    : `Your registration for ${eventTitle} is confirmed`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              {requireApproval
                ? 'Registration Pending'
                : 'Registration Confirmed'}
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Hello {recipientName},
            </Text>

            <Text className="text-black text-[14px] leading-[24px]">
              {requireApproval
                ? `Thank you for registering for ${eventTitle}. Your registration is currently pending approval.`
                : `Your registration for ${eventTitle} has been confirmed.`}
            </Text>

            <Section className="bg-[#f6f6f6] rounded p-[20px] my-[16px]">
              <Text className="text-black text-[14px] leading-[24px] m-0 font-bold">
                Event Details:
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                Date: {eventDate}
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                Location: {eventLocation}
              </Text>
            </Section>

            {whatsappGroupUrl && !requireApproval && (
              <>
                <Text className="text-black text-[14px] leading-[24px]">
                  Join our WhatsApp group to connect with other participants and
                  stay updated:
                </Text>
                <Button
                  className="bg-[#25D366] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3 my-[16px]"
                  href={whatsappGroupUrl}
                >
                  Join WhatsApp Group
                </Button>
              </>
            )}

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was sent by iSMART NGO. If you have any questions,
              please{' '}
              <Link
                href="mailto:support@theismart.org"
                className="text-blue-600 no-underline"
              >
                contact our support team
              </Link>
              .
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
