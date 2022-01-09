function loadControls() {
  initColorPicker();
  drawKey();
  addSave();
  addReload();
}

function addSave() {
  button = createButton('Save');
  button.position(0, height);
  button.mousePressed(saveImage);
}

function addReload() {
  button = createButton('Reload');
  button.position(width, height);
  button.mousePressed(reloadImage);
}


function saveImage() {
  saveCanvas("test", "png");
  
}

function reloadImage() {
  colorMap = reColorMap();
  drawKey();
  draw();
}

function updatePickers() {
  let i = 0;
  for (let c in colorPickers) {
    colorSeed[i] = colorPickers[i].color();
    i++;
  }
  initColorPicker();
  colorMap = reColorMap();
  drawKey();
  draw();
}

function updateKeyPickers() {
  for (let code in keyPickers) {
    let c = keyPickers[code].color();
    colorMap[code] = [red(c), green(c), blue(c)];
  }
  // print(colorMap);
  drawKey();
  draw();
}

function initColorPicker() {
  let i = 0;
  let x = 0;
  kHeight = (height - cHeight)/2;
  kWidth = width / Object.keys(colorSeed).length;
  colorPickers = {};
  for (let seed in colorSeed) {
    let p = createColorPicker(colorSeed[seed]);
    p.position(x, cHeight);
    p.changed(updatePickers);
    p.style("width", `${kWidth}px`);
    p.style("height", `${kHeight}px`);
    colorPickers[i] = p;
    x += kWidth;
    i++;
  }
}

function drawKey() {
  kHeight = (height - cHeight)/2;
  kWidth = Math.floor(width / Object.keys(colorMap).length);
  let x = 0;
  keyPickers = {};
  for (let code in colorMap) {
    let c = colorMap[code];
    // print(c);
    let p = createColorPicker(color(c));
    p.position(x, int(cHeight) + kHeight);
    p.changed(updateKeyPickers);
    p.style("width", `${kWidth}px`);
    p.style("height", `${kHeight}px`);
    // fill(c);
    // stroke(c);
    // strokeWeight("0");
    // rect(x, int(cHeight) + kHeight, kWidth, kHeight);
    keyPickers[code] = p;
    drawText(code, "black", x + kWidth/3, height+10);
    x += kWidth;
    //console.clear();
    //console.log("%s,%d,%d,%d", code, red(c), green(c), blue(c));
  }
  // print(keyPickers);
}