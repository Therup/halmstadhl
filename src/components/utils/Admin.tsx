import React, { useEffect, useState } from "react";
import { FirebaseService } from "../../FirebaseService";
import { useUser } from "./UserContext";
import {
  Box,
  Button,
  TextField,
  Modal,
  useMediaQuery,
} from "@material-ui/core";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Admin: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false); // State för att styra modalens synlighet
  const { user, login, logout } = useUser();
  const isMobile = useMediaQuery("(max-width:775px)");

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
        console.log("Inloggning lyckades! Användaren är admin.");
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

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <Box
      className="mui-theme"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "10px",
        marginTop: "0px",
      }}
    >
      {user ? (
        <Box style={{ display: "flex", marginTop: "10px" }}>
          <ExitToAppIcon />
          <Button
            className="custom-button"
            style={{
              padding: 1,
              color: isMobile ? "#000" : "#f0f0f0",
              fontWeight: isMobile ? "bold" : "default",
            }}
            onClick={handleLogout}
          >
            Logga ut
          </Button>
        </Box>
      ) : (
        <Box style={{ display: "flex", marginTop: "10px" }}>
          <ExitToAppIcon />
          <Button
            className="custom-button"
            style={{
              padding: 1,
              color: isMobile ? "#000" : "#f0f0f0",
              fontWeight: isMobile ? "bold" : "default",
            }}
            onClick={handleOpenModal}
          >
            Login
          </Button>
          <Modal open={openModal} onClose={handleCloseModal}>
            <Box
              style={{
                position: "absolute",
                width: 400,
                backgroundColor: "white",
                border: "2px solid #000",
                boxShadow: "24px",
                padding: "20px",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <TextField
                placeholder="Användarnamn"
                type="text"
                value={userName}
                style={{ maxWidth: "185px" }}
                onChange={(e) => setUserName(e.target.value)}
              />
              <TextField
                placeholder="Lösenord"
                type="password"
                value={password}
                style={{ maxWidth: "185px" }}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                className="custom-button"
                variant="contained"
                style={{ marginTop: "10px", backgroundColor: "white" }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Box>
          </Modal>
        </Box>
      )}
    </Box>
  );
};

export default Admin;
