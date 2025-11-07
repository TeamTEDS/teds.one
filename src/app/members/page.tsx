import {
  Button,
  Column,
  Heading,
  IconButton,
  Media,
  Text,
  Meta,
  Row,
  Card,
  Line,
  RevealFx,
  Flex,
  Scroller,
} from "@once-ui-system/core";
import { baseURL, people } from "@/resources";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: "Members – TEDS",
    description: "Meet the team members",
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent("Members")}`,
    path: "/members",
  });
}

export default function MembersPage() {
  return (
    <Column maxWidth="m" fillWidth>
      <RevealFx>
        <Heading variant="display-strong-s" as="h1" paddingBottom="16">
          Members
        </Heading>
      </RevealFx>

      <RevealFx delay={0.1} translateY={0.5}>
        <Text variant="body-default-l" onBackground="neutral-weak" paddingBottom="40">
          Meet the team
        </Text>
      </RevealFx>

      {people.length > 0 && (
        <RevealFx delay={0.2} translateY={0.5}>
          <Scroller fadeColor="brand-medium" radius="l-4">
            <Row gap="16" paddingBottom="16">
              <Row gap="16">
                {people.map((member) =>
                  member.name ? (
                    <Card
                      key={member.id}
                      href={`/members/${member.firstName.toLowerCase()}`}
                      radius="l-4"
                      direction="column"
                      border="neutral-alpha-medium"
                      aspectRatio="1 / 1.5"
                      minWidth={12}
                      maxWidth={12}
                    >
                  <Media
                    border="neutral-alpha-weak"
                    sizes="400px"
                    fillWidth
                    aspectRatio="1 / 1"
                    radius="l-4"
                    alt={`${member.name}`}
                    src={`${member.avatar}`}
                    minWidth={12}
                  />
                  <Column fillWidth paddingX="20" paddingY="24" gap="8">
                    <Text variant="body-default-xl">{member.name}</Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {member.role}
                    </Text>
                  </Column>
                  <Line background="neutral-alpha-medium" />
                  <Row
                    paddingX="20"
                    paddingY="12"
                    gap="8"
                    vertical="center"
                    textVariant="label-default-s"
                    onBackground="neutral-medium"
                  >
                    {member.socials && member.socials.length > 0 && (
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
                        {member.socials.map((item) =>
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
                  </Row>
                    </Card>
                  ) : null,
                )}
              </Row>
            </Row>
          </Scroller>
        </RevealFx>
      )}
    </Column>
  );
}
