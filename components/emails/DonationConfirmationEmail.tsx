import {
  Body,
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
import * as React from 'react';

interface DonationConfirmationEmailProps {
  firstName: string;
  amount: string;
  donationId: string;
  date: string;
  paymentMethod: string;
  message?: string;
}

export const DonationConfirmationEmail = ({
  firstName,
  amount,
  donationId,
  date,
  paymentMethod,
  message,
}: DonationConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Thank you for your donation to iSMART!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank You for Your Donation</Heading>

          <Text style={text}>Dear {firstName},</Text>

          <Text style={text}>
            Thank you for your generous donation to the Institute of Sexuality,
            Marriage and Family Life Research and Training (iSMART). Your
            support helps us continue our mission to transform society's
            understanding and practice of sexuality, marriage, and family life.
          </Text>

          <Section style={donationDetails}>
            <Heading as="h2" style={h2}>
              Donation Receipt
            </Heading>
            <Text style={receiptItem}>
              <strong>Donation ID:</strong> {donationId}
            </Text>
            <Text style={receiptItem}>
              <strong>Amount:</strong> GHS {amount}
            </Text>
            <Text style={receiptItem}>
              <strong>Date:</strong> {date}
            </Text>
            <Text style={receiptItem}>
              <strong>Payment Method:</strong> {paymentMethod}
            </Text>
            {message && (
              <Text style={receiptItem}>
                <strong>Your Message:</strong> "{message}"
              </Text>
            )}
          </Section>

          <Text style={text}>
            This receipt confirms that we've received your donation. Please keep
            this for your records.
          </Text>

          <Text style={text}>
            Your contribution will help fund our campaigns, educational
            programs, and outreach efforts aimed at promoting healthy
            relationships and family life in Ghana.
          </Text>

          <Text style={text}>
            If you have any questions about your donation or would like to learn
            more about how your support makes a difference, please don't
            hesitate to contact us at{' '}
            <Link href="mailto:ismflrt.official@gmail.com" style={link}>
              ismflrt.official@gmail.com
            </Link>
            .
          </Text>

          <Text style={text}>
            With gratitude,
            <br />
            The iSMART Team
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Institute for Sex Education, Marriage and Relationship Therapy
            (iSMART)
            <br />
            Accra, Ghana
            <br />
            <Link href="https://theismart.org" style={link}>
              theismart.org
            </Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: 'Helvetica,Arial,sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  backgroundColor: '#ffffff',
  maxWidth: '600px',
};

const h1 = {
  color: '#1d4ed8',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '30px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#1d4ed8',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '15px 0',
  padding: '0',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '16px 0',
};

const receiptItem = {
  margin: '8px 0',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#333',
};

const donationDetails = {
  backgroundColor: '#f9fafb',
  padding: '20px',
  borderRadius: '5px',
  margin: '20px 0',
};

const link = {
  color: '#1d4ed8',
  textDecoration: 'underline',
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

export default DonationConfirmationEmail;
