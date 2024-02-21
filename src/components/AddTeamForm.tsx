import React, { useState } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Box, Button, FormControl, TextField } from "@material-ui/core";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PageTitle from "./utils/PageTitle";

const AddTeamForm = () => {
  const [teamName, setTeamName] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    switch (name) {
      case "teamName":
        setTeamName(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const teamData = {
      name: teamName,
    };

    try {
      const db = getFirestore();
      const teamsRef = collection(db, "Teams2");
      await addDoc(teamsRef, teamData);

      setTeamName("");

      alert("WOW du lyckades lägga till ett lag. GRATTIS!!");
    } catch (error) {
      console.error("Error med att lägga till lag i Firestore:", error);
      alert("Misslyckades lägga till lag");
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
            </Box>
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
