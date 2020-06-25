import React from "react";
import renderer from "react-test-renderer";
import GameScreen from "./game-screen.jsx";
import {GameType} from "../../const.js";

const child = <section className="Testing"></section>;

describe(`GameScreen render correctly`, () => {
  it(`with GameType.ARTIST type`, () => {
    const tree = renderer.create(
        <GameScreen
          type={GameType.ARTIST}
        >
          {child}
        </GameScreen>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with GameType.GENRE type`, () => {
    const tree = renderer.create(
        <GameScreen
          type={GameType.GENRE}
        >
          {child}
        </GameScreen>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
