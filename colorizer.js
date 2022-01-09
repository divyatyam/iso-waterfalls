
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomTint(color) {
  return random(["#ff0000", "#00ff00", "#0000ff"]);
}

function randomRatio() {
  r = Math.random();
}

function randomPalette() {
  a = getRandom(0, 150);
  b = getRandom(100, 200);
  c = getRandom(150, 255);
  return [color(a,b,c), color(a,c,b), color(b,a,c), color(b,c,a), color(c,a,b), color(c,b,a)];  
}

function randomColor() {
  r = getRandom(0, 150);
  g = getRandom(100, 200);
  b = getRandom(150, 255);
  return color(shuffle([r,g,b]));
}

function randomColorMap() {
  let colorMap = {};
  for (let i = 0; i < 18; i++) {
    colorMap[i] = randomColor();
  }
  return colorMap;
}

function wiggleColor(seed, j) {
  let values = [];
  for (let i = 0; i < seed.length; i++) {
    let c = Math.min(255, seed[i] + getRandom(60, 90));
    values.push(c);
  }
  //print(values);
  return values;
}

function ampMaxValue(c) {
  let arr = [red(c), green(c), blue(c)];
  let max = 0;
  let j = 0;
  for (let i=0; i< arr.length; i++) {
    if (arr[i] > max) {
      j  =  i;
      max = arr[i];
    }
  }
  let res = [];
  for (let i=0; i< arr.length; i++) {
    if (i ==j) {
      res[i] = 255;
      continue;
    }
    res[i] = arr[i];
  }
  return color(res[0], res[1], res[2]);
}


function rotateColor(seed, lighting, wh, j) {
  let c;
  let colorTint = getPolar(lighting);
  
  switch (j) {
      case 0:
        c = blendColors(seed, "white", 0.3);
        break;
        case 2:
        c = blendColors(seed, colorTint, 0.0);
      break;
        case 1:
        c = blendColors(seed, "black", 0.3);
        break;
    }
    //print(c);
  return c;
}

function toRGB(p5Color) {
  return [Math.floor(red(p5Color)), Math.floor(green(p5Color)), Math.floor(blue(p5Color))];
}

function blendColors(source, blend, factor) {
  return toRGB(lerpColor(color(source), color(blend), factor));
}
function colorFromA(a) {
  return color(a[0], a[1], a[2]);
}

function addGradientToLastGroup(group, map) {
  let start = colorFromA(map[7]);
  let end = colorFromA(map[8]);
  // Add gradient from 7=8 for 5,10,14
  map[5] = toRGB(lerpColor(start, end, 0.2));
  map[10] = toRGB(lerpColor(start, end, 0.4));
  map[14] = toRGB(lerpColor(start, end, 0.8));
  // return map;  
}

function getPolar(clr) {
  // Pick the component that's weakest and apply that as a tint
  let a = [red(clr), green(clr), blue(clr)];
  let min = a[0];
  let ia = 0;
  for (let i=0; i< a.length; i++) {
    if (a[i] < min) {
      min = a[i];
      ia = i;
    }
  }
  switch (ia) {
    case 0: return "#ff0000";
    case 1: return "#00ff00";
    case 2: return "#0000ff";
  }
}

function applySeedToGroup(seedColor, colorGroup, colorMap) {
      for (let j = 0; j < colorGroup.length; j++) {
        let wh = false;
        if (colorGroup[0] == 8) {
          wh = true;
        }
      // print(seedColor);
      let c= rotateColor(seedColor, getPolar(seedColor), wh, j);
      colorMap[colorGroup[j]] = c;
    }
}

function reColorMap() {
  let colorMap = {};
  reColorFromSeed(colorMap);
  addGradientToLastGroup(colorGroups, colorMap);
  return colorMap;
}

function groupedColorMap() {
  let colorMap = {};
  colorSeed = {};
  let palette = shuffle(randomPalette());
  for (let i = 0; i < colorGroups.length; i++) {
    let c = palette[i];
    if (i == 2) {
      print(red(c), green(c), blue(c));
      c = ampMaxValue(c);
      print(red(c), green(c), blue(c));
    }
    colorSeed[i] = c; //randomColor();
    // print(red(colorSeed[i]), green(colorSeed[i]), blue(colorSeed[i]));
  }
  reColorFromSeed(colorMap);
  addGradientToLastGroup(colorGroups, colorMap);
  console.log("%s %s %s", colorSeed[0].toString("#rrggbb"), colorSeed[1].toString("#rrggbb"), colorSeed[2].toString("#rrggbb"));
  return colorMap;
}

function reColorFromSeed(colorMap) {
    for (let i = 0; i < colorGroups.length; i++) {
    applySeedToGroup(colorSeed[i], colorGroups[i], colorMap);
  }
}