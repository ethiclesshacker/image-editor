import * as Magick from "https://knicknic.github.io/wasm-imagemagick/magickApi.js";
window.magick = Magick;

const newImage = document.querySelector(".new");
// const og_image = await fetch("img.png");
// const arrayBuffer = await og_image.arrayBuffer();

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
  let processedFiles = await Magick.call(files, command);
  console.log(processedFiles);

  let firstImageOutput = processedFiles.outputFiles[0];

  const blob = new Blob([firstImageOutput["buffer"]], { type: "image/png" });
  const url = window.URL.createObjectURL(blob);
  newImage.src = url;
}

doWork();
