import React, { useEffect, useState } from "react";
import { FirebaseService } from "../FirebaseService";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import PageTitle from "./utils/PageTitle";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import AddTeamForm from "./AddTeamForm";
import { useUser } from "./utils/UserContext";
import Carousel from "./utils/Carousel";
import images from "../data/images.json";
import TeamLogo from "./utils/TeamLogo";
import Admin from "./utils/Admin";

interface GoalScorer {
  player: string;
  goals: number;
}

const TeamTable: React.FC = () => {
  const { user } = useUser();
  const [teams, setTeams] = useState<{ name: string; statistics: any }[]>([]);
  const [goalScorers, setGoalScorers] = useState<GoalScorer[]>([]);
  const [showTable, setShowTable] = useState(true); // State för att hålla reda på vilket läge som ska visas

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchesData = await FirebaseService.getMatches();
        const teamStatisticsMap = new Map<string, any>();
        const allGoalScorers: GoalScorer[] = [];

        // Filtrera bort matcher där isPlayed är false
        const playedMatches = matchesData.filter((match) => match.isPlayed);

        playedMatches.forEach((match) => {
          updateTeamStatistics(
            teamStatisticsMap,
            match.homeTeam,
            match.result.homeScore,
            match.result.awayScore
          );
          updateTeamStatistics(
            teamStatisticsMap,
            match.awayTeam,
            match.result.awayScore,
            match.result.homeScore
          );
          allGoalScorers.push(
            ...match.homeGoalScorers,
            ...match.awayGoalScorers
          );
        });
        //Kombinera ihop målskyttar och räkna upp antal mål
        const combinedGoalScorers: GoalScorer[] = [];
        allGoalScorers.forEach((scorer) => {
          const existingScorerIndex = combinedGoalScorers.findIndex(
            (existingScorer) => existingScorer.player === scorer.player
          );
          if (existingScorerIndex !== -1) {
            combinedGoalScorers[existingScorerIndex].goals += scorer.goals;
          } else {
            combinedGoalScorers.push(scorer);
          }
        });

        setGoalScorers(combinedGoalScorers);

        const teamsData = Array.from(teamStatisticsMap.values());

        const sortedTeams = teamsData.sort(
          (a, b) => b.statistics.points - a.statistics.points
        );

        setTeams(sortedTeams);
      } catch (error) {
        console.error("Fel vid hämtning av matchdata:", error);
      }
    };

    fetchData();
  }, []);

  // Räknar upp poängen för varje lag. Kolla om laget gjort fler mål, mindre mål eller
  // lika många mål som motståndaren, vinster = 1 * 3 oavgjort = 1
  const updateTeamStatistics = (
    teamMap: Map<string, any>,
    teamName: string,
    scoredGoals: number,
    concededGoals: number
  ) => {
    let team = teamMap.get(teamName);
    if (!team) {
      team = {
        name: teamName,
        statistics: {
          playedMatches: 0,
          wins: 0,
          losses: 0,
          draws: 0,
          goalsScored: 0,
          goalsConceded: 0,
          points: 0,
        },
      };
      teamMap.set(teamName, team);
    }
    team.statistics.playedMatches++;
    team.statistics.goalsScored += scoredGoals;
    team.statistics.goalsConceded += concededGoals;
    if (scoredGoals > concededGoals) {
      team.statistics.wins++;
    } else if (scoredGoals < concededGoals) {
      team.statistics.losses++;
    } else {
      team.statistics.draws++;
    }
    team.statistics.points = team.statistics.wins * 3 + team.statistics.draws;
  };

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
          style={{ marginRight: "10px", backgroundColor: "white" }}
          onClick={() => setShowTable(true)}
        >
          Visa tabell
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "white" }}
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
              <TableBody>
                {teams.map((team, index) => (
                  <TableRow key={index}>
                    <TableCell
                      padding="none"
                      style={{ padding: 5, fontWeight: "bold" }}
                    >
                      <Box style={{ display: "flex" }}>
                        <Box style={{ marginRight: "5px" }}>
                          <TeamLogo teamName={team.name} size={50} />
                        </Box>
                        <Box style={{ marginTop: "17px" }}>{team.name}</Box>
                      </Box>
                    </TableCell>
                    <TableCell padding="none">
                      {team.statistics.playedMatches}
                    </TableCell>
                    <TableCell padding="none">{team.statistics.wins}</TableCell>
                    <TableCell padding="none">
                      {team.statistics.losses}
                    </TableCell>
                    <TableCell padding="none">
                      {team.statistics.draws}
                    </TableCell>
                    <TableCell padding="none">
                      {team.statistics.goalsScored}
                    </TableCell>
                    <TableCell padding="none">
                      {team.statistics.goalsConceded}
                    </TableCell>
                    <TableCell padding="none" style={{ fontWeight: "bold" }}>
                      {team.statistics.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ) : (
        <Box>
          <PageTitle title="Skytteliga 23/24" icon={<EqualizerIcon />} />
          <ol>
            {/* Visa top 10 målskyttar */}
            {goalScorers
              .sort((a, b) => b.goals - a.goals)
              .slice(0, 10)
              .map((scorer, index) => (
                <li key={index}>
                  {scorer.player} - {scorer.goals} mål
                </li>
              ))}
          </ol>
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
