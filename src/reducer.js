import {extend} from "./utils/utils.js";
import questions from "../src/mocks/questions.js";

const initialState = {
  mistakes: 0,
  maxMistakes: 3,
  step: -1,
  questions,
};

const ActionType = {
  INCREMENT_MISTAKES: `INCREMENT_MISTAKES`,
  INCREMENT_STEP: `INCREMENT_STEP`,
};

const ActionCreator = {
  incrementStep: () => ({
    type: ActionType.INCREMENT_STEP
  }),
  incrementMistake: () => ({
    type: ActionType.INCREMENT_MISTAKES,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      let nextStep = state.step + 1;

      if (nextStep >= state.questions.length) {
        return extend(initialState);
      }

      return extend(state, {
        step: nextStep,
      });

    case ActionType.INCREMENT_MISTAKES:
      const mistakes = state.mistakes + 1;

      if (mistakes >= state.maxMistakes) {
        return extend(initialState);
      }

      return extend(state, {
        mistakes
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
