import React from "react"
import "./Volume.css"

class Volume extends React.Component {
	renderAction() {
        let audioVolume = this.props.volumeVal * 100;
		if (audioVolume >= 0 && audioVolume < 33) {
			return <span id="speaker1" className="material-icons-outlined">volume_mute</span>
		} else if (audioVolume >= 33 && audioVolume <= 66) {
			return <span id="speaker2" className="material-icons-outlined">volume_down</span>
		} else if (audioVolume > 66) {
			return <span id="speaker3" className="material-icons-outlined">volume_up</span>
		}
	}
	render() {
		return (
			<div className="volume-slider">
				{this.renderAction()}
				<input type="range" min="0" max="1" value={this.props.volumeVal} onChange={this.props.handleVolume} step="0.01" />
			</div>
		)
	}
}

export default Volume
