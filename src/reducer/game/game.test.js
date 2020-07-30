import {reducer, ActionCreator, ActionType} from "./game.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    step: -1,
    mistakes: 0,
    maxMistakes: 3,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_STEP
  })).toEqual({
    step: 0,
    mistakes: 0,
  });

  expect(reducer({
    step: 0,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 0,
  })).toEqual({
    step: 1,
    mistakes: 0,
  });
});

it(`Reducer should increment number of mistakes by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.INCREMENT_MISTAKES
  })).toEqual({
    step: -1,
    mistakes: 1,
  });

  expect(reducer({
    step: -1,
    mistakes: 1,
  }, {
    type: ActionType.INCREMENT_MISTAKES,
  })).toEqual({
    step: -1,
    mistakes: 2,
  });
});

it(`Reducer should return default`, () => {
  expect(reducer({
    step: 5,
    mistakes: 1,
  }, {
    type: ActionType.RESET,
    payload: null,
  })).toEqual({
    step: 0,
    mistakes: 0,
    maxMistakes: 3,
  });

  expect(reducer({
    step: 0,
    mistakes: 0,
  }, {
    type: ActionType.RESET,
    payload: null,
  })).toEqual({
    step: 0,
    mistakes: 0,
    maxMistakes: 3,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.RESET,
    payload: null,
  })).toEqual({
    step: 0,
    mistakes: 0,
    maxMistakes: 3,
  });
});

it(`Reducer should return step -1`, () => {
  expect(reducer({
    step: 5,
    mistakes: 1,
  }, {
    type: ActionType.GO_TO_WELCOME,
    payload: null,
  })).toEqual({
    step: -1,
    mistakes: 0,
    maxMistakes: 3,
  });

  expect(reducer({
    step: 0,
    mistakes: 0,
  }, {
    type: ActionType.GO_TO_WELCOME,
    payload: null,
  })).toEqual({
    step: -1,
    mistakes: 0,
    maxMistakes: 3,
  });

  expect(reducer({
    step: -1,
    mistakes: 0,
  }, {
    type: ActionType.GO_TO_WELCOME,
    payload: null,
  })).toEqual({
    step: -1,
    mistakes: 0,
    maxMistakes: 3,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for incrementing step returns correct action`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: ActionType.INCREMENT_STEP
    });
  });

  it(`Action creator for incrementing mistake returns correct action`, () => {
    expect(ActionCreator.incrementMistake()).toEqual({
      type: ActionType.INCREMENT_MISTAKES
    });
  });

  it(`Action creator for reset game returns action with null payload`, () => {
    expect(ActionCreator.resetGame())
      .toEqual({
        type: ActionType.RESET,
        payload: null,
      });
  });

  it(`Action creator for go to welcome returns action with null payload`, () => {
    expect(ActionCreator.goToWelcome())
      .toEqual({
        type: ActionType.GO_TO_WELCOME,
        payload: null,
      });
  });
});
