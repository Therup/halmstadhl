import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Container,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import { FirebaseService, Team } from "../../FirebaseService";
import TeamLogo from "../utils/TeamLogo";

const TeamsComponent: React.FC = ({}) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>("Vikings");

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
        {teams.map((team) => (
          <Tab
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
                  style={{ display: "flex", justifyContent: "space-evenly" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    style={{ width: "60%" }}
                  >
                    {team.info}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    <Box>Spelare:</Box>
                    <Box>
                      {" "}
                      {team.players.map((player, index) => (
                        <div key={index}>{player}</div>
                      ))}{" "}
                    </Box>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Container>
    </Box>
  );
};

export default TeamsComponent;
