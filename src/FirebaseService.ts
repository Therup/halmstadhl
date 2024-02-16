import {
  collection,
  deleteDoc,
  getDocs,
  orderBy,
  query,
  doc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { firestore } from "./Firebase";

export interface User {
  UserName: string;
  Password: string;
  isAdmin: boolean;
}

export interface Team {
  name: string;
}

export interface Match {
  id: string;
  awayTeam: string;
  homeTeam: string;
  date: Timestamp;
  result: {
    awayScore: number;
    homeScore: number;
  };
}

interface FirebaseService {
  getTeams(): Promise<Team[]>;
  getMatches(): Promise<Match[]>;
  getUsers(): Promise<User[]>;
  deleteMatch(matchId: string): Promise<void>;
  addTeam(team: Team): Promise<void>;
}
// eslint-disable-next-line
export const FirebaseService: FirebaseService = {
  async getTeams() {
    try {
      const teamsCollection = collection(firestore, "Teams2");
      const teamsSnapshot = await getDocs(teamsCollection);

      const teamsData: Team[] = [];

      teamsSnapshot.forEach((doc) => {
        const data = doc.data();
        const team: Team = {
          name: data.name || "",
        };
        teamsData.push(team);
      });

      return teamsData;
    } catch (error) {
      console.error("Fel vid hämtning av lagdata:", error);
      throw error;
    }
  },

  async getMatches() {
    try {
      const matchesCollection = collection(firestore, "matches2");
      const matchesQuery = query(matchesCollection, orderBy("date", "desc"));
      const matchesSnapshot = await getDocs(matchesQuery);

      const matchesData: Match[] = [];

      matchesSnapshot.forEach((doc) => {
        const data = doc.data();
        const match: Match = {
          id: doc.id, // Lägg till dokumentets ID här
          awayTeam: data.awayTeam || "",
          homeTeam: data.homeTeam || "",
          date: data.date || null,
          result: {
            awayScore: data.result?.awayScore || 0,
            homeScore: data.result?.homeScore || 0,
          },
        };
        matchesData.push(match);
      });

      return matchesData;
    } catch (error) {
      console.error("Fel vid hämtning av matchdata:", error);
      throw error;
    }
  },

  async getUsers() {
    try {
      const usersCollection = collection(firestore, "User");
      const usersSnapshot = await getDocs(usersCollection);

      const usersData: User[] = [];

      usersSnapshot.forEach((doc) => {
        const data = doc.data();
        const user: User = {
          UserName: data.UserName || "",
          Password: data.Password || "",
          isAdmin: data.IsAdmin || "",
        };
        usersData.push(user);
      });

      return usersData;
    } catch (error) {
      console.error("Fel vid hämtning av användardata:", error);
      throw error;
    }
  },
  async deleteMatch(matchId: string) {
    try {
      const matchDocRef = doc(firestore, "matches2", matchId);
      await deleteDoc(matchDocRef);
      console.log("Match successfully deleted from Firestore.");
    } catch (error) {
      console.error("Error deleting match from Firestore:", error);
      throw error;
    }
  },
  async addTeam(team: Team) {
    try {
      const teamsCollection = collection(firestore, "Teams2");
      await addDoc(teamsCollection, team); // Add the team to Firestore
      console.log("Team successfully added to Firestore.");
    } catch (error) {
      console.error("Error adding team to Firestore:", error);
      throw error;
    }
  },
};
