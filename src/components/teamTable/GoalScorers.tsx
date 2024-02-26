import { useEffect, useState } from "react";
import { FirebaseService } from "../../FirebaseService";
import PageTitle from "../utils/PageTitle";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import { Box, Card } from "@material-ui/core";

interface GoalScorer {
  player: string;
  goals: number;
}

const GoalScorers: React.FC = () => {
  const [goalScorers, setGoalScorers] = useState<GoalScorer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchesData = await FirebaseService.getMatches();
        const allGoalScorers: GoalScorer[] = [];

        const playedMatches = matchesData.filter((match) => match.isPlayed);

        playedMatches.forEach((match) => {
          allGoalScorers.push(
            ...match.homeGoalScorers,
            ...match.awayGoalScorers
          );
        });

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
      } catch (error) {
        console.error("Fel vid hämtning av matchdata:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Box
        style={{
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <PageTitle title="Skytteliga 23/24" icon={<EqualizerIcon />} />
      </Box>

      <Card style={{ padding: 5, minWidth: "375px" }}>
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
      </Card>
    </Box>
  );
};
export default GoalScorers;
