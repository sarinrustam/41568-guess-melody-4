import React from "react";
import PropTypes from "prop-types";

const Mistakes = (props) => {
  const {count} = props;

  const mistakes = [];

  for (let i = 0; i < count; i++) {
    mistakes.push(<div key={i} className="wrong" />);
  }

  return (
    <div className="game__mistakes">
      {mistakes}
    </div>
  );
};

Mistakes.propTypes = {
  count: PropTypes.number.isRequired,
};

export default Mistakes;
