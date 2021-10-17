import React from "react"
import "./SearchResults.css"
import Tracklist from "../Tracklist/Tracklist"

class SearchResults extends React.Component {
	render() {
		return (
			<div className="SearchResults">
				<h2>Results</h2>
				<Tracklist 
				tracks={this.props.searchResults} 
				onAdd={this.props.onAdd} 
				isRemoval={false}
				onPlay={this.props.onPlay}
				onStop={this.props.onStop}
				isPlaying={this.props.isPlaying} />
			</div>
		)
	}
}

export default SearchResults
