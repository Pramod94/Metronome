import React, { Component } from 'react';
import MySlider from './Components/Slider/Slider';
import Button from '@material-ui/core/Button';
import Constants from './Constants';
import click1 from './Audio/click1.wav';
import click2 from './Audio/click2.wav';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: Constants.default,
      playing: false,
      count: Constants.count,
      beatsPerMeasure: Constants.beatsPerMeasure
    }
    this.click1 = new Audio(click1);
    this.click2 = new Audio(click2);
  }

  /**
   * Handles BPM Change
   * @param {Object} e takes changing range value
   * @returns sets the bpm state OR clears the interval & counter
   * and sets new bpm state while playing
   */
  handleBpmChange = (e) => {
    let bpm = e.target.value;
    //clear the interval and sets a new one
    if (this.state.playing) {
      clearInterval(this.id);
      this.id = setInterval(this.playClick, (60 / bpm) * 1000);
      //Reset the counter and updates the new bpm
      this.setState({
        count: 0,
        bpm
      })
    } else { this.setState({ bpm }) }
  }

  /**
   * Handles the start and stop event based on state playing
   */
  handleClick = () => {
    if (this.state.playing) {
      //Stops the timer
      clearInterval(this.id);
      this.setState({ playing: false })
    } else {
      this.id = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
      //callback function playclick, plays the sound immediately after clicking
      this.setState({ playing: true }, this.playClick);
    }
  }

  /**
   * Plays the click sound based on the count and beatsPerMeasure state
   */
  playClick = () => {
    const { count, beatsPerMeasure } = this.state;

    if (count % beatsPerMeasure === 0) {
      this.click2.play();
    } else {
      this.click1.play();
    }

    this.setState(state => ({
      count: (state.count + 1) % state.beatsPerMeasure
    }))
  };

  render() {
    const { bpm, playing } = this.state;
    return (
      <div>
        <MySlider bpm={bpm} bpmChange={this.handleBpmChange} />
        <Button
          variant="contained" color="primary"
          onClick={this.handleClick}
        >
          {playing ? 'Stop' : 'Start'}
        </Button>
      </div>
    );
  }
}

export default App;
