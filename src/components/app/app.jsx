import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";

import ArtistQuestionScreen from "../artist-question-screen/artist-question-screen.jsx";
import GenreQuestionScreen from "../genre-question-screen/genre-question-screen.jsx";
import GameScreen from "../game-screen/game-screen.jsx";
import withAudioPlayer from "../hocs/with-audio-player/with-audio-player.js";
import {GameType} from "../../const.js";
import WelcomeScreen from "../welcome-screen/welcome-screen.jsx";

const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };
    this.onWelcomeButtonClick = this.onWelcomeButtonClick.bind(this);
  }

  onWelcomeButtonClick() {
    this.setState({
      step: 0
    });
  }

  renderGameScreen() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={this.onWelcomeButtonClick}
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
              onAnswer={() => {
                this.setState((prevStep) => ({
                  step: prevStep.step + 1,
                }));
              }}
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
              onAnswer={() => {
                this.setState((prevStep) => ({
                  step: prevStep.step + 1,
                }));
              }}
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
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
