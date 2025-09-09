import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
  Scroller,
  Card,
  Line,
  RevealFx,
  Flex,
} from "@once-ui-system/core";
import { baseURL, about, person, social, teds, dov, people } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <Row fillWidth s={{ direction: "column" }} horizontal="center">
        {about.avatar.display && (
          <Column
            className={styles.avatar}
            position="sticky"
            top="64"
            s={{ position: "relative" }}
            minWidth="160"
            paddingX="l"
            paddingBottom="xl"
            gap="m"
            flex={3}
            horizontal="center"
          >
            <Avatar src={person.avatar} size="xl" />
            <Row gap="8" vertical="center">
              <Icon onBackground="accent-weak" name="globe" />
              {person.location}
            </Row>
            {person.languages && person.languages.length > 0 && (
              <Row wrap gap="8">
                {person.languages.map((language, index) => (
                  <Tag key={index} size="l">
                    {language}
                  </Tag>
                ))}
              </Row>
            )}
          </Column>
        )}
        
        <Column className={styles.blockAlign} flex={9} maxWidth={40}>
          <Column
            id={about.intro.title}
            fillWidth
            minHeight="160"
            vertical="center"
            marginBottom="32"
          >
            {about.calendar.display && (
              <Row
                fitWidth
                border="brand-alpha-medium"
                background="brand-alpha-weak"
                radius="full"
                padding="4"
                gap="8"
                marginBottom="m"
                vertical="center"
                className={styles.blockAlign}
                style={{
                  backdropFilter: "blur(var(--static-space-1))",
                }}
              >
                <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                <Row paddingX="8">Schedule a call</Row>
                <IconButton
                  href={about.calendar.link}
                  data-border="rounded"
                  variant="secondary"
                  icon="chevronRight"
                />
              </Row>
            )}
            <RevealFx>
              <Heading className={styles.textAlign} variant="display-strong-xl">
                {person.name}
              </Heading>
            </RevealFx>
            <Text
              className={styles.textAlign}
              variant="display-default-xs"
              onBackground="neutral-weak"
            >
              {person.role}
            </Text>
            <RevealFx delay={0.1} translateY={0.5}>
              {social.length > 0 && (
                <Row
                className={styles.blockAlign}
                paddingTop="20"
                paddingBottom="8"
                gap="8"
                wrap
                horizontal="center"
                fitWidth
                data-border="rounded"
              >
                  {social.map(
                    (item) =>
                      item.link && (
                        <React.Fragment key={item.name}>
                          <Row s={{ hide: true }}>
                          <Button
                                key={item.name}
                              href={item.link}
                              prefixIcon={item.icon}
                              label={item.name}
                              size="s"
                              weight="default"
                              variant="secondary"
                            />
                          </Row>
                        <Row hide s={{ hide: false }}>
                          <IconButton
                                size="l"
                              key={`${item.name}-icon`}
                              href={item.link}
                              icon={item.icon}
                              variant="secondary"
                            />
                          </Row>
                      </React.Fragment>
                      ),
                  )}
                </Row>
              )}
            </RevealFx>
          </Column>

          {about.intro.display && (
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
              {about.intro.description}
            </Column>
          )}

          <RevealFx delay={0.15} translateY={0.5}>
            <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                {about.intro.description}
            </Column>
          </RevealFx>
          
          <RevealFx delay={0.2} translateY={0.5}>
            <Heading className={styles.textAlign} variant="display-strong-s" as="h2" paddingBottom="16">
                Members
              </Heading>
          </RevealFx>
          
          {people.length > 0 && (
              <RevealFx delay={0.3} translateY={0.5}>
                <Scroller fadeColor="brand-medium" radius="l-4">
                  <Row gap="16" paddingBottom="16">
                    <Row gap="16">
                      {people.map(
                        (member) => member.name && (
                                        <Card 
                                          radius="l-4" 
                                          direction="column" 
                                          border="neutral-alpha-medium"
                                          aspectRatio="1 / 1.5"
                                          minWidth={12}
                                          maxWidth={12}
                                        >
                          {/* <Row fillWidth paddingX="20" paddingY="12" gap="8" vertical="center">
                            <Text variant="label-default-s">{member.name}</Text>
                          </Row> */}
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
                            <Text variant="body-default-xl">{member.name} </Text>
                            <Text variant="body-default-m" onBackground="neutral-weak">{member.role}</Text>
                            {/* <Text onBackground="neutral-weak" variant="body-default-s">
                              Text
                            </Text> */}
                          </Column>
                          <Line background="neutral-alpha-medium" />
                          <Row
                            paddingX="20" paddingY="12" gap="8" vertical="center"
                            textVariant="label-default-s" onBackground="neutral-medium"
                          >
                            {member.socials.length > 0 && (
                              <Flex className={styles.blockAlign} paddingTop="2" paddingBottom="2" gap="2" wrap horizontal="center" fitWidth data-border="rounded">
                                {member.socials.map(
                                  (item) => item.link && (
                                    <React.Fragment key={item.name}>
                                      <Row s={{ hide: true }}>
                                        <Button
                                          key={item.name}
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
                                          key={`${item.name}-icon`}
                                          href={item.link}
                                          icon={item.icon}
                                          variant="secondary"
                                        />
                                      </Row>
                                    </React.Fragment>
                                  ),
                                )}
                              </Flex>
                            )}
                          </Row>
                        </Card>
                        ))}
                    </Row>
                  </Row>
                </Scroller>
              </RevealFx>
          )}           
          {about.work.display && (
            <>
              <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                {about.work.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.work.experiences.map((experience, index) => (
                  <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth>
                    <Row fillWidth horizontal="between" vertical="end" marginBottom="4">
                      <Text id={experience.company} variant="heading-strong-l">
                        {experience.company}
                      </Text>
                      <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {experience.timeframe}
                      </Text>
                    </Row>
                    <Text variant="body-default-s" onBackground="brand-weak" marginBottom="m">
                      {experience.role}
                    </Text>
                    <Column as="ul" gap="16">
                      {experience.achievements.map(
                        (achievement: React.ReactNode, index: number) => (
                          <Text
                            as="li"
                            variant="body-default-m"
                            key={`${experience.company}-${index}`}
                          >
                            {achievement}
                          </Text>
                        ),
                      )}
                    </Column>
                    {experience.images && experience.images.length > 0 && (
                      <Row fillWidth paddingTop="m" paddingLeft="40" gap="12" wrap>
                        {experience.images.map((image, index) => (
                          <Row
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.studies.display && (
            <>
              <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                {about.studies.title}
              </Heading>
              <Column fillWidth gap="l" marginBottom="40">
                {about.studies.institutions.map((institution, index) => (
                  <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                    <Text id={institution.name} variant="heading-strong-l">
                      {institution.name}
                    </Text>
                    <Text variant="heading-default-xs" onBackground="neutral-weak">
                      {institution.description}
                    </Text>
                  </Column>
                ))}
              </Column>
            </>
          )}

          {about.technical.display && (
            <>
              <Heading
                as="h2"
                id={about.technical.title}
                variant="display-strong-s"
                marginBottom="40"
              >
                {about.technical.title}
              </Heading>
              <Column fillWidth gap="l">
                {about.technical.skills.map((skill, index) => (
                  <Column key={`${skill}-${index}`} fillWidth gap="4">
                    <Text id={skill.title} variant="heading-strong-l">
                      {skill.title}
                    </Text>
                    <Text variant="body-default-m" onBackground="neutral-weak">
                      {skill.description}
                    </Text>
                    {skill.tags && skill.tags.length > 0 && (
                      <Row wrap gap="8" paddingTop="8">
                        {skill.tags.map((tag, tagIndex) => (
                          <Tag key={`${skill.title}-${tagIndex}`} size="l" prefixIcon={tag.icon}>
                            {tag.name}
                          </Tag>
                        ))}
                      </Row>
                    )}
                    {skill.images && skill.images.length > 0 && (
                      <Row fillWidth paddingTop="m" gap="12" wrap>
                        {skill.images.map((image, index) => (
                          <Row
                            key={index}
                            border="neutral-medium"
                            radius="m"
                            minWidth={image.width}
                            height={image.height}
                          >
                            <Media
                              enlarge
                              radius="m"
                              sizes={image.width.toString()}
                              alt={image.alt}
                              src={image.src}
                            />
                          </Row>
                        ))}
                      </Row>
                    )}
                  </Column>
                ))}
              </Column>
            </>
          )}
        </Column>
      </Row>
    </Column>
  );
}