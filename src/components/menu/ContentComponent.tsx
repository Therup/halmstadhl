import React from "react";
import { Box, Container } from "@material-ui/core";
import TeamTable from "../teamTable";
import Matches from "../matchList/MatchList";
import Admin from "../utils/Admin";
import RandomStringGenerator from "../RandomStringGenerator";
import ContactForm from "../Contact";
import CalendarPage from "../calendar/CalendarPage";

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
        {value === 1 && <CalendarPage />}
        {value === 2 && <Matches />}
        {value === 3 && <RandomStringGenerator />}
        {value === 4 && <ContactForm />}
      </Box>
    </Container>
  );
};

export default ContentComponent;
