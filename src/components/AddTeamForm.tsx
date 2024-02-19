import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Box, Button, FormControl, TextField } from "@material-ui/core";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PageTitle from "./utils/PageTitle";

const AddTeamForm = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [wins, setWins] = useState<number>(0);
  const [losses, setLosses] = useState<number>(0);
  const [draws, setDraws] = useState<number>(0);

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

      alert("Team successfully added!");
    } catch (error) {
      console.error("Error adding team to Firestore:", error);
      alert("Failed to add team. Please try again later.");
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
      <form onSubmit={handleSubmit}>
        <FormControl>
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
                value={wins.toString()}
                onChange={handleInputChange}
              />
            </Box>
            <TextField
              id="outlined-number"
              label="Förluster"
              type="number"
              name="losses"
              value={losses.toString()}
              onChange={handleInputChange}
            />
            <TextField
              id="outlined-number"
              label="Oavgjorda"
              type="number"
              name="draws"
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
      </form>
    </Box>
  );
};

export default AddTeamForm;
