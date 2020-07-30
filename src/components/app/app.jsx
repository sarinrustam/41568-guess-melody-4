import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/game/game.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import AuthScreen from "../auth-screen/auth-screen.jsx";

import GameScreen from "../game-screen/game-screen.jsx";
import withActivePlayer from "../hocs/with-active-player/with-active-player.js";
import withUserAnswer from "../hocs/with-user-answer/with-user-answer.js";

import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import GameOverScreen from "../game-over-screen/game-over-screen.jsx";
import WinScreen from "../win-screen/win-screen.jsx";
import PrivateRoute from "../private-route/private-route.jsx";

import {GameType} from "../../const.js";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

import {getStep, getMistakes, getMaxMistakes} from "../../reducer/game/selectors.js";
import {getQuestions} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus} from "../../reducer/user/selectors.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

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
      mistakes,
      questions,
      onUserAnswer,
      authorizationStatus,
      onWelcomeButtonClick,
      step,
    } = this.props;

    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return history.push(AppRoute.LOSE);
    }

    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.AUTH) {
        return history.push(AppRoute.RESULT);
      } else if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return history.push(AppRoute.LOGIN);
      }

      return null;
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
    const {questions, login, mistakes, resetGame} = this.props;

    return (
      <Router
        history={history}
      >
        <Switch>
          <Route exact path={AppRoute.ROOT}>
            {this.renderGameScreen()}
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            <AuthScreen
              onSubmit={login}
              onReplayButtonClick={() => {}}
            />
          </Route>
          <Route exact path={AppRoute.LOSE}>
            <GameOverScreen
              onReplayButtonClick={resetGame}
            />
          </Route>
          <PrivateRoute
            exact
            path={AppRoute.RESULT}
            render={() => {
              return (
                <WinScreen
                  questionsCount={questions.length}
                  mistakesCount={mistakes}
                  onReplayButtonClick={resetGame}
                />
              );
            }}
          >

          </PrivateRoute>
          {/* <Route exact path="/artist">
            <ArtistQuestionScreenWrapped
              question={questions[1]}
              onAnswer={() => {}}
            />
          </Route> */}
          {/* <Route exact path="/genre">
            <GenreQuestionScreenWrapped
              question={questions[0]}
              onAnswer={() => {}}
            />
          </Route> */}
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  resetGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  maxMistakes: getMaxMistakes(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
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
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
