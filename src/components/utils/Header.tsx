import { Box } from "@material-ui/core";
import React from "react";

const Header = () => {
  return (
    <Box style={{ marginBottom: -4 }}>
      <img
        style={{ width: "100%" }}
        src="images\topbanner.jpg"
        alt="Halmstad amatör hockey"
      />
    </Box>
  );
};

export default Header;
