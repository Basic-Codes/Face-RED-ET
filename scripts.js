let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
let name = document.querySelector("#name");

camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;

    camera_button.classList.add("hide")
    click_button.classList.remove("hide")
});

click_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	let image_data_url = canvas.toDataURL('image/jpeg');

   	// data url of the image
   	// console.log(image_data_url);
    UploadImage(image_data_url)
});



UploadImage = (base64) => {
    console.log(base64)
    
    fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: JSON.stringify({
            b64: base64,
            name: name.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    .then(response => response.json())
    .then(data => console.log(data));
}