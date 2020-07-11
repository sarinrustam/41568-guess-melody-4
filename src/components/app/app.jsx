import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";

import GameScreen from "../game-screen/game-screen.jsx";
import withActivePlayer from "../hocs/with-active-player/with-active-player.js";
import withUserAnswer from "../hocs/with-user-answer/with-user-answer.js";

import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";

import {GameType} from "../../const.js";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

const isArtistAnswerCorrect = (question, userAnswer) => {
  return userAnswer.artist === question.song.artist;
};

const isGenreAnswerCorrect = (question, userAnswer) => {
  return userAnswer.every((answer, i) => {
    return answer === (question.answers[i].genre === question.genre);
  });
};

class App extends PureComponent {
  renderGameScreen() {
    const {
      maxMistakes,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step,
    } = this.props;

    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (!question) {
      return null;
    }

    switch (question.type) {
      case GameType.ARTIST:
        return (
          <GameScreen
            type={question.type}>
            <ArtistQuestionScreenWrapped
              question={question}
              onAnswer={onUserAnswer}
            />
          </GameScreen>
        );
      case GameType.GENRE:
        return (
          <GameScreen
            type={question.type}
          >
            <GenreQuestionScreenWrapped
              question={question}
              onAnswer={onUserAnswer}
            />
          </GameScreen>
        );
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderGameScreen()}
          </Route>
          <Route exact path="/artist">
            <ArtistQuestionScreenWrapped
              question={questions[1]}
              onAnswer={() => {}}
            />
          </Route>
          <Route exact path="/genre">
            <GenreQuestionScreenWrapped
              question={questions[0]}
              onAnswer={() => {}}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    let answerIsCorrect = false;

    switch (question.type) {
      case GameType.ARTIST:
        answerIsCorrect = isArtistAnswerCorrect(question, answer);
        break;
      case GameType.GENRE:
        answerIsCorrect = isGenreAnswerCorrect(question, answer);
        break;
    }

    dispatch(ActionCreator.incrementStep());
    if (!answerIsCorrect) {
      dispatch(ActionCreator.incrementMistake());
    }
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
