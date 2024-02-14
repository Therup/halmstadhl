import React from "react";
import { Box, Container } from "@material-ui/core";
import TeamTable from "../teamTable";
import Matches from "../MatchList";
import Admin from "../Admin";
import RandomStringGenerator from "../RandomStringGenerator";
import ContactForm from "../Contact";

interface ContentProps {
  value: number;
}

const ContentComponent: React.FC<ContentProps> = ({ value }) => {
  return (
    <Container
      style={{
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
        minWidth: "100%",
      }}
    >
      <Box>
        {value === 0 && <TeamTable />}
        {value === 1 && <div>Content for Kalender</div>}
        {value === 2 && <Matches />}
        {value === 3 && <Admin />}
        {value === 4 && <RandomStringGenerator />}
        {value === 5 && <ContactForm />}
      </Box>
    </Container>
  );
};

export default ContentComponent;
