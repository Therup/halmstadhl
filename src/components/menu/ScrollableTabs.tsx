import React, { useState } from "react";
import { useMediaQuery } from "@material-ui/core";
import AppBarComponent from "./AppBarComponent";
import DrawerComponent from "./DrawerComponents";
import ContentComponent from "./ContentComponent";

const ScrollableTabs: React.FC = () => {
  const [value, setValue] = useState<number>(0);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const isMobile = useMediaQuery("(max-width:775px)");

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <div>
      <AppBarComponent
        isMobile={isMobile}
        value={value}
        handleChange={handleTabChange}
        handleDrawerToggle={handleDrawerToggle}
      />
      <DrawerComponent
        value={value}
        onClose={handleDrawerClose}
        handleChangeTab={handleTabChange}
        mobileOpen={mobileOpen}
      />
      <ContentComponent value={value} />
    </div>
  );
};

export default ScrollableTabs;
