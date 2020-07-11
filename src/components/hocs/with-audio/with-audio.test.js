import React from "react";
import renderer from "react-test-renderer";
import PropTypes from "prop-types";
import withAudio from "./with-audio.js";

const MockComponent = (props) => {
  const {children} = props;

  return (
    <div>
      {children}
    </div>
  );
};

MockComponent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
};

const MockComponentWrapped = withAudio(MockComponent);

describe(`withAudio tests`, () => {
  it(`withAudio render correctly`, () => {
    const handlerButtonClick = jest.fn();

    const tree = renderer.create((
      <MockComponentWrapped
        isPlaying={false}
        onPlayButtonClick={handlerButtonClick}
        src={`12`}
      />
    ), {
      createNodeMock() {
        return {};
      }
    }).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
