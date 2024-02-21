import React from "react";
import { Box, Drawer, Tab, Tabs } from "@material-ui/core";
import CalendarMonth from "@mui/icons-material/CalendarMonth";
import SportsHockeyIcon from "@mui/icons-material/SportsHockey";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import EqualizerIcon from "@mui/icons-material/Equalizer";

interface DrawerProps {
  value: number;
  handleChangeTab: (event: React.ChangeEvent<{}>, newValue: number) => void;
  mobileOpen: boolean;

  onClose: () => void;
}

const DrawerComponent: React.FC<DrawerProps> = ({
  value,
  handleChangeTab,
  mobileOpen,
  onClose,
}) => {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={mobileOpen}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
    >
      <div>
        <Tabs
          value={value}
          onChange={handleChangeTab}
          scrollButtons="auto"
          indicatorColor="primary"
          orientation="vertical"
          variant="scrollable"
          style={{ paddingLeft: 0 }}
        >
          <Tab
            label={
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <Box style={{ marginTop: "5px" }}>
                  <EqualizerIcon />
                </Box>
                <Box style={{ marginLeft: "5px" }}>Tabell</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <Box style={{ marginTop: "5px" }}>
                  <CalendarMonth />
                </Box>
                <Box style={{ marginLeft: "5px" }}>Kalender</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <Box style={{ marginTop: "5px" }}>
                  <SportsHockeyIcon />
                </Box>
                <Box style={{ marginLeft: "5px" }}>Matcher</Box>
              </Box>
            }
          />

          <Tab
            label={
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <Box style={{ marginTop: "5px" }}>
                  <EmojiEventsIcon />
                </Box>
                <Box style={{ marginLeft: "5px" }}>Lagen</Box>
              </Box>
            }
          />
          <Tab
            label={
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: "bold",
                }}
              >
                <Box style={{ marginTop: "5px" }}>
                  <MailOutlineIcon />
                </Box>
                <Box style={{ marginLeft: "5px" }}>Kontakt</Box>
              </Box>
            }
          />
        </Tabs>
      </div>
    </Drawer>
  );
};

export default DrawerComponent;
