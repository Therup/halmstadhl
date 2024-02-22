import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import PageTitle from "../utils/PageTitle";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AddTeamForm from "./AddTeamForm";
import { useUser } from "../utils/UserContext";
import Carousel from "../utils/Carousel";
import images from "../../data/images.json";
import Admin from "../utils/Admin";
import GoalScorers from "./GoalScorers";
import TeamStandings from "./TeamStandings";

const TeamTable: React.FC = () => {
  const { user } = useUser();
  const [showTable, setShowTable] = useState(true); // State för att hålla reda på vilket läge som ska visas

  return (
    <Box
      className="mui-theme "
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Knappar för att byta mellan tabell och skytteliga */}
      <Box style={{ marginBottom: "20px" }}>
        <Button
          variant="contained"
          style={{ marginRight: "10px", backgroundColor: "white", padding: 5 }}
          onClick={() => setShowTable(true)}
        >
          Visa tabell
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "white", padding: 5 }}
          onClick={() => setShowTable(false)}
        >
          Visa skytteliga
        </Button>
      </Box>

      {showTable ? (
        <>
          <PageTitle title="Tabell 23/24" icon={<EqualizerIcon />} />
          <TableContainer
            component={Paper}
            style={{ display: "inline-block", maxWidth: "600px" }}
          >
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "rgb(0, 44, 81)" }}>
                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      color: "white",
                      padding: 5,
                      width: "40%",
                    }}
                    padding="none"
                  >
                    Team
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", color: "white" }}
                    padding="none"
                  >
                    GP
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", color: "white" }}
                    padding="none"
                  >
                    WI
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", color: "white" }}
                    padding="none"
                  >
                    LO
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", color: "white" }}
                    padding="none"
                  >
                    TI
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", color: "white" }}
                    padding="none"
                  >
                    GF
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", color: "white" }}
                    padding="none"
                  >
                    GA
                  </TableCell>
                  <TableCell
                    style={{ fontWeight: "bold", color: "white" }}
                    padding="none"
                  >
                    PO
                  </TableCell>
                </TableRow>
              </TableHead>
              <TeamStandings />
            </Table>
          </TableContainer>
        </>
      ) : (
        <Box>
          <GoalScorers />
        </Box>
      )}
      <Admin />
      {user && user.isAdmin && <AddTeamForm />}
      <Box style={{ marginTop: "20px" }}>
        <Carousel images={images} />
      </Box>
    </Box>
  );
};

export default TeamTable;
