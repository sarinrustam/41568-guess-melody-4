import React from "react";
import renderer from "react-test-renderer";

import GameOverScreen from "./game-over-screen.jsx";

describe(`GameOverScreen render correctly`, () => {
  it(`Should GOS render correctly`, () => {
    const handler = jest.fn();
    const tree = renderer.create(
        <GameOverScreen
          onReplayButtonClick={handler}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
