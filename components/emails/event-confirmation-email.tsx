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
import { format } from 'date-fns';

interface EventConfirmationEmailProps {
  eventTitle: string;
  eventTheme?: string;
  eventStartDate: string;
  eventEndDate: string;
  eventType: 'physical' | 'online' | 'hybrid';
  eventLocation: string;
  eventLink: string;
  recipientName: string;
  whatsappGroupUrl?: string;
  requireApproval?: boolean;
}

export const EventConfirmationEmail = ({
  eventTitle,
  eventTheme,
  eventStartDate,
  eventEndDate,
  eventType,
  eventLocation,
  eventLink,
  recipientName,
  whatsappGroupUrl,
  requireApproval,
}: EventConfirmationEmailProps) => {
  const previewText = requireApproval
    ? `Your registration for ${eventTitle} is pending approval`
    : `Your registration for ${eventTitle} is confirmed`;

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'EEEE, MMMM d, yyyy');
  };

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
                Event: {eventTitle}
              </Text>
              {eventTheme && (
                <Text className="text-black text-[14px] leading-[24px] m-0">
                  Theme: {eventTheme}
                </Text>
              )}
              <Text className="text-black text-[14px] leading-[24px] m-0">
                Start Date: {formatDate(eventStartDate)}
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                End Date: {formatDate(eventEndDate)}
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                Type: {eventType.charAt(0).toUpperCase() + eventType.slice(1)}
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                Location: {eventLocation}
              </Text>
              {eventLink && (
                <Text className="text-black text-[14px] leading-[24px] m-0">
                  Link:{' '}
                  <Link href={eventLink} style={link}>
                    {eventLink}
                  </Link>
                </Text>
              )}
            </Section>

            {whatsappGroupUrl && (
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

            <Text style={text}>
              If you have any questions, please don't hesitate to contact us at{' '}
              <Link href="mailto:ismflrt.official@gmail.com" style={link}>
                ismflrt.official@gmail.com
              </Link>
              .
            </Text>

            <Text style={text}>
              Regards,
              <br />
              The iSMART Team
            </Text>

            <Hr style={hr} />

            <Text style={footer}>
              Institute of Sexuality, Marriage and Family Life Research and
              Training (iSMART)
              <br />
              Accra, Ghana
              <br />
              <Link href="https://theismart.org" style={link}>
                theismart.org
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const hr = {
  borderColor: '#e5e7eb',
  margin: '30px 0',
};

const footer = {
  color: '#718096',
  fontSize: '14px',
  lineHeight: '22px',
  textAlign: 'center' as const,
};

const link = {
  color: '#1d4ed8',
  textDecoration: 'underline',
};
