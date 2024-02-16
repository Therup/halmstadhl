import React from "react";
import Avatar from "@mui/material/Avatar";
//import logos from "../data/logo.json"; // Importera logofilerna
import vikings from "../images/logo_vikings.png";
import majestic from "../images/logo_majestic.png";
import icehawks from "../images/logo_icehawks.png";
import spartans from "../images/logo_spartans.png";
import snuskhummers from "../images/logo_snusk.png";
import { Box } from "@material-ui/core";

interface TeamLogoProps {
  teamName: string;
  size: number;
}

const TeamLogo: React.FC<TeamLogoProps> = ({ teamName, size }) => {
  // Funktion för att hämta laglogga baserat på lagets namn
  const getTeamLogo = (): string => {
    switch (teamName.toLowerCase()) {
      case "vikings":
        return vikings;
      case "majestic":
        return majestic;
      case "ice hawks":
        return icehawks;
      case "spartans":
        return spartans;
      case "snuskhummers":
        return snuskhummers;
      default:
        // Om laget inte matchar någon känd logotyp, returnera en fallback-logotyp eller hantera på annat sätt
        return ""; // Till exempel: returnera en standardlogotyp eller en tom sträng för ingen logotyp
    }
  };

  return (
    <img src={getTeamLogo()} alt={teamName} width={size * 1.5} height={size} />
  );
};

export default TeamLogo;
