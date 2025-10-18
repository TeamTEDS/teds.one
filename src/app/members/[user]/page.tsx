import { people } from '@/resources/content';
import { Column, Row, Text, Avatar, Button, IconButton, Flex, RevealFx } from '@once-ui-system/core';
import { notFound } from 'next/navigation';
import React from "react";
import { CustomMDX } from '@/components';
import fs from 'node:fs';
import path from 'node:path';
import styles from "@/components/about/about.module.scss";
import memberStyles from "@/app/members/members.module.scss";


async function getMemberDescription(user: string): Promise<string> {
  const descriptionPath = path.join(
    process.cwd(),
    'src/app/members/descriptions',
    `${user.toLowerCase()}.mdx`
  );

  try {
    if (fs.existsSync(descriptionPath)) {
      return fs.readFileSync(descriptionPath, 'utf-8');
    }
  } catch (error) {
    console.error(`Failed to load description for ${user}:`, error);
  }

  return '';
}


interface MemberPageProps {
  params: Promise<{
    user: string;
  }>;
}

export async function generateStaticParams(): Promise<{ user: string }[]> {
  return people.map((person) => ({
    user: person.firstName.toLowerCase(),
  }));
}

export default async function MemberPage({ params }: MemberPageProps) {
  const { user } = await params;
  
  // Find the person by first name (lowercase match)
  const person = people.find(
    (p) => p.firstName.toLowerCase() === user.toLowerCase()
  );

  if (!person) {
    notFound();
  }

  // Load member description
  const descriptionContent = await getMemberDescription(user);

  return (
    <div className={memberStyles.wrapper}>
      <div className={memberStyles.contentWrapper}>
        {/* Left side - Profile Information */}
        <div className={memberStyles.leftColumn}>
          <RevealFx>
            <Column
              gap="20"
              horizontal="center"
            >
              <Avatar
                size="xl"
                src={person.avatar}
              />
              <Column
                gap="8"
                horizontal="center"
              >
                <Text
                  variant="heading-default-m"
                  onBackground="neutral-strong"
                >
                  {person.name}
                </Text>
                <Text
                  variant="label-default-m"
                  onBackground="neutral-weak"
                >
                  {person.role}
                </Text>
                {person.socials && person.socials.length > 0 && (
                          <Flex
                            className={styles.blockAlign}
                            paddingTop="2"
                            paddingBottom="2"
                            gap="2"
                            wrap
                            horizontal="center"
                            fitWidth
                            data-border="rounded"
                          >
                            {person.socials.map((item) =>
                              item.link ? (
                                <React.Fragment key={item.name}>
                                  <Row s={{ hide: true }}>
                                    <Button
                                      href={item.link}
                                      prefixIcon={item.icon}
                                      size="s"
                                      weight="default"
                                      variant="secondary"
                                    />
                                  </Row>
                                  <Row hide s={{ hide: false }}>
                                    <IconButton
                                      size="m"
                                      href={item.link}
                                      icon={item.icon}
                                      variant="secondary"
                                    />
                                  </Row>
                                </React.Fragment>
                              ) : null,
                            )}
                          </Flex>
                        )}
              </Column>
            </Column>
          </RevealFx>
        </div>

        {/* Right side - Description from MDX */}
        <div className={memberStyles.rightColumn}>
          <RevealFx delay={0.2} translateY={0.5}>
            <Column
              gap="20"
              fillWidth
            >
              {descriptionContent ? (
                <CustomMDX source={descriptionContent} />
              ) : (
                <>
                  <Text
                    variant="heading-default-m"
                    onBackground="neutral-strong"
                  >
                    Coming Soon
                  </Text>
                  <Text
                    variant="body-default-m"
                    onBackground="neutral-weak"
                    wrap="balance"
                  >
                    This section is temporarily empty and will be updated with more information about{' '}
                    {person.firstName} soon.
                  </Text>
                </>
              )}
            </Column>
          </RevealFx>
        </div>
      </div>
    </div>
  );
}
