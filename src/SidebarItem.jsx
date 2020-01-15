import React from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { find, curry } from "ramda";
import produce from "immer";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const extendLearningItem = curry((activeId, learningItem) =>
  produce(learningItem, draft => {
    draft.isActive = draft.id === activeId;
  })
);

const getLearningItem = (state, props) =>
  find(li => li.id === props.learningItemId, state.learningItems);
const getActiveId = state => state.activeId;

const learningItemSelector = createSelector(
  [getLearningItem, getActiveId],
  (learningItem, activeId) => extendLearningItem(activeId, learningItem)
);

const mapStateToProps = (state, props) => ({
  learningItem: learningItemSelector(state, props)
});

const mapDispatchToProps = dispatch => ({
  setActive: id => dispatch({ type: "SET_ACTIVE", payload: id })
});

export const SidebarItem = ({ learningItemId, learningItem, setActive }) => {
  console.log("SidebarItem render");
  return (
    <ListItem button selected={learningItem.isActive} onClick={() => setActive(learningItemId)}>
      <ListItemText>
        {learningItem.name} - {learningItem.score}
      </ListItemText>
    </ListItem>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarItem);
