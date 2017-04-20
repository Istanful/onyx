// Load all scripts, firing callback when each script is done
function loadScripts(scripts) {
  var i = 0;
  var callback = function() {
    if (i++ < scripts.length - 1) {
      loadScript(scripts[i], callback);
    }
  }
  // Load first script
  loadScript(scripts[0], callback);
}

// Load script and fire callback when done
function loadScript(fileName, callback) {
  let script = document.createElement("script");
  script.type = "text/javascript";

  // IE detect script done
  if (script.readyState) {
    script.onreadystatechange = function() {
      if (script.readyState == "loaded") {
        script.readyState == "loaded";
        script.onreadystatechange = null;
        callback();
      }
    }
  }
  // All other browsers detect script done
  else {
    script.onload = function() {
      callback();
    }
  }

  script.src = "scripts/" + fileName;
  document.getElementsByTagName("head")[0].append(script);
}

// Load all images and execute callback when done
function loadImages(images, callback, dir = "graphics") {
  let loadedCount = 0;

  function onImageLoad() {
    loadedCount++;

    // If all images loaded execute callback
    if (loadedCount == images.length) {
      callback();
    }
  }

  // Load all images and subscribe load event to onImageLoad
  for (let i = 0; i < images.length; i++) {
    let img = new Image();
    img.addEventListener("load", onImageLoad);
    img.src = dir + "/" + images[i];
    resources.images[pathToName(images[i])] = img;
  }
}

function pathToName(path) {
  return path.replace(/\.[^/.]+$/, "");
}

let resources = {
  images: {}
};
let images = ["cannon.svg", "tower-cogwheel.svg", "tower.svg"];
let scripts = [
  "GameObject.js",
  "Number.js",
  "Tower.js",
  "Enemy.js",
  "Vector.js",
  "Game.js",
  "VectorAnimation.js",
  "Animation.js",
  "GameController.js"
];

loadImages(images, function() { loadScripts(scripts) });
