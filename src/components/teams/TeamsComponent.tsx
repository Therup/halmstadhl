import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@material-ui/core";
import { FirebaseService, Team } from "../../FirebaseService";
import TeamLogo from "../utils/TeamLogo";
import { useUser } from "../utils/UserContext";

const TeamsComponent: React.FC = ({}) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("Vikings");
  const [newPlayerName, setNewPlayerName] = useState<string>("");
  const { user } = useUser();

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

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedTeam(newValue);
  };

  const handleAddPlayer = async () => {
    if (newPlayerName.trim() === "") return;
    try {
      const updatedTeams = teams.map((team) => {
        if (team.name === selectedTeam) {
          return {
            ...team,
            players: [...team.players, newPlayerName.trim()],
          };
        }
        return team;
      });

      await FirebaseService.updateTeamPlayers(
        selectedTeam,
        updatedTeams.find((team) => team.name === selectedTeam)?.players || []
      );
      setNewPlayerName("");
      setTeams(updatedTeams);
    } catch (error) {
      console.error("Error adding player:", error);
    }
  };

  return (
    <Box>
      <Tabs
        value={selectedTeam}
        onChange={handleTabChange}
        centered
        style={{
          color: "white",
        }}
      >
        {teams.map((team, index) => (
          <Tab
            key={index}
            value={team.name}
            style={{ display: "inline-block", width: "75px" }}
            label={<TeamLogo teamName={team.name} size={50} />}
          />
        ))}
      </Tabs>
      <Container
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          minWidth: "100%",
          padding: 10,
        }}
      >
        {teams.map((team) => (
          <Box key={team.name} hidden={selectedTeam !== team.name}>
            <Card variant="outlined" style={{ minWidth: 200, padding: 0 }}>
              <CardContent style={{ padding: 0 }}>
                <Box style={{ textAlign: "center" }}>
                  <TeamLogo teamName={team.name} size={200} />
                </Box>

                <Typography
                  variant="h4"
                  component="h2"
                  style={{ marginTop: 20, textAlign: "center" }}
                >
                  {team.name}
                </Typography>
                <hr />
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    padding: 3,
                  }}
                >
                  <Box style={{ width: "60%", borderRight: "1px solid grey" }}>
                    {team.info}
                  </Box>
                  <Box style={{ paddingBottom: 10, marginLeft: "5px" }}>
                    <Box>Spelare:</Box>
                    <Box>
                      {team.players.map((player, index) => (
                        <div key={index}>{player}</div>
                      ))}
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
        {user && user.isAdmin && (
          <Box style={{ marginTop: 20 }}>
            <TextField
              label="Ny spelare"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              variant="outlined"
              style={{ maxWidth: "225px" }}
              size="small"
            />
            <Button
              variant="contained"
              onClick={handleAddPlayer}
              style={{ marginLeft: 10, backgroundColor: "white" }}
            >
              Ny spelare
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default TeamsComponent;
