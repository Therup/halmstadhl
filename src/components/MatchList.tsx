import { useEffect, useState } from "react";
import { FirebaseService, Team, Match } from "../FirebaseService";
import MatchItem from "./MatchItem";
import "./theme.css";
import {
  Box,
  Paper,
  Table,
  TableBody,
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
        const teamsData = await FirebaseService.getTeams();
        setMatches(matchesData);
        setTeams(teamsData);
      } catch (error) {
        console.error("Fel vid hämtning av matchdata:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteMatch = (matchId: string) => {
    setMatches(matches.filter((match) => match.date !== matchId));
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
                    width: "33%",
                    padding: 5,
                  }}
                  padding="none"
                >
                  Lag
                </TableCell>
                <TableCell
                  style={{ color: "white", width: "33%" }}
                  padding="none"
                >
                  Resultat
                </TableCell>
                <TableCell
                  style={{ color: "white", width: "33%" }}
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
          key={match.date}
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
