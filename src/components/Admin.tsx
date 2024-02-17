import React, { useEffect, useState } from "react";
import { FirebaseService } from "../FirebaseService";
import { useUser } from "./utils/UserContext";
import "./theme.css";
import { Box, Button, TextField } from "@material-ui/core";
import PageTitle from "./utils/PageTitle";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Admin: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, logout } = useUser();

  const handleLogin = async () => {
    try {
      const users = await FirebaseService.getUsers();
      const loggedInUser = users.find(
        (u) => u.UserName === userName && u.Password === password
      );

      if (loggedInUser) {
        // Spara användaren i localStorage
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        // Använd useUser-hook för att uppdatera användarinformation globalt
        login(loggedInUser);
        console.log("Inloggning lyckades! Användaren är administratör.");
      } else {
        console.log("Fel användarnamn eller lösenord.");
      }
    } catch (error) {
      console.error("Fel vid inloggning:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
  };

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      // Om det finns en användare sparad i localStorage, logga in användaren
      login(JSON.parse(loggedInUser));
    }
  }, []);
  return (
    <Box
      className="mui-theme"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {user ? (
        <Box></Box>
      ) : (
        <Box>
          <PageTitle title="Logga in" icon={<LockOpenIcon />} />
        </Box>
      )}

      {user ? (
        <Box>
          <p>Inloggad som {user.UserName}</p>
          <Button
            className="custom-button"
            variant="contained"
            style={{ marginTop: "20px", backgroundColor: "white", padding: 5 }}
            onClick={handleLogout}
          >
            Logga ut <ExitToAppIcon style={{ marginLeft: "5px" }} />
          </Button>
        </Box>
      ) : (
        <>
          <TextField
            placeholder="Användarnamn"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            placeholder="Lösenord"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            className="custom-button"
            variant="contained"
            style={{ marginTop: "20px", backgroundColor: "white" }}
            onClick={handleLogin}
          >
            Logga in
          </Button>
        </>
      )}
    </Box>
  );
};

export default Admin;
