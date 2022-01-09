
function decodeColorMap(colorMap) {
 let colorLookup = {};
  for (let i = 0; i<colorMap.length; i++) {
   [code, r, g, b] = colorMap[i];
   colorLookup[code] = color(r,g,b);
 }
  return colorLookup;
}

function decodeColorGroups() {
 let res = [];
  let lines = colorGroupsTable.getArray();
  for (let i = 0; i<lines.length; i++) {
   res.push(lines[i]);
 }
  return res;
}

// let tableArray = table.getArray();

function decodePointMap() {
  let xWidth;
  let xHeight;
  let xCols;
  let xRows;
  let pointMap = {};
  let pixelMap = pointTxt.getArray();
  for (let i = 0; i < pixelMap.length; i++) {
    let values = pixelMap[i];
    // first line width, height, cols, rows
    if (i == 0) {
      xWidth = (values[0]);
      xHeight = values[1];
      xCols = values[2];
      xRows = values[3];
      continue;
    }
 
    [x, y, code] = values;
    if (!(x in pointMap)) {
      pointMap[x] = {};
    }
    pointMap[x][y] = code;
  }
  return [xWidth, xHeight, xCols, xRows, pointMap];
}
