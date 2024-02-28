import { useEffect, useState } from "react";
import { FirebaseService } from "../../FirebaseService";
import { TableBody, TableRow, TableCell, Box } from "@material-ui/core";
import TeamLogo from "../utils/TeamLogo";

const TeamStandings: React.FC = () => {
  const [teams, setTeams] = useState<{ name: string; statistics: any }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchesData = await FirebaseService.getMatches();
        const teamStatisticsMap = new Map<string, any>();

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
        });

        const teamsData = Array.from(teamStatisticsMap.values());

        const sortedTeams = teamsData.sort((a, b) => {
          // Sortera efter poäng
          if (b.statistics.points !== a.statistics.points) {
            return b.statistics.points - a.statistics.points;
          } else {
            // Om poängen är samma, sortera efter målskillnad
            const goalDifferenceA =
              a.statistics.goalsScored - a.statistics.goalsConceded;
            const goalDifferenceB =
              b.statistics.goalsScored - b.statistics.goalsConceded;
            return goalDifferenceB - goalDifferenceA;
          }
        });

        setTeams(sortedTeams);
      } catch (error) {
        console.error("Fel vid hämtning av matchdata:", error);
      }
    };

    fetchData();
  }, []);

  // Räknar upp poängen för varje lag. Kolla om laget gjort fler mål, mindre mål eller
  // lika många mål som motståndaren, vinster = 1 * 2 oavgjort = 1
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
    team.statistics.points = team.statistics.wins * 2 + team.statistics.draws;
  };

  return (
    <>
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
            <TableCell padding="none">{team.statistics.losses}</TableCell>
            <TableCell padding="none">{team.statistics.draws}</TableCell>
            <TableCell padding="none">{team.statistics.goalsScored}</TableCell>
            <TableCell padding="none">
              {team.statistics.goalsConceded}
            </TableCell>
            <TableCell padding="none" style={{ fontWeight: "bold" }}>
              {team.statistics.points}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};
export default TeamStandings;
