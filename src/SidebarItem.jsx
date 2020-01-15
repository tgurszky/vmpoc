import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { find, prop } from "ramda";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const getLearningItem = (state, props) =>
  find(li => li.id === props.learningItemId, state.learningItems);
const getIsActive = (state, props) => state.activeId === props.learningItemId;
const getScore = (state, props) =>
  prop(
    "score",
    find(result => result.learningItemId === props.learningItemId, state.results)
  );

const makeLearningItemSelector = () =>
  createSelector([getLearningItem], learningItem => learningItem);
const makeIsActiveSelector = () => createSelector([getIsActive], isActive => isActive);
const makeScoreSelector = () => createSelector([getScore], score => score);

const makeMapStateToProps = () => {
  const learningItemSelector = makeLearningItemSelector();
  const isActiveSelector = makeIsActiveSelector();
  const scoreSelector = makeScoreSelector();

  const mapStateToProps = (state, props) => ({
    learningItem: learningItemSelector(state, props),
    isActive: isActiveSelector(state, props),
    score: scoreSelector(state, props)
  });

  return mapStateToProps;
};

const mapDispatchToProps = dispatch => ({
  setActive: id => dispatch({ type: "SET_ACTIVE", payload: id })
});

export const SidebarItem = ({ learningItemId, learningItem, isActive, score, setActive }) => {
  console.log("SidebarItem render");
  return (
    <ListItem button selected={isActive} onClick={() => setActive(learningItemId)}>
      <ListItemText>
        {learningItem.name} - {score}
      </ListItemText>
    </ListItem>
  );
};

export default connect(makeMapStateToProps, mapDispatchToProps)(SidebarItem);
