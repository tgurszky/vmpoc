import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Page from "./Page";
import produce from "immer";

const defaultState = {
  title: "Re-render tester",
  activeId: -1,
  learningItems: [
    {
      id: 1,
      name: "First assignment",
      score: 0
    },
    {
      id: 2,
      name: "Second assignment",
      score: 0
    },
    {
      id: 3,
      name: "Third assignment",
      score: 0
    }
  ]
};

const reducer = produce((draft, action) => {
  switch (action.type) {
    case "SET_ACTIVE":
      draft.activeId = action.payload;
      break;
    case "CHANGE_TITLE":
      draft.title = "New title";
      break;
    case "UPDATE_SCORE":
      draft.learningItems.forEach(li => {
        if (li.id === action.payload) {
          li.score = 100;
        }
      });
      break;
    default:
      break;
  }
});

const store = createStore(
  reducer,
  defaultState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  console.log("App render");
  return (
    <Provider store={store}>
      <Page />
    </Provider>
  );
}

export default App;
