import React from "react";
import renderer from "react-test-renderer";
import {Router} from "react-router-dom";
import history from "../../history.js";

import GameOverScreen from "./game-over-screen.jsx";

describe(`GameOverScreen render correctly`, () => {
  it(`Should GOS render correctly`, () => {
    const handler = jest.fn();
    const tree = renderer.create(
        <Router
          history={history}
        >
          <GameOverScreen
            onReplayButtonClick={handler}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
