import { Box } from "@material-ui/core";
import React from "react";
import header from "../../images/topbanner.jpg";

const Header = () => {
  return (
    <Box style={{ marginBottom: -4 }}>
      <img
        style={{ width: "100%" }}
        src={header}
        alt="Halmstad amatör hockey"
      />
    </Box>
  );
};

export default Header;
