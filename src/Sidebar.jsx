import React from "react";
import { map, prop } from "ramda";
import { createSelector } from "reselect";
import { connect } from "react-redux";

import List from "@material-ui/core/List";

import SidebarItem from "./SidebarItem";

const getLearningItems = state => state.learningItems;

const learningItemIdsSelector = createSelector([getLearningItems], learningItems =>
  map(prop("id"), learningItems)
);

const mapStateToProps = state => ({
  learningItemIds: learningItemIdsSelector(state)
});

export const Sidebar = ({ learningItemIds, setActive }) => {
  console.log("Sidebar render");
  return (
    <List>
      {learningItemIds.map(id => (
        <SidebarItem learningItemId={id} key={id} />
      ))}
    </List>
  );
};

export default connect(mapStateToProps)(Sidebar);
