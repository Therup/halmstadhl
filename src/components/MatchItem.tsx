import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  IconButton,
} from "@material-ui/core";
import { useUser } from "./utils/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { FirebaseService } from "../FirebaseService";
import TeamLogo from "./TeamLogo";

interface MatchProps {
  matches: {
    homeTeam: string;
    awayTeam: string;
    awayScore?: number;
    homeScore?: number;
    date: any;
    id: string;
    result: any;
  };
  teams: any;
  onDeleteMatch: any;
}
const MatchItem: React.FC<MatchProps> = ({ matches }) => {
  const { user } = useUser();
  const date = matches.date.toDate();
  const formattedDate = date.toLocaleDateString("se-SE", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const handleDeleteMatch = async () => {
    if (user && user.isAdmin) {
      try {
        const matchId = matches.id;
        await FirebaseService.deleteMatch(matchId);
        console.log("Match deleted successfully.");
      } catch (error) {
        console.error("Error deleting match:", error);
      }
    }
  };

  return (
    <Box style={{ maxWidth: "600px", width: "100%" }}>
      <TableContainer component={Paper} style={{ width: "100%" }}>
        <Table>
          <TableHead></TableHead>
          <TableBody>
            <TableRow>
              <TableCell
                padding="none"
                style={{ width: "33%", padding: 5, fontWeight: "bold" }}
              >
                <Box style={{ display: "flex" }}>
                  <TeamLogo teamName={matches.homeTeam} />
                  <Box
                    style={{
                      marginRight: "5px",
                      marginLeft: "5px",
                      marginTop: "15px",
                    }}
                  >
                    -
                  </Box>
                  <TeamLogo teamName={matches.awayTeam} />
                  <Box
                    style={{
                      marginRight: "5px",
                      marginLeft: "5px",
                      marginTop: "15px",
                    }}
                  >
                    :
                  </Box>
                </Box>
              </TableCell>
              <TableCell padding="none" style={{ width: "33%" }}>
                {matches.result?.homeScore || 0} -{" "}
                {matches.result?.awayScore || 0}
              </TableCell>
              <TableCell padding="none" style={{ width: "33%" }}>
                {formattedDate}{" "}
                {user && user.isAdmin && (
                  <IconButton
                    aria-label="delete"
                    style={{ marginLeft: "10px" }}
                    onClick={handleDeleteMatch}
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MatchItem;
