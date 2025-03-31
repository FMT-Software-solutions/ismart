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

interface WelcomeEmailProps {
  userName: string;
  email: string;
  password: string;
}

export function WelcomeEmail({ userName, email, password }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to iSmart Admin Panel</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Welcome to <strong>iSmart Admin Panel</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hello {userName},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Your admin account has been created. You can now access the admin
              panel using the following credentials:
            </Text>
            <Container className="bg-[#f9f9f9] rounded p-[20px] my-[20px]">
              <Text className="text-black text-[14px] leading-[24px] m-0">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="text-black text-[14px] leading-[24px] m-0">
                <strong>Temporary Password:</strong> {password}
              </Text>
            </Container>
            <Text className="text-black text-[14px] leading-[24px]">
              For security reasons, please change your password after your first
              login.
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              You can access the admin panel by clicking the button below:
            </Text>
            <Container className="text-center my-[32px] mx-0">
              <Link
                className="bg-[#0c1579] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={process.env.NEXT_PUBLIC_APP_URL + '/admin/login'}
              >
                Login to Admin Panel
              </Link>
            </Container>
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              If you did not request this email, please ignore it or contact
              support if you have concerns.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
