import React from "react";
import renderer from "react-test-renderer";
import {GameScreen} from "./game-screen.jsx";
import {GameType} from "../../const.js";
import {Router} from "react-router-dom";
import history from "../../history.js";

const child = <section className="Testing"></section>;
const noop = () => {};

describe(`GameScreen render correctly`, () => {
  it(`with GameType.ARTIST type`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <GameScreen
            type={GameType.ARTIST}
            mistakes={3}
          >
            {child}
          </GameScreen>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with GameType.GENRE type`, () => {
    const tree = renderer.create(
        <Router
          history={history}
        >
          <GameScreen
            type={GameType.GENRE}
            mistakes={3}
            goToWelcome={noop}
          >
            {child}
          </GameScreen>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
