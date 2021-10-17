import React from "react"
import "./App.css"
import Playlist from "../Playlist/Playlist"
import SearchBar from "../SearchBar/SearchBar"
import SearchResults from "../SearchResults/SearchResults"
import Spotify from "../../util/Spotify"
import Volume from "../Volume/Volume"

class App extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			searchResults: [],
			playlistName: "Playlist Name",
			playlistTracks: [],
			previews: [],
			isPlaying: false,
			currentlyPlaying: null,
			volumeVal: 0.5,
		}

		this.search = this.search.bind(this)
		this.addTrack = this.addTrack.bind(this)
		this.removeTrack = this.removeTrack.bind(this)
		this.updatePlaylistName = this.updatePlaylistName.bind(this)
		this.savePlaylist = this.savePlaylist.bind(this)
		this.handlePlayTrack = this.handlePlayTrack.bind(this)
		this.handleStopTrack = this.handleStopTrack.bind(this)
		this.handleVolume = this.handleVolume.bind(this)
	}

	search(term) {
		window.sessionStorage.searchTerm = term
		Spotify.search(term).then((searchResults) => {
			console.log(searchResults)
			let previews = searchResults.map((preview) => preview.preview)
			// console.log(previews)
			this.setState({ previews: previews })
			this.setState({ searchResults: searchResults })
		})
	}

	addTrack(track) {
		let tracks = this.state.playlistTracks
		tracks.push(track)

		this.setState({ playlistTracks: tracks })
	}

	removeTrack(track) {
		let tracks = this.state.playlistTracks
		tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id)

		this.setState({ playlistTracks: tracks })
	}

	updatePlaylistName(name) {
		this.setState({ playlistName: name })
	}

	savePlaylist() {
		const trackUris = this.state.playlistTracks.map((track) => track.uri)
		Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
			this.setState({
				playlistName: "Playlist Name",
				playlistTracks: [],
			})
		})
	}
	handlePlayTrack(track) {
		let audio = document.getElementById("player")
		audio.src = track
		audio.play()
		this.setState({ isPlaying: true, currentlyPlaying: track })
		audio.addEventListener("ended", (event) => {
			this.setState({ isPlaying: false, currentlyPlaying: null })
		})
	}

	handleStopTrack() {
		let playing = this.state.isPlaying
		let audio = document.getElementsByTagName("audio")
		console.log(audio)
		audio[0].pause()
		audio.currentTime = 0
		this.setState({ isPlaying: false, currentlyPlaying: null })
		console.log(playing)
	}
	handleVolume(e) {
		this.setState({ volumeVal: e.target.value })
		let audio = document.getElementById("player")
		audio.volume = this.state.volumeVal
	}
	componentDidMount() {
		if (window.location.href.match(/access_token=/)) {
			Spotify.search(window.sessionStorage.searchTerm).then((searchResults) => {
				this.setState({ searchResults: searchResults })
			})
		}
	}
	render() {
		return (
			<div>
				<h1>
					Spot<span className="highlight">On</span>
				</h1>
				<div className="App">
					<SearchBar onSearch={this.search} />
					<Volume volumeVal={this.state.volumeVal} handleVolume={this.handleVolume} />
					<div className="App-playlist">
						<SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} onPlay={this.handlePlayTrack} onStop={this.handleStopTrack} isPlaying={this.state.currentlyPlaying} />
						<Playlist playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} onSave={this.savePlaylist} onPlay={this.handlePlayTrack} onStop={this.handleStopTrack} isPlaying={this.state.currentlyPlaying} />
					</div>
				</div>
				<audio id="player" src=""></audio>
				<p className="bam">
					by bamb<span className="highlight">oo</span>dia
				</p>
			</div>
		)
	}
}

export default App
