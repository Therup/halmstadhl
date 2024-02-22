import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Match } from "../../FirebaseService";
import TeamLogo from "../utils/TeamLogo";
import { Box, useMediaQuery } from "@material-ui/core";
import EventModal from "./EventModal";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";

const localizer = momentLocalizer(moment);

interface CalendarProps {
  matches: Match[];
}

const MyCalendar: React.FC<CalendarProps> = ({ matches }) => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: "transparent", // Set the background color here
      },
    };
  };

  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };
  useEffect(() => {
    const eventsData = matches.map((match) => ({
      id: match.id,
      start: new Date(match.date.seconds * 1000),
      end: new Date(match.date.seconds * 1000),
      allDay: true,
      homeTeam: match.homeTeam,
      awayTeam: match.awayTeam,
      homeScore: match.result.homeScore,
      awayScore: match.result.awayScore,
      awayGoalScorers: match.awayGoalScorers,
      homeGoalScorers: match.homeGoalScorers,
    }));
    setEvents(eventsData);
    // eslint-disable-next-line
  }, [matches]);

  return (
    <div style={{ height: 600, margin: "5px auto" }}>
      <Calendar
        views={["month"]}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter}
        style={{ width: "100%", backgroundColor: "white" }}
        onSelectEvent={handleEventClick}
        components={{
          event: EventComponent, // Anpassad komponent för varje händelse
        }}
      />
      <EventModal
        isOpen={selectedEvent !== null}
        onClose={handleCloseModal}
        eventInfo={selectedEvent}
      />
    </div>
  );
};

const EventComponent: React.FC<any> = ({ event }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { start } = event;
  const isFuture = moment(start).isAfter(moment(), "day"); // Kontrollera om datumet är i framtiden

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: "black",
        border: isFuture ? "3px solid green" : "3px solid rgb(0, 44, 81)",
        borderRadius: "5px",
      }}
    >
      {isMobile ? (
        <Box>
          <SportsHockeyIcon fontSize="large" />
        </Box>
      ) : (
        <>
          <TeamLogo teamName={event.homeTeam} size={50} />
          <Box
            style={{
              marginLeft: "5px",
              marginRight: "5px",
            }}
          >
            vs
          </Box>
          <TeamLogo teamName={event.awayTeam} size={50} />
        </>
      )}
    </div>
  );
};

export default MyCalendar;
