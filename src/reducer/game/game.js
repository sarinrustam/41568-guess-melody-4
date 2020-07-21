import {extend} from "../../utils/utils.js";

const initialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
  RESET: `RESET`,
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP
  }),
  incrementMistake: () => ({
    type: ActionType.INCREMENT_MISTAKES,
  }),
  resetGame: () => {
    return {
      type: ActionType.RESET,
      payload: null,
    };
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return extend(state, {
        step: state.step + 1,
      });

    case ActionType.INCREMENT_MISTAKES:
      return extend(state, {
        mistakes: state.mistakes + 1,
      });

    case ActionType.RESET:
      return extend(initialState, {
        step: 0,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
