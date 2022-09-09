const moment = require('moment')
const url = "https://api.twitch.tv/helix/clips";
const clientId = "bsgy1j7hexbbfj7itrd1w10f5bn3r0";
const clientSecret = "lgipg4o8pu754vdyt5g7pbcuhoa9vr";
const today = moment().format();
const fromToday = moment().subtract(10, "days").format();
const params = `?broadcaster_id=145618882&started_at=${fromToday}&ended_at=${today}&first=20`;
let clipsArray = [];
let hasPlayed = [];

document.getElementById("videoClip").volume = 0.3;

document.getElementById("videoClip").addEventListener("ended", (event) => {
	nextClip();
});
console.log(today);
console.log(fromToday);
async function getAccessToken() {
	const response = await fetch(
		`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
		{
			method: "POST",
		}
	);
	const credentials = await response.json();
	return credentials.access_token;
}

async function getClips() {
	clipsArray = [];
	const token = await getAccessToken();
	const response = await fetch(`${url}${params}`, {
		method: "GET",
		headers: {
			"Client-ID": clientId,
			Authorization: `Bearer ${token}`,
		},
	});
	const clips = await response.json();
	const clipsToPush = await filterClips(clips.data);
	const page = clips.pagination.cursor;
	const responseTwo = await fetch(`${url}${params}&after=${page}`, {
		method: "GET",
		headers: {
			"Client-ID": clientId,
			Authorization: `Bearer ${token}`,
		},
	});
	const clipsTwo = await responseTwo.json();
	const clipsToPushTwo = await filterClips(clipsTwo.data);
}

const filterClips = (arr) => {
	const filter = [];
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].duration >= 12) {
			filter.push(arr[i]);
		}
	}
	for (let i = 0; i < filter.length; i++) {
		if (filter[i].view_count >= 2) {
			const clipToPlayJpeg = filter[i].thumbnail_url;
			const clipConcat = clipToPlayJpeg.slice(0, -20);
			const clipToPlayVid = clipConcat + ".mp4";
			clipsArray.push(clipToPlayVid);
		}
	}
};

async function nextClip() {
	const clips = await getClips();
	const clipIndex = Math.floor(Math.random() * clipsArray.length);
	const playCheck = hasPlayed.includes(clipsArray[clipIndex]);
	console.log(`has played before? ${playCheck}`);
	if (hasPlayed.length >= clipsArray.length) {
		hasPlayed = [];
	}
	if (
		clipsArray[clipIndex] === "https://clips-media-assets2.twitch.tv/34338152432-offset-8394.mp4"
	) {
		nextClip();
	}
	if (playCheck) {
		nextClip();
	} else {
		clipToPlay = clipsArray[clipIndex];
		document.getElementById("videoClip").setAttribute("src", clipToPlay);
		console.log(`clips array is ${clipsArray.length} items`);
		console.log(`clip ${clipToPlay} will play`);
		hasPlayed.push(clipToPlay);
		console.log(`hasplayed is ${hasPlayed.length} items`);
	}
}
nextClip();
