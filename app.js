const constraints = { video: { facingMode: "user" }, audio: false };

// Dafinations
const cameraView = document.querySelector('#camera--view');
const cameraOutput = document.querySelector('#camera--output');
const cameraSensor = document.querySelector('#camera--sensor');
const cameraTrigger = document.querySelector('#camera--trigger');

// Access the device camera and stream to cameraView
function cameraStart () {
	navigator.mediaDevices
		.getUserMedia( constraints )
		.then(function(stream) {
			track = stream.getTracks()[0];
			cameraView.srcObject = stream;
		})
		.catch(function(err) {
			console.log("Oops, something is broken. ", err);
		});
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
	cameraSensor.width = cameraView.videoWidth;
	cameraSensor.height = cameraView.videoHeight;
	cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
	cameraOutput.src = cameraSensor.toDataURL("image/webp");
	cameraOutput.classList.add("taken");
}
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);