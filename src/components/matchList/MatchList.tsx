import { useEffect, useState } from "react";
import { FirebaseService, Team, Match } from "../../FirebaseService";
import MatchItem from "./MatchItem";
import {
  Box,
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@material-ui/core";
import PageTitle from "../utils/PageTitle";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [showPlayedMatches, setShowPlayedMatches] = useState(true);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width:600px)");

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
    setMatches(matches.filter((match) => match.id !== matchId));
  };

  const toggleMatches = (showPlayed: boolean) => {
    setShowPlayedMatches(showPlayed);
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
      <Box style={{ marginBottom: "10px" }}>
        <Button
          variant={showPlayedMatches ? "contained" : "outlined"}
          onClick={() => toggleMatches(true)}
          style={{ marginRight: "10px", backgroundColor: "white" }}
        >
          Spelade matcher
        </Button>
        <Button
          variant={!showPlayedMatches ? "contained" : "outlined"}
          style={{ backgroundColor: "white" }}
          onClick={() => toggleMatches(false)}
        >
          Kommande
        </Button>
      </Box>
      <Box>
        {isMobile ? (
          <TableContainer component={Paper} style={{ width: "100%" }}>
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
            {matches
              .filter((match) =>
                showPlayedMatches ? match.isPlayed : !match.isPlayed
              )
              .map((match) => (
                <MatchItem
                  key={match.id}
                  matches={match}
                  teams={teams}
                  onDeleteMatch={handleDeleteMatch}
                />
              ))}
          </TableContainer>
        ) : (
          <TableContainer component={Paper} style={{ width: "600px" }}>
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
            {matches
              .filter((match) =>
                showPlayedMatches ? match.isPlayed : !match.isPlayed
              )
              .map((match) => (
                <MatchItem
                  key={match.id}
                  matches={match}
                  teams={teams}
                  onDeleteMatch={handleDeleteMatch}
                />
              ))}
          </TableContainer>
        )}
      </Box>

      <hr />
    </Box>
  );
};

export default Matches;
