import React from "react";
import { map, curry } from "ramda";
import produce from "immer";
import { createSelector } from "reselect";
import { connect } from "react-redux";

import List from "@material-ui/core/List";

import SidebarItem from "./SidebarItem";

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

export const Sidebar = ({ learningItems, setActive }) => {
  console.log("Sidebar render");
  return (
    <List>
      {learningItems.map(li => (
        <SidebarItem learningItem={li} key={li.id} />
      ))}
    </List>
  );
};

export default connect(mapStateToProps)(Sidebar);
