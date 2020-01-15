import React from "react";
import { Toolbar, AppBar, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  title: state.title
});
const mapDispatchToProps = dispatch => ({
  changeTitle: () => dispatch({ type: "CHANGE_TITLE" })
});

const Header = ({ title, changeTitle }) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
