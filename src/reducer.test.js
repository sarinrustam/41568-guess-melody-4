import {reducer, ActionCreator, ActionType} from "./reducer.js";

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `blues`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `jazz`,
    }, {
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
      genre: `rock`,
    }],
  }, {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    },
    answers: [{
      picture: `https://api.adorable.io/avatars/128/A`,
      artist: `John Snow`,
    }, {
      picture: `https://api.adorable.io/avatars/128/AB`,
      artist: `Jack Daniels`,
    }, {
      picture: `https://api.adorable.io/avatars/128/AC`,
      artist: `Jim Beam`,
    }],
  },
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    step: -1,
    mistakes: 0,
    maxMistakes: 3,
    questions,
  });
});

it(`Reducer should increment current step by a given value`, () => {
  expect(reducer({
    step: -1,
    mistakes: 0,
    questions,
  }, {
    type: ActionType.INCREMENT_STEP
  })).toEqual({
    step: 0,
    mistakes: 0,
    questions,
  });

  expect(reducer({
    step: 0,
    mistakes: 0,
    questions,
  }, {
    type: ActionType.INCREMENT_STEP,
    payload: 0,
  })).toEqual({
    step: 1,
    mistakes: 0,
    questions,
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
});
