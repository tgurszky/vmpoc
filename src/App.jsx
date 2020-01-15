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
      name: "First assignment"
    },
    {
      id: 2,
      name: "Second assignment"
    },
    {
      id: 3,
      name: "Third assignment"
    }
  ],
  results: [
    {
      learningItemId: 1,
      score: 0
    },
    {
      learningItemId: 2,
      score: 0
    },
    {
      learningItemId: 3,
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
      draft.results.forEach(result => {
        if (result.learningItemId === action.payload) {
          result.score = 100;
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
