const imageInput = document.getElementById("imageInput");
const sourceImage = document.getElementById("sourceImage");
const colorPalette = document.getElementById("colorPalette");
const selectedColors = new Set();
let arr = [];
let path={}
const formDtata=new FormData();

document.addEventListener("DOMContentLoaded", function () {
  // Event listener for image input change
  imageInput.addEventListener("change", extractDistinctColors);

  // Function to extract distinct colors
  function extractDistinctColors(event) {
    const file = event.target.files[0];
    formDtata.append("file",event.target.files[0]);
    
    const reader = new FileReader();

    reader.onload = function (e) {
      sourceImage.src = e.target.result;
      sourceImage.onload = function () {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = sourceImage.width;
        canvas.height = sourceImage.height;
        ctx.drawImage(sourceImage, 0, 0, sourceImage.width, sourceImage.height);
        const imageData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        ).data;

        // Map to store colors and their occurrences

        const filterColors = {};
        let topFiveColors = {
          color1: [0, ""],
          color2: [0, ""],
          color3: [0, ""],
          color4: [0, ""],
          color5: [0, ""],
        };

        // Iterate through image data
        for (let i = 0; i < imageData.length; i += 4) {
          const r = imageData[i];
          const g = imageData[i + 1];
          const b = imageData[i + 2];
          const a = imageData[i + 3];

          // Ignore fully transparent pixels
          if (a !== 0) {
            let newColor = findClosestColor([r, g, b]);
            const rgb = newColor.name;
            if (rgb in filterColors) {
              filterColors[rgb] += 1;
            } else {
              filterColors[rgb] = 0;
            }
          }
        }

        for (let name in filterColors) {
          sortTopFive(filterColors[name], topFiveColors, name, filterColors);
        }

        console.log(filterColors, topFiveColors);

        colorPalette.innerHTML = "";
        for (let color in topFiveColors) {
          console.log(color);
          colorPalette.innerHTML += `<div class="colorBox" style="background-color: ${topFiveColors[color][1]}; " data-color="${topFiveColors[color][1]}"></div>`;
        }

        // Add event listener to color boxes for color selection
        colorPalette.querySelectorAll(".colorBox").forEach((colorBox) => {
          colorBox.addEventListener("click", () => {
            const color = colorBox.getAttribute("data-color");
            if (selectedColors.has(color)) {
              selectedColors.delete(color);
              colorBox.classList.remove("selected");
            } else {
              selectedColors.add(color);
              colorBox.classList.add("selected");
              searchColor = color;
              displaySelectedColors();
            }
          });
        });
      };
    };

    reader.readAsDataURL(file);
  }
  let searchColor;
  // Function to display selected colors
  function displaySelectedColors() {
    const selectedColorList = document.getElementById("selectedColors");
    selectedColorList.innerHTML = `<div class="selectedColor" style="background-color: ${searchColor}; height=20px;width=20px;"></div>`;
  }

  // Event listener for search button click
  document.getElementById("searchButton").addEventListener("click", () => {
    fetchClothingImages(searchColor);
  });

  // Function to fetch clothing images based on selected colors
  async function fetchClothingImages() {
    let clothing_catigory = document.getElementById("clothes-catigry").value;

    formDtata.append("color_name",searchColor);
    formDtata.append("clothing_catigory",clothing_catigory);
    

    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost/omogene/php/addClothing.php", true);
    // request.setRequestHeader(
    //   "Content-Type",
    //   "application/x-www-form-urlencoded"
    // );
    request.send(
      // "color_name=" +
      //   searchColor +
      //   "&clothing_catigory=" +
      //   clothing_catigory +
      //   "&img=" +
      //   sourceImage.src +
      //   "&id=" +
      //   1
      formDtata
    );
    request.onload = function () {
      let response = request.response;
      console.log(response);
    };
  }
});

// ##################

function sortTopFive(num, obj, name, par) {
  if (num >= obj.color1[0]) {
    obj.color5 = obj.color4;
    obj.color4 = obj.color3;
    obj.color3 = obj.color2;
    obj.color2 = obj.color1;
    obj.color1 = [num, name];
  } else if (num >= obj.color2[0]) {
    obj.color5 = obj.color4;
    obj.color4 = obj.color3;
    obj.color3 = obj.color2;
    obj.color2 = [num, name];
  } else if (num >= obj.color3[0]) {
    obj.color5 = obj.color4;
    obj.color4 = obj.color3;
    obj.color3 = [num, name];
  } else if (num >= obj.color4[0]) {
    obj.color5 = obj.color4;
    obj.color4 = [num, name];
  } else if (num >= obj.color5[0]) {
    obj.color5 = [num, name];
  }
}

// قاعدة البيانات
let colorsDB = [];

fetch("./data.json")
  .then((res) => res.json())
  .then((res) => {
    colorsDB = [...res];
  });

// دالة لحساب المسافة بين الألوان في الفضاء اللوني
function colorDistance(color1, color2) {
  const rDiff = color1[0] - color2[0];
  const gDiff = color1[1] - color2[1];
  const bDiff = color1[2] - color2[2];
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

// دالة للبحث عن اللون الأقرب في قاعدة البيانات
function findClosestColor(rgb) {
  let closestColor = colorsDB[0];
  let minDistance = colorDistance(rgb, colorsDB[0].rgb);

  for (let i = 1; i < colorsDB.length; i++) {
    const distance = colorDistance(rgb, colorsDB[i].rgb);
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = colorsDB[i];
    }
  }

  return closestColor;
}
