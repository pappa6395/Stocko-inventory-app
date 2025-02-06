
import Logo from '@/components/global/Logo';
import { cn } from '@/lib/utils';
import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
  } from '@react-email/components';
  import * as React from 'react';
  
  interface InviteUserEmailProps {
    username?: string;
    password?: string;
    loginEmail?: string;
    invitedByUsername?: string;
    invitedByEmail?: string;
    inviteLink?: string;
    inviteFromIp?: string;
    inviteFromLocation?: string;
    inviteRole?: string;
  }
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : '';
  
  const InviteUserEmail = ({
    username,
    password,
    loginEmail,
    invitedByUsername,
    invitedByEmail,
    inviteLink,
    inviteRole,
    inviteFromIp,
    inviteFromLocation,
  }: InviteUserEmailProps) => {
    const previewText = `Join Stocko Inventory System as ${inviteRole}`;
  
    return (
      <Html>
        <Head />
        <Preview>{previewText}</Preview>
        <Tailwind>
          <Body className="bg-white my-auto mx-auto font-sans px-2">
            <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
              <Section className="mt-[32px] flex justify-center">
                <Row className='flex items-center gap-2'>
                    <Column className={'flex items-center flex-shrink-0 justify-center rounded-full text-slate-50'}>
                        <Img 
                          src={"/StockOnline.png"} 
                          alt="logo" 
                          width={50} height={50}
                          className="size-8"
                        />
                    </Column>
                    <Text className='font-bold text-xl'>
                        Stocko-Online
                    </Text>
                </Row>
              </Section>
              <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
                <span className='block'>Welcome to Stocko-Online</span>
                <strong>Inventory Management System</strong>
              </Heading>
              <Text className="text-black text-[14px] leading-[24px]">
                Dear {username},
              </Text>
              <Text className="text-black text-[14px] leading-[24px]">
                <strong>{invitedByUsername}</strong> (
                    <Link
                    href={`mailto:${invitedByEmail}`}
                    className="text-blue-600 no-underline"
                    >
                    {invitedByEmail}
                    </Link>
                    ) has invited you to the <strong>Stocko-Online</strong> as{' '}
                    <strong>{inviteRole}</strong>.
              </Text>
              <Text>
                We&apos;re excited to invite you to join Inventory Management System. Below are your login details to access the system:
              </Text>
              <Text>
                <span className='block'>Login Email: {loginEmail}</span>
                <span className='block'>Temporary Password: {password}</span>
              </Text>
              {/* <Section>
                <Row>
                  <Column align="right">
                    <Img
                      className="rounded-full"
                      src={userImage}
                      width="64"
                      height="64"
                    />
                  </Column>
                  <Column align="center">
                    <Img
                      src={`${baseUrl}/static/vercel-arrow.png`}
                      width="12"
                      height="9"
                      alt="invited you to"
                    />
                  </Column>
                  <Column align="left">
                    <Img
                      className="rounded-full"
                      src={teamImage}
                      width="64"
                      height="64"
                    />
                  </Column>
                </Row>
              </Section> */}
              <Section className="text-center mt-[32px] mb-[32px]">
                <Button
                  className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                  href={inviteLink}
                >
                  Join the team
                </Button>
              </Section>
              <Text className="text-black text-[14px] leading-[24px]">
                or copy and paste this URL into your browser:{' '}
                <Link href={inviteLink} className="text-blue-600 no-underline">
                  {inviteLink}
                </Link>
              </Text>
              <Text>
                For security reasons, we recommend logging in and updating your password immediately.
                Also, please set your status to be active.
                If you have any questions or need assistance, feel free to contact us at
                 {' '}<strong>stockoadmin@stocko.com</strong>
              </Text>
              <Text className="leading-[24px]">
                <span className='block'>Best regards,</span>
                <span className='block'>Pap Bangna / Admin Team</span>
                <span className='block'>Stocko-Online</span>
              </Text>
              <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
              <Text className="text-[#666666] text-[12px] leading-[24px]">
                This invitation was intended for{' '}
                <span className="text-black">{username}</span>. This invite was
                sent from <span className="text-black">{inviteFromIp}</span>{' '}
                located in{' '}
                <span className="text-black">{inviteFromLocation}</span>. If you
                were not expecting this invitation, you can ignore this email. If
                you are concerned about your account's safety, please reply to
                this email to get in touch with us.
                <span className='block'>&copy; 2025 Stocko-Online. All rights reserved.</span>
              </Text>
            </Container>
          </Body>
        </Tailwind>
      </Html>
    );
  };
  
  InviteUserEmail.PreviewProps = {
    username: 'alanturing',
    userImage: `${baseUrl}/static/vercel-user.png`,
    invitedByUsername: 'Alan',
    invitedByEmail: 'alan.turing@example.com',
    teamName: 'Enigma',
    teamImage: `${baseUrl}/static/vercel-team.png`,
    inviteLink: 'https://vercel.com/teams/invite/foo',
    inviteFromIp: '204.13.186.218',
    inviteFromLocation: 'São Paulo, Brazil',
  } as InviteUserEmailProps;
  
export default InviteUserEmail;
  
