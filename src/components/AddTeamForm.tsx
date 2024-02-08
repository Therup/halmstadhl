import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
} from "@material-ui/core";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import "./theme.css";
import PageTitle from "./utils/PageTitle";
import Divider from "@mui/material/Divider";

const AddTeamForm = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [wins, setWins] = useState<number>(0);
  const [losses, setLosses] = useState<number>(0);
  const [draws, setDraws] = useState<number>(0);
  const [goalsConceded, setGoalsConceded] = useState<number>(0);
  const [goalsScored, setGoalsScored] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const [playedMatches, setPlayedMatches] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "teamName":
        setTeamName(value);
        break;
      case "wins":
        setWins(parseInt(value, 10));
        break;
      case "losses":
        setLosses(parseInt(value, 10));
        break;
      case "draws":
        setDraws(parseInt(value, 10));
        break;
      // ... andra fält
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const teamData = {
      name: teamName,
      statistics: {
        wins,
        losses,
        draws,
        goalsConceded,
        goalsScored,
        playedMatches,
        points,
      },
    };

    try {
      const db = getFirestore();
      const teamsRef = collection(db, "Teams2");
      await addDoc(teamsRef, teamData);

      setTeamName("");
      setWins(0);
      setLosses(0);
      setDraws(0);
      setGoalsConceded(0);
      setGoalsScored(0);
      setPoints(0);
      setPlayedMatches(0);
    } catch (error) {
      console.error("Fel vid tillägg av lag:", error);
    }
  };

  return (
    <Box
      className="mui-theme"
      style={{
        marginTop: "30px",
        maxWidth: "600px",
        flexDirection: "column",
        alignItems: "center",
        display: "flex",
      }}
    >
      <PageTitle title="Nytt lag" icon={<GroupAddIcon />} />
      <FormControl onSubmit={handleSubmit}>
        <Box display="flex">
          <Box display="inline-bloc">
            <TextField
              id="outlined-number"
              label="Lagets namn"
              type="text"
              name="teamName"
              value={teamName}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-number"
              label="Vinster"
              type="number"
              name="wins"
              disabled
              value={wins.toString()}
              onChange={handleInputChange}
            />
          </Box>
          <TextField
            id="outlined-number"
            label="Förluster"
            type="number"
            name="losses"
            disabled
            value={losses.toString()}
            onChange={handleInputChange}
          />
          <TextField
            id="outlined-number"
            label="Oavgjorda"
            type="number"
            name="draws"
            disabled
            value={draws.toString()}
            onChange={handleInputChange}
          />
        </Box>
        <Button
          className="custom-button"
          variant="contained"
          type="submit"
          style={{ marginTop: "50px", backgroundColor: "white" }}
        >
          Lägg till lag
        </Button>
      </FormControl>
    </Box>
  );
};

export default AddTeamForm;
