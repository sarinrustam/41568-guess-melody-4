import React from "react";
import rerender from "react-test-renderer";

import WelcomeScreen from "./welcome-screen.jsx";

it(`Should the WelcomeScreen render correctly`, () => {
  const tree = rerender
    .create(<WelcomeScreen
      errorsCount={12}
      onWelcomeButtonClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

