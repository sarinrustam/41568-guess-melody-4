import React from "react";
import PropTypes from "prop-types";

const ArtistAnswer = (props) => {
  const {answer, index, onChange} = props;

  return (
    <div
      className="artist">
      <input className="artist__input visually-hidden" type="radio" name="answer" value={`answer-${index}`} id={`answer-${index}`}
        onChange={onChange}
      />
      <label className="artist__name" htmlFor={`answer-${index}`}>
        <img className="artist__picture" src={answer.picture} alt={answer.artist}/>
        {answer.artist}
      </label>
    </div>
  );
};

ArtistAnswer.propTypes = {
  answer: PropTypes.shape({
    picture: PropTypes.string.isRequired,
    artist: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ArtistAnswer;
