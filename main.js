
var form = document.getElementById("select-file");
var video = document.getElementById("player");
var videoInput = document.getElementById("movie");
var subtitleInput = document.getElementById("subtitle");
var errorDiv = document.getElementById('error');
var videoURL, subtitleURL, movie, subtitle;
var listType = ['video/mp4',
	'video/avi',
	'video/mpeg','video/mpg',
	'video/3gpp','video/3gp','video/divx',
	'video/x-flv','video/flv',
	'video/x-matroska','video/mkv',
	'video/quicktime','video/mov',
	'video/webm','video/webm',
	'video/x-ms-wmv','video/wmv'];
var subtitleElement = document.createElement("track");



form.addEventListener("submit", function (event) {
	event.preventDefault()
	console.log(form.elements.movie.value)
	errorDiv.innerHTML = ""
	if(form.elements.movie.value === '' && form.elements.subtitle.value === "") {
		errorDiv.innerHTML = "Please choose a video at least"
		return false
	}

	// Checking for movie
	if (form.elements.movie.value !== "" ) {
		movie = videoInput.files[0]
		console.log(movie.type)
		if( listType.indexOf(movie.type) == -1) {
			errorDiv.innerHTML = "The file must be a video."
			return false
		}

			// We create an URL object that conteint the route for file
			fileURL = URL.createObjectURL(movie);
			document.getElementById("player").src = fileURL
			videoInput.value = ""
			
	}
	// checking for subtitle
	if ( form.elements.subtitle.value !== "") {
		if( videoInput.value === "" && movie === null) {
			errorDiv.innerHTML = "You can't use subtitle without video";
			return false;
		} 
		subtitle = subtitleInput.files[0];

		if (subtitle.type !== "text/vtt") {
			errorDiv.innerHTML = "The subtitle file must be of type .vtt"
			return false
		}
		if(document.querySelectorAll('video track').length > 0) {
			var trackList = document.querySelectorAll('video track');
			trackList.forEach(function (trackElt) {
				trackElt.parentNode.removeChild(trackElt)
			})
		}

		subtitleURL = URL.createObjectURL(subtitle);

		subtitleElement.setAttribute('src', subtitleURL)
		subtitleElement.setAttribute('kind', "subtitles")
		video.append(subtitleElement)
		subtitleInput.value = ""
	
	}

	

	return false
})
