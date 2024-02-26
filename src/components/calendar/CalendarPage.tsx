import React, { useState, useEffect } from "react";
import MyCalendar from "./MyCalendar";
import { FirebaseService, Match } from "../../FirebaseService";
import MatchForm from "./CreateMatchFormForCalendar";
import { useUser } from "../utils/UserContext";
import PageTitle from "../utils/PageTitle";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import { Box } from "@material-ui/core";

const CalendarPage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const { user } = useUser();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matchesData = await FirebaseService.getMatches();
        setMatches(matchesData);
      } catch (error) {
        console.error("Fel vid hämtning av matcher:", error);
      }
    };

    fetchMatches();
  }, []);

  return (
    <Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <PageTitle icon={<CalendarMonth />} title="Kalender" />
      </Box>

      <MyCalendar matches={matches} />
      {user && user.isAdmin && <MatchForm />}
    </Box>
  );
};

export default CalendarPage;
