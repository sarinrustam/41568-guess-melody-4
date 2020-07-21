import {createSelector} from "reselect";
import NameSpace from "../name-space.js";

const QuestionTypes = {
  ARTIST: `artist`,
  GENRE: `genre`,
};

export const getQuestions = (state) => {
  return state[NameSpace.DATA].questions;
};

const randomFilter = () => {
  return Math.random() > 0.5;
};

export const getArtistQuestions = createSelector(
    getQuestions,
    randomFilter,
    (resultOne, resultTwo) => {
      return resultOne.filter((it) => resultTwo && it.type === QuestionTypes.ARTIST);
    }
);

export const getGenreQuestions = createSelector(
    getQuestions,
    (questions) => {
      return questions.filter((it) => it.type === QuestionTypes.GENRE);
    }
);
