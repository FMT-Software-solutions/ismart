import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface PasswordChangedEmailProps {
  userName?: string;
  changedAt: string;
  appUrl: string;
}

export function PasswordChangedEmail({
  userName,
  changedAt,
  appUrl,
}: PasswordChangedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your iSMART admin password was changed</Preview>
      <Tailwind>
        <Body className="bg-[#f4f5f9] my-auto mx-auto font-sans">
          <Container className="bg-white border border-solid border-[#eaeaea] rounded-lg my-[40px] mx-auto p-[24px] w-[465px]">
            <Section className="text-center">
              <Img
                src={`${appUrl}/logo.png`}
                alt="iSMART"
                width="120"
                className="mx-auto"
              />
            </Section>
            <Heading className="text-[#0c1676] text-[22px] font-semibold text-center p-0 my-[24px] mx-0">
              Your password was changed
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello{userName ? ` ${userName}` : ''},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              The password for your iSMART admin account was changed on{' '}
              {changedAt}. For your security, you have been signed out of all
              other devices.
            </Text>
            <Section className="text-center my-[28px]">
              <Button
                className="bg-[#0c1676] rounded-md text-white text-[14px] font-semibold no-underline text-center px-6 py-3"
                href={`${appUrl}/admin/login`}
              >
                Go to admin login
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[20px] mx-0 w-full" />
            <Text className="text-[#b42318] text-[12px] leading-[20px]">
              If you did not make this change, reset your password immediately
              from the admin login page and contact your iSMART administrator.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
