/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Pickr } from "@/Pickr";

const Page = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1080px;
  margin: 0 auto;
  width: 100%;
  padding: 0 3rem 4rem;

  @media (max-width: 600px) {
    padding: 0 1.5rem 3rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1.5rem 0;

  @media (max-width: 600px) {
    padding: 1rem 0;
  }
`;

const GitHubLink = styled.a`
  color: #90908c;
  text-decoration: none;
  transition: color 0.15s ease;
  display: flex;
  &:hover {
    color: #141400;
  }
`;

const Intro = styled.section`
  padding: 3.5rem 0 3.5rem;

  @media (max-width: 600px) {
    padding: 2rem 0 2rem;
  }
`;

const Headline = styled.h1`
  font-size: 3.25rem;
  font-weight: 700;
  color: #141400;
  margin: 0;
  letter-spacing: -0.035em;
  line-height: 1.1;

  @media (max-width: 600px) {
    font-size: 1.75rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #90908c;
  margin: 1rem 0 0;
  line-height: 1.5;

  @media (max-width: 600px) {
    font-size: 1.0625rem;
  }
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid #e3e3e0;
  border-radius: 14px;
  padding: 1.25rem 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  min-height: 220px;
`;

const CardLabel = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: #90908c;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const CardSpacer = styled.div`
  flex: 1;
`;

export const App: React.VFC = () => {
  const [, setDate] = useState<string>("");

  const noop = (_dateString: Date, date: string) => setDate(date);

  return (
    <Page>
      <Header>
        <GitHubLink
          href="https://github.com/kadetXx/pickr"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <svg width="22" height="22" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
        </GitHubLink>
      </Header>

      <Intro>
        <Headline>tiny datepicker for react</Headline>
        <Subtitle>
          keyboard-accessible, preset-friendly, and styled with emotion.
        </Subtitle>
      </Intro>

      <Grid>
        <Card>
          <CardLabel>Default</CardLabel>
          <CardSpacer />
          <Pickr onDateChange={noop} />
        </Card>

        <Card>
          <CardLabel>Close on Blur</CardLabel>
          <CardSpacer />
          <Pickr closeOnBlur onDateChange={noop} />
        </Card>

        <Card>
          <CardLabel>Custom Format</CardLabel>
          <CardSpacer />
          <Pickr format="yymmdd" separator="." initialDate={new Date(2025, 11, 25)} onDateChange={noop} />
        </Card>

        <Card>
          <CardLabel>Disabled</CardLabel>
          <CardSpacer />
          <Pickr disabled onDateChange={noop} />
        </Card>
      </Grid>
    </Page>
  );
};
