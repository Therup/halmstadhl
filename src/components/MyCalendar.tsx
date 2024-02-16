import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Match } from "../FirebaseService";
import TeamLogo from "./TeamLogo";
import { Box, useMediaQuery } from "@material-ui/core";
import EventModal from "./utils/EventModal";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";

const localizer = momentLocalizer(moment);

interface CalendarProps {
  matches: Match[];
}

const MyCalendar: React.FC<CalendarProps> = ({ matches }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const renderEventTitle = (match: Match) => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isMobile ? (
          <SportsHockeyIcon fontSize="large" />
        ) : (
          <>
            <TeamLogo teamName={match.homeTeam} />
            <Box
              style={{
                marginLeft: "5px",
                marginRight: "5px",
                marginTop: "10px",
              }}
            >
              vs
            </Box>
            <TeamLogo teamName={match.awayTeam} />
          </>
        )}
      </div>
    );
  };

  useEffect(() => {
    const eventsData = matches.map((match) => ({
      id: match.id,
      title: renderEventTitle(match), // Använd renderEventTitle för att generera JSX för titeln
      start: new Date(match.date.seconds * 1000),
      end: new Date(match.date.seconds * 1000),
      allDay: true,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeScore: match.result.homeScore,
      awayScore: match.result.awayScore,
      backgroundColor:
        match.result.homeScore !== null && match.result.awayScore !== null
          ? "#7cb342"
          : "#2196f3",
    }));
    setEvents(eventsData);
    // eslint-disable-next-line
  }, [matches]);

  return (
    <div style={{ height: 500, margin: "5px auto" }}>
      <Calendar
        views={["month"]}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ width: "100%", backgroundColor: "white" }}
        onSelectEvent={handleEventClick}
      />
      <EventModal
        isOpen={selectedEvent !== null}
        onClose={handleCloseModal}
        eventInfo={selectedEvent}
      />
    </div>
  );
};

export default MyCalendar;
