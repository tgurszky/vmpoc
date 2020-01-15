import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
