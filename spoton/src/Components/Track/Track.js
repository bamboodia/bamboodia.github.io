import React from "react"
import "./Track.css"

class Track extends React.Component {
	constructor(props) {
		super(props)
		this.addTrack = this.addTrack.bind(this)
		this.removeTrack = this.removeTrack.bind(this)
		this.playTrack = this.playTrack.bind(this)
		this.stopTrack = this.stopTrack.bind(this)
	}

	renderPlay() {
		if (this.props.track.preview === null) {
			return (
				<button className="play-button" onClick={this.stopTrack}>
					<span className="material-icons block">block</span>
				</button>
			)
		} else if (this.props.isPlaying === this.props.track.preview){
			return (
				<button className="play-button" onClick={this.stopTrack}>
					<span className="material-icons stop">stop</span>
				</button>
			)
		}
		else {
			return (
				<button className="play-button" onClick={this.playTrack}>
					<span className="material-icons play">play_arrow</span>
				</button>
			)
		}
	}

	renderAdd() {
		if (this.props.isRemoval) {
			return (
				<button className="Track-action" onClick={this.removeTrack}>
					-
				</button>
			)
		} else {
			return (
				<button className="Track-action" onClick={this.addTrack}>
					+
				</button>
			)
		}
	}

	addTrack() {
		console.log(this.props.track)
		this.props.onAdd(this.props.track)
	}
	removeTrack() {
		this.props.onRemove(this.props.track)
	}
	playTrack() {
		this.props.onPlay(this.props.track.preview)
	}
	stopTrack() {
		this.props.onStop()
	}
	render() {
		return (
			<div>
				<div className="Track">
					<div className="albumArt">
						<img src={this.props.track.img} alt="album art"></img>
					</div>
					<div className="Track-information">
						<h3>{this.props.track.name}</h3>
						<p>
							{this.props.track.artist} | {this.props.track.album}
						</p>
					</div>
					{this.renderPlay()}
					{this.renderAdd()}
				</div>
			</div>
		)
	}
}

export default Track
