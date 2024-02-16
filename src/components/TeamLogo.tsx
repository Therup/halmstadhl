import React from "react";
import Avatar from "@mui/material/Avatar";
import logos from "../data/logo.json"; // Importera logofilerna

interface Logo {
  url: string;
  alt: string;
  caption: string;
}

interface TeamLogoProps {
  teamName: string;
}

const TeamLogo: React.FC<TeamLogoProps> = ({ teamName }) => {
  // Funktion för att hämta laglogga baserat på lagets namn
  const getTeamLogo = (): string => {
    const logo: Logo | undefined = logos.find(
      (logo) => logo.caption === teamName
    );
    return logo ? logo.url : ""; // Returnera loggans URL, om laget finns i logofilen
  };

  return (
    <Avatar
      sx={{ width: "78px", height: "50px" }}
      src={getTeamLogo()}
      alt={teamName}
      variant="square"
    />
  );
};

export default TeamLogo;
