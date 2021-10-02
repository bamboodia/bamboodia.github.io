const url = "https://api.twitch.tv/helix/clips"
const clientId = 'bsgy1j7hexbbfj7itrd1w10f5bn3r0'
const clientSecret = 'lgipg4o8pu754vdyt5g7pbcuhoa9vr'

const params = "?broadcaster_id=145618882&first=100"
let clipsArray = []
let hasPlayed = []

document.getElementById("videoClip").addEventListener("ended", (event) => {
	nextClip()
})

async function getAccessToken() {
	const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {
		method: "POST",
	})
	const credentials = await response.json()
	return credentials.access_token
}

async function getClips() {
	clipsArray = []
	const token = await getAccessToken()
	const response = await fetch(`${url}${params}`, {
		method: "GET",
		headers: {
			"Client-ID": clientId,
			Authorization: `Bearer ${token}`,
		},
	})
	const clips = await response.json()
	const clipsToPush = await filterClips(clips.data)
	console.log(clips.headers)
}

const filterClips = (arr) => {
	const filter = []
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].duration >= 12) {
			filter.push(arr[i])
		}
	}
	for (let i = 0; i < filter.length; i++) {
		if (filter[i].view_count >= 15) {
			const clipToPlayJpeg = filter[i].thumbnail_url
			const clipConcat = clipToPlayJpeg.slice(0, -20)
			const clipToPlayVid = clipConcat + ".mp4"
			clipsArray.push(clipToPlayVid)
		}
	}
}

async function nextClip() {
	const clips = await getClips()
	const clipIndex = Math.floor(Math.random() * clipsArray.length)
	const playCheck = hasPlayed.includes(clipsArray[clipIndex])
	console.log(`has played before? ${playCheck}`)
	if (hasPlayed.length >= clipsArray.length) {
		hasPlayed = []
	}
	if (playCheck) {
		nextClip()
	} else {
		clipToPlay = clipsArray[clipIndex]
		document.getElementById("videoClip").setAttribute("src", clipToPlay)
		console.log(`clips array is ${clipsArray.length} items`)
		console.log(`clip ${clipToPlay} will play`)
		hasPlayed.push(clipToPlay)
		console.log(`hasplayed is ${hasPlayed.length} items`)		
	}
}
nextClip()
