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
import { useUser } from "../utils/UserContext";
import DeleteIcon from "@mui/icons-material/Delete";
import { FirebaseService } from "../../FirebaseService";
import TeamLogo from "../utils/TeamLogo";

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
  const formattedDate = date.toISOString().split("T")[0];

  const handleDeleteMatch = async () => {
    if (user && user.isAdmin) {
      try {
        const matchId = matches.id;
        await FirebaseService.deleteMatch(matchId);
        console.log("Match raderad");
      } catch (error) {
        console.error("Error ta bort match", error);
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
              <TableCell padding="none" style={{ width: "60%" }}>
                <Box
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginRight: "20px",
                  }}
                >
                  <Box>
                    <TeamLogo teamName={matches.homeTeam} size={50} />
                  </Box>

                  <Box
                    style={{
                      marginTop: "15px",
                      fontWeight: "bold",
                      display: "flex",
                    }}
                  >
                    <Box>{matches.result?.homeScore || 0}</Box>
                    <Box style={{ marginLeft: "20px", marginRight: "20px" }}>
                      -
                    </Box>
                    <Box>{matches.result?.awayScore || 0}</Box>
                  </Box>
                  <Box>
                    <TeamLogo teamName={matches.awayTeam} size={50} />
                  </Box>
                  <Box></Box>
                </Box>
              </TableCell>
              <TableCell padding="none" style={{ width: "40%" }}>
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
