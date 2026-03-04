/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Pickr } from "@/Pickr";

const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-bottom: 1px solid #e3e3e0;
  background: #fff;
`;

const Wordmark = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #0e9888;
  letter-spacing: -0.02em;
`;

const GitHubLink = styled.a`
  color: #706f6c;
  text-decoration: none;
  font-size: 0.875rem;
  transition: color 0.15s ease;
  &:hover {
    color: #141400;
  }
`;

const Hero = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 4rem 2rem 3rem;
  background: linear-gradient(180deg, #f0faf8 0%, #fafafa 100%);
`;

const Headline = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #141400;
  text-align: center;
  margin: 0;
  letter-spacing: -0.03em;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #706f6c;
  text-align: center;
  margin: 0;
  max-width: 480px;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 3rem 2rem;
  max-width: 960px;
  margin: 0 auto;
  width: 100%;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #e3e3e0;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: #141400;
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  color: #90908c;
  line-height: 1.5;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 2rem;
  text-align: center;
  font-size: 0.75rem;
  color: #c8c7c1;
  border-top: 1px solid #e3e3e0;
`;

export const App: React.VFC = () => {
  const [, setDate] = useState<string>("");

  const noop = (_dateString: Date, date: string) => setDate(date);

  return (
    <Page>
      <Header>
        <Wordmark>Pickr</Wordmark>
        <GitHubLink
          href="https://github.com/kadetXx/pickr"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </GitHubLink>
      </Header>

      <Hero>
        <div>
          <Headline>A tiny datepicker for React</Headline>
          <Subtitle>
            Keyboard-accessible, preset-friendly, and styled with Emotion.
          </Subtitle>
        </div>
        <Pickr openByDefault onDateChange={noop} />
      </Hero>

      <Grid>
        <Card>
          <CardTitle>Default</CardTitle>
          <CardDesc>Click the button to open the calendar.</CardDesc>
          <Pickr onDateChange={noop} />
        </Card>

        <Card>
          <CardTitle>Close on Blur</CardTitle>
          <CardDesc>
            Calendar closes when you click outside the component.
          </CardDesc>
          <Pickr closeOnBlur onDateChange={noop} />
        </Card>

        <Card>
          <CardTitle>Custom Format</CardTitle>
          <CardDesc>
            Dates displayed as YYYY.MM.DD with dot separators.
          </CardDesc>
          <Pickr format="yymmdd" separator="." onDateChange={noop} />
        </Card>

        <Card>
          <CardTitle>Disabled</CardTitle>
          <CardDesc>
            The datepicker button is disabled and non-interactive.
          </CardDesc>
          <Pickr disabled onDateChange={noop} />
        </Card>
      </Grid>

      <Footer>
        Built with React, Emotion &amp; Vite
      </Footer>
    </Page>
  );
};
