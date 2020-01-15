import React from "react";
import Grid from "@material-ui/core/Grid";

import Sidebar from "./Sidebar";
import Content from "./Content";
import Header from "./Header";

const Page = () => {
  console.log("Page render");
  return (
    <>
      <Header />
      <Grid container direction="row" justify="center" style={{ marginTop: "50px" }}>
        <Sidebar />
        <Content />
      </Grid>
    </>
  );
};

export default Page;
