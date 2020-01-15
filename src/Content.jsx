import React from "react";
import { find } from "ramda";
import { createSelector } from "reselect";
import { connect } from "react-redux";

import { Paper, Button, Typography } from "@material-ui/core";

const getLearningItems = state => state.learningItems;
const getActiveId = state => state.activeId;

const learningItemSelector = createSelector(
  [getLearningItems, getActiveId],
  (learningItems, activeId) => find(li => li.id === activeId, learningItems)
);

const mapStateToProps = state => ({
  learningItem: learningItemSelector(state)
});
const mapDispatchToProps = dispatch => ({
  updateScore: id => dispatch({ type: "UPDATE_SCORE", payload: id })
});

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

export default connect(mapStateToProps, mapDispatchToProps)(Content);
