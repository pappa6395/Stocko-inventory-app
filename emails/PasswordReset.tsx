import {
    Body,
    Column,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface PasswordResetProps {
    token?: string;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    
  
  export const PasswordReset = ({
    token,
  }: PasswordResetProps) => (
    <Html>
      <Head />
      <Body style={main}>
        <Preview>Reset Password</Preview>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src={`https://res.cloudinary.com/duwdwnu8y/image/upload/v1740589636/o6bhlmanw8orko3hf0ml.png`}
              width="80"
              height="80"
              alt="Stocko"
            />
          </Section>
          <Heading style={h1}>Reset your password</Heading>
          <Text style={heroText}>
            Your reset password token is below - enter it in your open browser window
            and we'll help you get new password.
          </Text>
  
          <Section style={codeBox}>
            <Text style={confirmationCodeText}>{token}</Text>
          </Section>
  
          <Text style={text}>
            If you didn't request this email, there's nothing to worry about, you
            can safely ignore it.
          </Text>
  
          <Section>
            <Row style={footerLogos}>
              <Column style={{ width: '66%' }}>
                <Img
                  src={`https://res.cloudinary.com/duwdwnu8y/image/upload/v1740589636/o6bhlmanw8orko3hf0ml.png`}
                  width="60"
                  height="60"
                  alt="Stocko"
                />
              </Column>
              {/* <Column>
                <Section>
                  <Row>
                    <Column>
                      <Link href="/">
                        <Img
                          src={`${baseUrl}/static/slack-twitter.png`}
                          width="32"
                          height="32"
                          alt="Slack"
                          style={socialMediaIcon}
                        />
                      </Link>
                    </Column>
                    <Column>
                      <Link href="/">
                        <Img
                          src={`${baseUrl}/static/slack-facebook.png`}
                          width="32"
                          height="32"
                          alt="Slack"
                          style={socialMediaIcon}
                        />
                      </Link>
                    </Column>
                    <Column>
                      <Link href="/">
                        <Img
                          src={`${baseUrl}/static/slack-linkedin.png`}
                          width="32"
                          height="32"
                          alt="Slack"
                          style={socialMediaIcon}
                        />
                      </Link>
                    </Column>
                  </Row>
                </Section>
              </Column> */}
            </Row>
          </Section>
  
          <Section>
            <Link
              style={footerLink}
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              Our blog
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href="https://slack.com/legal"
              target="_blank"
              rel="noopener noreferrer"
            >
              Policies
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href="https://slack.com/help"
              target="_blank"
              rel="noopener noreferrer"
            >
              Help center
            </Link>
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            <Link
              style={footerLink}
              href="https://slack.com/community"
              target="_blank"
              rel="noopener noreferrer"
              data-auth="NotApplicable"
              data-linkindex="6"
            >
              Slack Community
            </Link>
            <Text style={footerText}>
              ©2022 Stocko Store, LLC, a Salesforce company. <br />
              25 Bangna-Trad 4, Bangna, Bangkok, TH <br />
              <br />
              All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
  
  
  export default PasswordReset;
  
  const footerText = {
    fontSize: '12px',
    color: '#b7b7b7',
    lineHeight: '15px',
    textAlign: 'left' as const,
    marginBottom: '50px',
  };
  
  const footerLink = {
    color: '#b7b7b7',
    textDecoration: 'underline',
  };
  
  const footerLogos = {
    marginBottom: '32px',
    paddingLeft: '8px',
    paddingRight: '8px',
    display: 'block',
  };
  
  const socialMediaIcon = {
    display: 'inline',
    marginLeft: '32px',
  };
  
  const main = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
  };
  
  const container = {
    margin: '0 auto',
    padding: '0px 20px',
  };
  
  const logoContainer = {
    marginTop: '32px',
  };
  
  const h1 = {
    color: '#1d1c1d',
    fontSize: '36px',
    fontWeight: '700',
    margin: '30px 0',
    padding: '0',
    lineHeight: '42px',
  };
  
  const heroText = {
    fontSize: '20px',
    lineHeight: '28px',
    marginBottom: '30px',
  };
  
  const codeBox = {
    background: 'rgb(245, 244, 245)',
    borderRadius: '4px',
    marginBottom: '30px',
    padding: '40px 10px',
  };
  
  const confirmationCodeText = {
    fontSize: '30px',
    textAlign: 'center' as const,
    verticalAlign: 'middle',
  };
  
  const text = {
    color: '#000',
    fontSize: '14px',
    lineHeight: '24px',
  };
  