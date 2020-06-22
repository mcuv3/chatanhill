import { useState, useEffect } from "react";

let globalState = {};
let listeners = [];
let actions = {};

export const useStore = () => {
  const setState = useState(globalState)[1];
  const dispatch = (action, payload) => {
    actions[action](
      (newState) => {
        globalState = { ...globalState, ...newState };
        for (const lis of listeners) lis(globalState);
      },
      globalState,
      payload
    );
  };

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter((l) => l !== setState);
    };
  }, [setState]);

  return [globalState, dispatch];
};

export const initStore = (actionsReducer, state) => {
  if (state) globalState = { ...globalState, ...state };
  actions = { ...actions, ...actionsReducer };
};
