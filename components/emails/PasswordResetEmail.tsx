import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface PasswordResetEmailProps {
  userName?: string;
  resetUrl: string;
  expiresInMinutes: number;
  appUrl: string;
}

export function PasswordResetEmail({
  userName,
  resetUrl,
  expiresInMinutes,
  appUrl,
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your iSMART admin password</Preview>
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
              Reset your password
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello{userName ? ` ${userName}` : ''},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              We received a request to reset the password for your iSMART admin
              account. Click the button below to choose a new password.
            </Text>
            <Section className="text-center my-[28px]">
              <Button
                className="bg-[#0c1676] rounded-md text-white text-[14px] font-semibold no-underline text-center px-6 py-3"
                href={resetUrl}
              >
                Reset password
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              This link expires in {expiresInMinutes} minutes and can only be
              used once.
            </Text>
            <Text className="text-[#666666] text-[12px] leading-[20px]">
              If the button does not work, copy and paste this link into your
              browser:
              <br />
              <Link href={resetUrl} className="text-[#0c1676] break-all">
                {resetUrl}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[20px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[20px]">
              If you did not request a password reset, you can safely ignore
              this email. Your password will not change. iSMART will never ask
              you for your password by email.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
