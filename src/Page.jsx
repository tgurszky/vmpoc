import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import { Sidebar } from "./Sidebar";
import { Content } from "./Content";
import Header from "./Header";
import { map, curry } from "ramda";
import produce from "immer";
import { createSelector } from "reselect";

const extendLearningItem = curry((activeId, learningItem) =>
  produce(learningItem, draft => {
    draft.isActive = draft.id === activeId;
  })
);

// const learningItemsSelector = state => map(extendLearningItem(state.activeId), state.learningItems);

const getLearningItems = state => state.learningItems;
const getActiveId = state => state.activeId;

const learningItemsSelector = createSelector(
  [getLearningItems, getActiveId],
  (learningItems, activeId) => map(extendLearningItem(activeId), learningItems)
);

const mapStateToProps = state => ({
  learningItems: learningItemsSelector(state)
});
const mapDispatchToProps = dispatch => ({
  setActive: id => dispatch({ type: "SET_ACTIVE", payload: id }),
  updateScore: id => dispatch({ type: "UPDATE_SCORE", payload: id })
});

const Page = ({ learningItems, setActive, updateScore }) => {
  console.log("Page render");
  return (
    <>
      <Header />
      <Grid container direction="row" justify="center" style={{ marginTop: "50px" }}>
        <Sidebar learningItems={learningItems} setActive={setActive} />
        <Content learningItem={learningItems.find(li => li.isActive)} updateScore={updateScore} />
      </Grid>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
