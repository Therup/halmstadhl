import React, { useEffect, useState } from "react";
import { Button, TextField, Select, InputLabel, Box } from "@material-ui/core";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import { Team, Match } from "../../FirebaseService";

const MatchForm: React.FC = ({}) => {
  const [homeTeam, setHomeTeam] = useState<string>("");
  const [awayTeam, setAwayTeam] = useState<string>("");
  const [homeScore, setHomeScore] = useState<number>(0);
  const [awayScore, setAwayScore] = useState<number>(0);
  const [teams, setTeams] = useState<Team[]>([]);
  const [date, setDate] = useState("");

  const handleHomeTeamChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as string;
    setHomeTeam(value);
  };

  const handleAwayTeamChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as string;
    setAwayTeam(value);
  };

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

    const currentDate = new Date();
    const selectedDate = new Date(date); // Använd det valda datumet från formuläret
    selectedDate.setHours(0, 0, 0, 0); // Nollställ tiden för att matcha datumet

    const isFutureDate = selectedDate > currentDate;
    const isPlayed = !isFutureDate;

    const timestamp = Timestamp.fromDate(selectedDate);
    console.log(timestamp);

    const matchData: Match = {
      id: "",
      homeTeam,
      awayTeam,
      date: timestamp,
      result: {
        homeScore: Number(homeScore),
        awayScore: Number(awayScore),
      },
      isPlayed,
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
    <Box mt={2}>
      <form onSubmit={handleSubmit}>
        <InputLabel>Hemmalag </InputLabel>
        <Select
          style={{ width: "150px" }}
          value={homeTeam}
          required
          onChange={handleHomeTeamChange}
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
          required
          onChange={handleAwayTeamChange}
        >
          <option value="">Välj bortalag</option>
          {teams.map((team) => (
            <option key={team.name} value={team.name}>
              {team.name}
            </option>
          ))}
        </Select>

        <TextField
          placeholder="Mål bortalaglag"
          type="number"
          value={awayScore}
          onChange={(e) => setAwayScore(Number(e.target.value))}
        />
        <TextField
          label="Datum"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button
          type="submit"
          variant="contained"
          style={{
            marginTop: "10px",
            padding: "5px",
            backgroundColor: "white",
          }}
        >
          Skapa Match
        </Button>
      </form>
    </Box>
  );
};

export default MatchForm;
