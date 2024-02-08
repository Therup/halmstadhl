import React, { useState, useEffect } from "react";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { Team } from "../FirebaseService";
import { Button, TextField, Select, InputLabel, Box } from "@material-ui/core";
import PageTitle from "./utils/PageTitle";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";

const CreateMatchForm = () => {
  const [homeTeam, setHomeTeam] = useState<any>("");
  const [awayTeam, setAwayTeam] = useState<any>("");
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      const db = getFirestore();
      const teamsRef = collection(db, "Teams2");
      const querySnapshot = await getDocs(teamsRef);

      const teamData: any = [];

      querySnapshot.forEach((doc) => {
        const team = doc.data();
        teamData.push({
          id: doc.id,
          ...team,
        });
      });

      setTeams(teamData);
    };

    fetchTeamData();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const matchData = {
      homeTeam,
      awayTeam,
      date: Timestamp.fromDate(new Date()),
      result: {
        homeScore: Number(homeScore),
        awayScore: Number(awayScore),
      },
    };

    const db = getFirestore();
    const matchesRef = collection(db, "matches2");
    await addDoc(matchesRef, matchData);

    setHomeTeam("");
    setAwayTeam("");
    setHomeScore(0);
    setAwayScore(0);
  };

  return (
    <Box
      className="mui-theme"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <PageTitle title="Ny match" icon={<SportsHockeyIcon />} />
      <form onSubmit={handleSubmit}>
        <InputLabel>Hemmalag </InputLabel>
        <Select
          style={{ width: "150px" }}
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
        >
          <option value="">Välj hemmalag</option>
          {teams.map((team) => (
            <option key={team.name} value={team.name}>
              {team.name}
            </option>
          ))}
        </Select>
        <TextField
          placeholder="Mål hemmalag"
          type="number"
          value={homeScore}
          onChange={(e) => setHomeScore(Number(e.target.value))}
        />

        <InputLabel>Bortalag</InputLabel>
        <Select
          style={{ width: "150px" }}
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
        >
          <option value="">Välj bortalag</option>
          {teams.map((team) => (
            <option key={team.name} value={team.name}>
              {team.name}
            </option>
          ))}
        </Select>

        <TextField
          placeholder="Mål hemmalag"
          type="number"
          value={awayScore}
          onChange={(e) => setAwayScore(Number(e.target.value))}
        />
        <Box style={{ marginTop: "10px" }}>
          <Button
            variant="contained"
            className="button"
            type="submit"
            style={{ backgroundColor: "white" }}
          >
            Skapa match
          </Button>
        </Box>
      </form>
    </Box>
  );
};
export default CreateMatchForm;
