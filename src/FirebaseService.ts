import {
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  doc,
  addDoc,
  Timestamp,
  updateDoc,
  getDoc,
  where,
} from "firebase/firestore";
import { firestore } from "./Firebase";

export interface User {
  UserName: string;
  Password: string;
  isAdmin: boolean;
}

export interface Team {
  info: string;
  name: string;
  players: string[];
}

export interface Match {
  id: string;
  awayTeam: string;
  homeTeam: string;
  date: Timestamp;
  isPlayed: boolean;
  result: {
    awayScore: number;
    homeScore: number;
  };
  homeGoalScorers: {
    player: string;
    goals: number;
  }[];
  awayGoalScorers: {
    player: string;
    goals: number;
  }[];
}

interface FirebaseService {
  updateTeamPlayers(selectedTeam: string, arg1: string[]): unknown;
  getTeams(): Promise<Team[]>;
  getMatches(): Promise<Match[]>;
  getUsers(): Promise<User[]>;
  deleteMatch(matchId: string): Promise<void>;
  addTeam(team: Team): Promise<void>;
  addMatch(match: Match): Promise<void>;
  updateMatch(matchId: string, updatedMatchData: Partial<Match>): Promise<void>;
  addGoalScorer(
    matchId: string,
    team: "home" | "away",
    goalScorer: { player: string; goals: number }
  ): Promise<void>;
}

