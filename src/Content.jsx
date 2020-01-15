import React from "react";
import { Paper, Button, Typography } from "@material-ui/core";

export const Content = ({ learningItem = {}, updateScore }) => {
  console.log("Content render");
  return (
    <Paper
      style={{
        width: "200px",
        height: "200px",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
    >
      <Typography>
        Id: {learningItem.id}
        <br />
        Name: {learningItem.name}
      </Typography>
      <Button
        color="primary"
        onClick={() => updateScore(learningItem.id)}
        disabled={!learningItem.id}
      >
        Complete
      </Button>
    </Paper>
  );
};
