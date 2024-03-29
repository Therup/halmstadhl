import React from "react";
import { AppBar, IconButton, Tab, Tabs } from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import Admin from "../utils/Admin";
import EqualizerIcon from "@mui/icons-material/Equalizer";

interface AppBarProps {
  isMobile: boolean;
  value: number;
  handleChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
  handleDrawerToggle: () => void;
}

const AppBarComponent: React.FC<AppBarProps> = ({
  isMobile,
  value,
  handleChange,
  handleDrawerToggle,
}) => {
  return (
    <AppBar
      position="static"
      className="scrollable-tabs-container"
      style={{
        backgroundColor: "rgb(0, 44, 81)",
        borderBottom: "2px solid",
      }}
    >
      {!isMobile && (
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="auto"
          centered
          style={{ color: "white" }}
        >
          <Tab style={{ display: "inline-block" }} label="Tabell" />
          <Tab style={{ display: "inline-block" }} label="Kalender" />
          <Tab style={{ display: "inline-block" }} label="Matcher" />
          <Tab style={{ display: "inline-block" }} label="Lagen" />
          <Tab style={{ display: "inline-block" }} label="Kontakt" />
          <Admin />
        </Tabs>
      )}
      {isMobile && (
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          style={{ justifyContent: "start" }}
        >
          <MenuIcon style={{ marginLeft: "10px" }} />
        </IconButton>
      )}
    </AppBar>
  );
};

export default AppBarComponent;
