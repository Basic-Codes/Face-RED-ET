let camera_button = document.querySelector("#start-camera");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas_el = document.querySelector("#canvas");
let name = document.querySelector("#name");
const imageUpload = document.getElementById('imageUpload')

camera_button.addEventListener('click', async function() {
   	let stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;

    camera_button.classList.add("hide")
    click_button.classList.remove("hide")
});

click_button.addEventListener('click', function() {
  canvas_el.getContext('2d').drawImage(video, 0, 0, canvas_el.width, canvas_el.height);
   	let image_data_url = canvas_el.toDataURL('image/jpeg');
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



// imageUpload.addEventListener('change', async () => {
//   FaceDetection()
// })

// Promise.all([
//   faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
//   faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
//   faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
// ]).then(start)

// let image
// let canvas
// let faceMatcher
// let container

// async function start() {
//     console.log("Loading 02...")
//     container = document.createElement('div')
//     container.style.position = 'relative'
//     document.body.append(container)
//     const labeledFaceDescriptors = await loadLabeledImages()
//     faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6)


//     console.log("Loading 03...")
//     document.body.append('Loaded')
// }

// async function FaceDetection() {
//     if (image) image.remove()
//     if (canvas) canvas.remove()
//     image = await faceapi.bufferToImage(imageUpload.files[0])
//     container.append(image)
//     canvas = faceapi.createCanvasFromMedia(image)
//     container.append(canvas)
//     const displaySize = { width: image.width, height: image.height }
//     faceapi.matchDimensions(canvas, displaySize)
//     const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
//     const resizedDetections = faceapi.resizeResults(detections, displaySize)
//     const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
//     results.forEach((result, i) => {
//       const box = resizedDetections[i].detection.box
//       const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
//       drawBox.draw(canvas)
//     })
// }
  
// function loadLabeledImages() {
//     // const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark', 'Tate']
//     const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark', 'Tate', 'Rifat Noor']
//     return Promise.all(
//       labels.map(async label => {
//         console.log("Loaded: " + label)
//         const descriptions = []
//         for (let i = 1; i <= 2; i++) {
//           const img = await faceapi.fetchImage(`./images/${label}/${i}.jpg`)
//           const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
//           descriptions.push(detections.descriptor)
//         }
  
//         return new faceapi.LabeledFaceDescriptors(label, descriptions)
//       })
//     )
// }