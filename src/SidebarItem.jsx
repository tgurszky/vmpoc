import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => ({
  setActive: id => dispatch({ type: "SET_ACTIVE", payload: id })
});

export const SidebarItem = ({ learningItem, setActive }) => {
  console.log("SidebarItem render");
  return (
    <ListItem button selected={learningItem.isActive} onClick={() => setActive(learningItem.id)}>
      <ListItemText>
        {learningItem.name} - {learningItem.score}
      </ListItemText>
    </ListItem>
  );
};

export default connect(null, mapDispatchToProps)(SidebarItem);
