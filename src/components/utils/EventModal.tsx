import React, { useEffect, useState } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import TeamLogo from "./TeamLogo";
import { FirebaseService, Team } from "../../FirebaseService";
import { MenuItem, Select, TextField } from "@material-ui/core";
import { useUser } from "./UserContext";

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventInfo: any;
}

const EventModal: React.FC<EventModalProps> = ({
  isOpen,
  onClose,
  eventInfo,
}) => {
  const [newHomeScore, setNewHomeScore] = useState<number>(0);
  const [newAwayScore, setNewAwayScore] = useState<number>(0);
  const [homeGoalScorer, setHomeGoalScorer] = useState<string>("");
  const [awayGoalScorer, setAwayGoalScorer] = useState<string>("");
  const [homeGoals, setHomeGoals] = useState<number>(0);
  const [awayGoals, setAwayGoals] = useState<number>(0);
  const { user } = useUser();

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamsData = await FirebaseService.getTeams();

        setTeams(teamsData);
      } catch (error) {
        console.error("Fel vid hämtning av matchdata:", error);
      }
    };

    fetchData();
  }, []);

  if (!eventInfo) {
    return null; // Returnera ingenting om eventInfo är null
  }
  const { id, homeScore, awayScore, homeTeam, awayTeam, start } = eventInfo;
  const formattedDate = start.toLocaleDateString("sv-SE");

  const handleUpdateMatch = async () => {
    try {
      await FirebaseService.updateMatch(id, {
        result: {
          homeScore: newHomeScore,
          awayScore: newAwayScore,
        },
        isPlayed: true,
        homeGoalScorers: [{ player: homeGoalScorer, goals: homeGoals }],
        awayGoalScorers: [{ player: awayGoalScorer, goals: awayGoals }],
      });
      onClose();
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
              label="Mål hemmalag"
              value={newHomeScore}
              onChange={(e) => setNewHomeScore(Number(e.target.value))}
              style={{ margin: "10px" }}
            />
            <Typography
              variant="body1"
              fontWeight="bold"
              style={{ margin: "10px" }}
            >
              -
            </Typography>
            <TextField
              type="number"
              label="Mål bortalag"
              value={newAwayScore}
              onChange={(e) => setNewAwayScore(Number(e.target.value))}
              style={{ margin: "10px" }}
            />
            <TeamLogo teamName={awayTeam} size={50} />
          </Box>
        )}
        {user && user.isAdmin && (
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Select
              value={homeGoalScorer}
              onChange={(e) => setHomeGoalScorer(e.target.value as string)}
              style={{ marginRight: "10px" }}
            >
              {teams
                .find((team) => team.name === homeTeam)
                ?.players.map((player) => (
                  <MenuItem key={player} value={player}>
                    {player}
                  </MenuItem>
                ))}
            </Select>
            <TextField
              type="number"
              label="Mål"
              value={homeGoals}
              onChange={(e) => setHomeGoals(Number(e.target.value))}
              style={{ marginRight: "10px", width: "80px" }}
            />
            <Select
              value={awayGoalScorer}
              onChange={(e) => setAwayGoalScorer(e.target.value as string)}
            >
              {teams
                .find((team) => team.name === awayTeam)
                ?.players.map((player) => (
                  <MenuItem key={player} value={player}>
                    {player}
                  </MenuItem>
                ))}
            </Select>
            <TextField
              type="number"
              label="Mål"
              value={awayGoals}
              onChange={(e) => setAwayGoals(Number(e.target.value))}
              style={{ marginRight: "10px", width: "80px" }}
            />
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
