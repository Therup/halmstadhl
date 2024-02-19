import React, { useState, useEffect } from "react";
import MyCalendar from "./MyCalendar";
import { FirebaseService, Match } from "../../FirebaseService";
import MatchForm from "./CreateMatchFormForCalendar";
import { useUser } from "../utils/UserContext";

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
    <div style={{ paddingTop: "30px" }}>
      <MyCalendar matches={matches} />
      {user && user.isAdmin && <MatchForm />}
    </div>
  );
};

export default CalendarPage;
