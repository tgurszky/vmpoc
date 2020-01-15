import React from "react";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";

import { Sidebar } from "./Sidebar";
import { Content } from "./Content";
import { Header } from "./Header";
import { map, curry } from "ramda";
import produce from "immer";

const extendLearningItem = curry((activeId, learningItem) =>
  produce(learningItem, draft => {
    draft.isActive = draft.id === activeId;
  })
);
const learningItemsSelector = state => map(extendLearningItem(state.activeId), state.learningItems);

const mapStateToProps = state => ({
  learningItems: learningItemsSelector(state),
  title: state.title
});
const mapDispatchToProps = dispatch => ({
  setActive: id => dispatch({ type: "SET_ACTIVE", payload: id }),
  changeTitle: () => dispatch({ type: "CHANGE_TITLE" }),
  updateScore: id => dispatch({ type: "UPDATE_SCORE", payload: id })
});

const Page = ({ learningItems, title, setActive, changeTitle, updateScore }) => {
  console.log("Page render");
  return (
    <>
      <Header title={title} changeTitle={changeTitle} />
      <Grid container direction="row" justify="center" style={{ marginTop: "50px" }}>
        <Sidebar learningItems={learningItems} setActive={setActive} />
        <Content learningItem={learningItems.find(li => li.isActive)} updateScore={updateScore} />
      </Grid>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Page);
