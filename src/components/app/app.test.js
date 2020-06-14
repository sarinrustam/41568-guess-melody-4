import React from "react";
import rerender from "react-test-renderer";

import App from "./app.jsx";

it(`Should App render correctly`, () => {
  const tree = rerender
    .create(<App
      errorsCount={5}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
