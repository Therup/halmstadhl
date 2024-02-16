import React, { useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import TeamLogo from "../TeamLogo";
import { FirebaseService } from "../../FirebaseService";
import { TextField } from "@material-ui/core";
import { useUser } from "./UserContext";

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
  const [newHomeScore, setNewHomeScore] = useState<number>(0);
  const [newAwayScore, setNewAwayScore] = useState<number>(0);
  const { user } = useUser();
  if (!eventInfo) {
    return null; // Returnera ingenting om eventInfo är null
  }
  const { id, homeScore, awayScore, homeTeam, awayTeam } = eventInfo;
  const date = eventInfo.start;
  const formattedDate = date.toISOString().split("T")[0];

  const handleUpdateMatch = async () => {
    try {
      await FirebaseService.updateMatch(id, {
        result: {
          homeScore: newHomeScore,
          awayScore: newAwayScore,
        },
        isPlayed: true,
      });
      onClose(); // Stäng modalen efter att matchen har uppdaterats
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

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
          <TeamLogo teamName={homeTeam} size={100} />
          <Typography variant="body1" fontWeight="bold">
            {homeScore}
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            -
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {awayScore}
          </Typography>
          <TeamLogo teamName={awayTeam} size={100} />
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography variant="body1" style={{ textAlign: "center" }}>
            Datum: {formattedDate}
          </Typography>
        </Box>
        {user && user.isAdmin && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mt: 2,
            }}
          >
            <TeamLogo teamName={homeTeam} size={50} />
            <TextField
              type="number"
              label="Home Score"
              value={newHomeScore}
              onChange={(e) => setNewHomeScore(Number(e.target.value))}
            />
            <Typography variant="body1" fontWeight="bold">
              -
            </Typography>
            <TextField
              type="number"
              label="Away Score"
              value={newAwayScore}
              onChange={(e) => setNewAwayScore(Number(e.target.value))}
            />
            <TeamLogo teamName={awayTeam} size={50} />
          </Box>
        )}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: 2,
          }}
        >
          {/* Knapp för att uppdatera matchen */}
          {user && user.isAdmin && (
            <Button
              onClick={handleUpdateMatch}
              variant="contained"
              sx={{ mt: 2 }}
              style={{ backgroundColor: "green", color: "white" }}
            >
              Uppdatera Match
            </Button>
          )}
          {/* Knapp för att stänga modalen */}
          <Button
            onClick={onClose}
            variant="contained"
            sx={{ mt: 2 }}
            style={{ backgroundColor: "white", color: "black" }}
          >
            Stäng
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EventModal;
