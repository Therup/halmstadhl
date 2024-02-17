import { useEffect, useState } from "react";
import { FirebaseService, Team, Match } from "../FirebaseService";
import MatchItem from "./MatchItem";
import "./theme.css";
import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import PageTitle from "./utils/PageTitle";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchesData = await FirebaseService.getMatches();
        const playedMatches = matchesData.filter((match) => match.isPlayed);
        const teamsData = await FirebaseService.getTeams();
        setMatches(playedMatches);
        setTeams(teamsData);
      } catch (error) {
        console.error("Fel vid hämtning av matchdata:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteMatch = (matchId: string) => {
    setMatches(matches.filter((match) => match.id !== matchId));
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
      <PageTitle title="Spelade matcher" icon={<SportsHockeyIcon />} />
      <Box style={{ width: "600px" }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead style={{ backgroundColor: "rgb(0, 44, 81)" }}>
              <TableRow>
                <TableCell
                  style={{
                    color: "white",
                    width: "60%",
                    fontWeight: "bold",
                    textAlign: "center",
                    padding: 5,
                  }}
                  padding="none"
                >
                  Resultat
                </TableCell>
                <TableCell
                  style={{ color: "white", width: "40%", fontWeight: "bold" }}
                  padding="none"
                >
                  Datum
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
      </Box>
      {matches.map((match) => (
        <MatchItem
          key={match.id}
          matches={match}
          teams={teams}
          onDeleteMatch={handleDeleteMatch} // Skicka funktionen för att radera matchen
        />
      ))}

      <hr />
    </Box>
  );
};

export default Matches;
