import fetch from "node-fetch"
const url = "https://api.twitch.tv/helix/clips"
const clientId = "bsgy1j7hexbbfj7itrd1w10f5bn3r0"
const clientSecret = "lgipg4o8pu754vdyt5g7pbcuhoa9vr"

const params = "?broadcaster_id=145618882&first=100"
const clipsArray = []

async function getAccessToken() {
	const response = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {
		method: "POST",
	})
	const credentials = await response.json()
	return credentials.access_token
}

async function getClips() {
	const token = await getAccessToken()
	const response = await fetch(`${url}${params}`, {
		method: "GET",
		headers: {
			"Client-ID": clientId,
			Authorization: `Bearer ${token}`,
		},
	})
	const clips = await response.json()
	//console.log(clips.data);
	const clipsFiltered = await filterClips(clips.data)
}

const filterClips = (arr) => {
	const filter = []
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].duration >= 20) {
			filter.push(arr[i])
		}
	}
	for (let i = 0; i < filter.length; i++) {
		if (filter[i].view_count >= 20) {
			clipsArray.push(filter[i])
		}
	}
}

//getClips()
async function playClip() {
	const clips = await getClips()
	//console.log(clipsArray)
	console.log(clipsArray.length)
	const clipIndex = Math.floor(Math.random() * clipsArray.length)
	const clipToPlay = clipsArray[clipIndex].embed_url;
	console.log(clipToPlay);
    //const video = document.getElementById('clip');
    //video.src = clipToPlay
}
playClip()
