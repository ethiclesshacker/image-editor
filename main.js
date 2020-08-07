
async function doWork(arrayBuffer) {
  const sourceBytes = new Uint8Array(arrayBuffer);
  const files = [{ name: "srcFile.png", content: sourceBytes }];
  const command = [
    "convert",
    "srcFile.png",
    "-rotate",
    "90",
    "-resize",
    "200%",
    "out.png",
  ];
  let processedFiles = await window.magick.call(files, command);
  console.log(processedFiles);

  let firstImageOutput = processedFiles.outputFiles[0];

  const blob = new Blob([firstImageOutput["buffer"]], { type: "image/png" });
  const url = window.URL.createObjectURL(blob);
  newImage.src = url;
}

const form = document.querySelector("form");
const newImage = document.querySelector(".new");

form.addEventListener("submit", gotData);

function gotData(event) {
  event.preventDefault();
  const file = document.querySelector("#image-file").files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const img_str = reader.result;
    console.log(img_str);
    fetch(img_str)
      .then((response) => response.arrayBuffer())
      .then((data) => {
        doWork(data);
      });
  };
  reader.onerror = (error) => reject(error);
}
