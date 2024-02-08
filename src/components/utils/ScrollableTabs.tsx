import React from "react";
import {
  AppBar,
  Box,
  Container,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import TeamTable from "../teamTable";
import Matches from "../MatchList";
import Admin from "../Admin";
import RandomStringGenerator from "../RandomStringGenerator";
import PageBox from "./PageBox";

interface Props {}

const ScrollableTabs: React.FC<Props> = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar
        position="static"
        className="scrollable-tabs-container"
        style={{
          backgroundColor: "rgb(0, 44, 81)",
          borderBottom: "2px solid",
        }}
      >
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            style={{ textAlign: "center" }}
          >
            <Tab style={{ display: "inline-block" }} label="Tabell" />
            <Tab style={{ display: "inline-block" }} label="Kalender" />
            <Tab style={{ display: "inline-block" }} label="Spelade matcher" />
            <Tab style={{ display: "inline-block" }} label="Admin" />
            <Tab
              style={{ display: "inline-block" }}
              label="Nils Larsen throphy"
            />
            <Tab style={{ display: "inline-block" }} label="Kontakt" />
          </Tabs>
        </Box>
      </AppBar>

      <Container
        style={{
          backgroundColor: "#f0f0f0",
          minHeight: "100vh",
          minWidth: "100%",
        }}
      >
        <Box>
          {value === 0 && <TeamTable />}
          {value === 1 && <div>Content for Kalender</div>}
          {value === 2 && <Matches />}
          {value === 3 && <Admin />}
          {value === 4 && <RandomStringGenerator />}
        </Box>
      </Container>
    </div>
  );
};

export default ScrollableTabs;
