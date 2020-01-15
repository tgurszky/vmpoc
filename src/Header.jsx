import React from "react";
import { Toolbar, AppBar, Typography, Button } from "@material-ui/core";

export const Header = ({ title, changeTitle }) => {
  console.log("Header render");
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Button color="inherit" onClick={changeTitle}>
          Change title
        </Button>
      </Toolbar>
    </AppBar>
  );
};
