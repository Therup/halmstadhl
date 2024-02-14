import React, { useState, useEffect } from "react";
import MyCalendar from "./MyCalendar";
import { FirebaseService, Match } from "../FirebaseService";

const CalendarPage: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);

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
    </div>
  );
};

export default CalendarPage;
