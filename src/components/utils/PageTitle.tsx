import React from "react";
import { Box, Typography, Icon } from "@material-ui/core";

const PageTitle = (props: { title: string; icon?: React.ReactNode }) => {
  return (
    <Box
      style={{
        marginTop: 15,
        marginBottom: 15,
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <Box style={{ marginRight: 5, marginTop: 4 }}>
        {props.icon && <Icon>{props.icon}</Icon>}
      </Box>
      <Typography variant="h5" style={{ fontWeight: "bold" }}>
        {props.title}
      </Typography>
    </Box>
  );
};

export default PageTitle;
