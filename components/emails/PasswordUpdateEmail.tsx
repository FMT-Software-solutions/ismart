import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

interface PasswordUpdateEmailProps {
  userName: string;
  email: string;
  password: string;
}

export function PasswordUpdateEmail({
  userName,
  email,
  password,
}: PasswordUpdateEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your iSmart Admin Password Has Been Reset</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Password Reset Notification
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {userName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Your password for the iSmart Admin Panel has been reset. You can
              now log in using your new temporary password:
            </Text>
            <Container className="bg-[#f9f9f9] rounded p-[20px] my-[20px]">
              <Text className="text-black text-[14px] leading-[24px] m-0">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                <strong>New Temporary Password:</strong> {password}
              </Text>
            </Container>
            <Text className="text-black text-[14px] leading-[24px]">
              For security reasons, you will be required to change your password
              after logging in with this temporary password.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              You can access the admin panel by clicking the button below:
            </Text>
            <Container className="text-center my-[32px] mx-0">
              <Link
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={process.env.NEXT_PUBLIC_APP_URL + '/admin/login'}
              >
                Login to Admin Panel
              </Link>
            </Container>
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you did not request this password reset, please contact your
              administrator immediately.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
