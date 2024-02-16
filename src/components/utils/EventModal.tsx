import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import TeamLogo from "../TeamLogo";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventInfo: any; // Anpassa eventInfo-typen till din datastruktur för evenemang
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  eventInfo,
}) => {
  if (!eventInfo) {
    return null; // Returnera ingenting om eventInfo är null
  }
  const { homeScore, awayScore, homeTeam, awayTeam } = eventInfo;
  const date = eventInfo.start;
  const formattedDate = date.toISOString().split("T")[0];

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "85%",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h5" style={{ textAlign: "center" }}>
          {homeTeam} vs {awayTeam}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          <TeamLogo teamName={homeTeam} />
          <Typography variant="body1" fontWeight="bold">
            {homeScore}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            -
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {awayScore}
          </Typography>
          <TeamLogo teamName={awayTeam} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography variant="body1" style={{ textAlign: "center" }}>
            Datum: {formattedDate}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        ></Box>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{ mt: 2 }}
          style={{ backgroundColor: "white", color: "black" }}
        >
          Stäng
        </Button>
      </Box>
    </Modal>
  );
};

export default EventModal;
