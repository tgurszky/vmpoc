import React from "react";
import { map, curry } from "ramda";
import produce from "immer";
import { createSelector } from "reselect";
import { connect } from "react-redux";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const extendLearningItem = curry((activeId, learningItem) =>
  produce(learningItem, draft => {
    draft.isActive = draft.id === activeId;
  })
);

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
  setActive: id => dispatch({ type: "SET_ACTIVE", payload: id })
});

export const Sidebar = ({ learningItems, setActive }) => {
  console.log("Sidebar render");
  return (
    <List>
      {learningItems.map(li => (
        <ListItem button key={li.id} selected={li.isActive} onClick={() => setActive(li.id)}>
          <ListItemText>
            {li.name} - {li.score}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