// Implementering av FirebaseService-gränssnittet
export const FirebaseService: FirebaseService = {
  async getTeams() {
    try {
      // Hämta lagkollektionen från Firestore
      const teamsCollection = collection(firestore, "Teams2");
      // Hämta lagdata från kollektionen
      const teamsSnapshot = await getDocs(teamsCollection);

      const teamsData: Team[] = [];

      // Loopa igenom varje lagdokument och hämta laginformationen
      teamsSnapshot.forEach((doc) => {
        const data = doc.data();
        const team: Team = {
          name: data.name || "",
          info: data.info || "",
          players: data.players || [""],
        };
        teamsData.push(team);
      });

      return teamsData;
    } catch (error) {
      console.error("Error fetching team data:", error);
      throw error;
    }
  },

  // Funktion för att hämta matchdata från Firestore
  async getMatches() {
    try {
      // Hämta matchkollektionen från Firestore
      const matchesCollection = collection(firestore, "matches2");
      // Skapa en fråga för att hämta matcherna i fallande ordning efter datum
      const matchesQuery = query(matchesCollection, orderBy("date", "desc"));
      // Hämta matchdata baserat på frågan
      const matchesSnapshot = await getDocs(matchesQuery);

      const matchesData: Match[] = [];

      // Loopa igenom varje matchdokument och hämta matchinformationen
      matchesSnapshot.forEach((doc) => {
        const data = doc.data();
        const match: Match = {
          id: doc.id,
          awayTeam: data.awayTeam || "",
          homeTeam: data.homeTeam || "",
          date: data.date || null,
          isPlayed: data.isPlayed || false,
          result: {
            awayScore: data.result?.awayScore || 0,
            homeScore: data.result?.homeScore || 0,
          },
          homeGoalScorers: data.homeGoalScorers || [],
          awayGoalScorers: data.awayGoalScorers || [],
        };
        matchesData.push(match);
      });

      return matchesData;
    } catch (error) {
      console.error("Error fetching match data:", error);
      throw error;
    }
  },

  // Funktion för att hämta användardata från Firestore
  async getUsers() {
    try {
      // Hämta användarkollektionen från Firestore
      const usersCollection = collection(firestore, "User");
      // Hämta användardata från kollektionen
      const usersSnapshot = await getDocs(usersCollection);

      const usersData: User[] = [];

      // Loopa igenom varje användardokument och hämta användarinformationen
      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        const user: User = {
          UserName: data.UserName || "",
          Password: data.Password || "",
          isAdmin: data.IsAdmin || false,
        };
        usersData.push(user);
      });

      return usersData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw error;
    }
  },

  // Funktion för att ta bort en match från Firestore
  async deleteMatch(matchId: string) {
    try {
      // Skapa en referens till matchdokumentet i Firestore
      const matchDocRef = doc(firestore, "matches2", matchId);
      // Ta bort matchdokumentet från Firestore
      await deleteDoc(matchDocRef);
      console.log("Match successfully deleted from Firestore.");
    } catch (error) {
      console.error("Error deleting match from Firestore:", error);
      throw error;
    }
  },

  // Funktion för att lägga till ett lag i Firestore
  async addTeam(team: Team) {
    try {
      // Hämta lagkollektionen från Firestore
      const teamsCollection = collection(firestore, "Teams2");
      // Lägg till laget i lagkollektionen
      await addDoc(teamsCollection, team);
      console.log("Team successfully added to Firestore.");
    } catch (error) {
      console.error("Error adding team to Firestore:", error);
      throw error;
    }
  },

  // Funktion för att lägga till en match i Firestore
  async addMatch(match: Match) {
    try {
      // Hämta matchkollektionen från Firestore
      const matchesCollection = collection(firestore, "matches2");
      // Lägg till matchen i matchkollektionen
      await addDoc(matchesCollection, match);
      console.log("Match successfully added to Firestore.");
    } catch (error) {
      console.error("Error adding match to Firestore:", error);
      throw error;
    }
  },

  // Funktion för att uppdatera en match i Firestore
  async updateMatch(
    matchId: string,
    updatedMatchData: Partial<Match>
  ): Promise<void> {
    try {
      // Skapa en referens till matchdokumentet i Firestore
      const matchDocRef = doc(firestore, "matches2", matchId);
      // Uppdatera matchdokumentet med den nya matchinformationen
      await updateDoc(matchDocRef, updatedMatchData);
      console.log("Match successfully updated in Firestore.");
    } catch (error) {
      console.error("Error updating match in Firestore:", error);
      throw error;
    }
  },

  // Funktion för att uppdatera spelare för ett lag i Firestore. Tack för att AI kunde lösa denna åt mig
  async updateTeamPlayers(
    teamName: string,
    updatedPlayers: string[]
  ): Promise<void> {
    try {
      // Hämta lagkollektionen från Firestore
      const teamsCollection = collection(firestore, "Teams2");
      // Skapa en fråga för att hitta laget med det angivna namnet
      const querySnapshot = await getDocs(
        query(teamsCollection, where("name", "==", teamName))
      );

      if (!querySnapshot.empty) {
        // Om laget hittas, uppdatera spelarlistan för laget
        const teamDocRef = querySnapshot.docs[0].ref;
        await updateDoc(teamDocRef, { players: updatedPlayers });
        console.log("Team players successfully updated in Firestore.");
      } else {
        console.error("Team document not found in Firestore.");
      }
    } catch (error) {
      console.error("Error updating team players in Firestore:", error);
      throw error;
    }
  },

  // Funktion för att lägga till en målskytt i en match i Firestore. Tack för att AI kunde lösa denna åt mig
  async addGoalScorer(
    matchId: string,
    team: "home" | "away",
    goalScorer: { player: string; goals: number }
  ): Promise<void> {
    try {
      // Skapa en referens till matchdokumentet i Firestore
      const matchDocRef = doc(firestore, "matches2", matchId);
      // Hämta matchdokumentet från Firestore
      const matchDocSnapshot = await getDoc(matchDocRef);
      if (matchDocSnapshot.exists()) {
        // Om matchen finns, uppdatera listan över målskyttar för det valda laget
        const matchData = matchDocSnapshot.data() as Match;
        let updatedGoalScorers;
        if (team === "home") {
          updatedGoalScorers = [...matchData.homeGoalScorers, goalScorer];
        } else {
          updatedGoalScorers = [...matchData.awayGoalScorers, goalScorer];
        }
        // Uppdatera matchdokumentet med den nya listan över målskyttar
        await updateDoc(matchDocRef, {
          [team === "home" ? "homeGoalScorers" : "awayGoalScorers"]:
            updatedGoalScorers,
        });
        console.log(
          "Goal scorer successfully added to the match in Firestore."
        );
      } else {
        console.error("Match not found in Firestore.");
      }
    } catch (error) {
      console.error(
        "Error adding goal scorer to the match in Firestore:",
        error
      );
      throw error;
    }
  },
};
