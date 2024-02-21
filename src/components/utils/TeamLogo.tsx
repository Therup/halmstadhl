import React from "react";
import vikings from "../../images/logo_vikings.png";
import majestic from "../../images/logo_majestic.png";
import icehawks from "../../images/logo_icehawks.png";
import spartans from "../../images/logo_spartans.png";
import snuskhummers from "../../images/logo_snusk.png";

interface TeamLogoProps {
  teamName: string;
  size: number;
}

const TeamLogo: React.FC<TeamLogoProps> = ({ teamName, size }) => {
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
        console.log("Ingen logga hittad");
        return "X";
    }
  };

  return (
    <img src={getTeamLogo()} alt={teamName} width={size * 1.5} height={size} />
  );
};

export default TeamLogo;
