import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Constants from '../../Constants';

/**
 * Displays Slider and BPM value
 * @param {Object} props takes state bpm value
 * @returns Slider and BPM value 
 */
function MySlider(props) {
  return (
    <div>
      <label>{props.bpm} {Constants.bpm}
        <input type={Constants.range} className={Constants.custom_range}
          min={Constants.min} max={Constants.max}
          value={props.bpm}
          onChange={(e) => props.bpmChange(e)}
        />
      </label>
    </div>
  )
}

export default MySlider;
