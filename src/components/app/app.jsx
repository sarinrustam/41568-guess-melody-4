import PropTypes from "prop-types";
import React from "react";
import WelcomeScreen from "@components/welcome-screen/welcome-screen.jsx";

const App = (props) => {

  const {errorsCount} = props;

  return (
    <WelcomeScreen errorsCount={errorsCount} />
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired
};

export default App;
