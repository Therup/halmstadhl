import React from "react";
import { Box, Container } from "@material-ui/core";
import TeamTable from "../teamTable/teamTable";
import Matches from "../matchList/MatchList";
import Admin from "../utils/Admin";
import RandomStringGenerator from "../RandomStringGenerator";
import ContactForm from "../Contact";
import CalendarPage from "../calendar/CalendarPage";
import TeamsComponent from "../teams/TeamsComponent";

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
        padding: 10,
      }}
    >
      <Box>
        {value === 0 && <TeamTable />}
        {value === 1 && <CalendarPage />}
        {value === 2 && <Matches />}
        {value === 3 && <TeamsComponent />}
        {value === 4 && <ContactForm />}
      </Box>
    </Container>
  );
};

export default ContentComponent;
