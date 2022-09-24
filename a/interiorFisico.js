var faceB, bodyB;
var bodyj = { w: 200, h: 250, x: 0, y: 0, s: 1 };
var facej = { w: 40, h: 50, x: 0, y: 220, s: 3 };
var floorj = { x: 0, y: 0 };
var eyesj = { x: 0, y: 220 };

var cameraj = { x: 0, y: 0 };
var cameraini = { x: 0, y: 0 };
function getJsonPath(d) {
  // https://stackoverflow.com/questions/25886802/svg-path-convert-into-json
  d = d.replace(/\s{2,}/g, " "); // Remove multiple spaces
  //d = d.replace(/([a-zA-Z])\s[0-9]/g, "$1,"); // Add letters to coords group
  d = d.split(" "); // Split on space

  var coords = [];
  var coord = [];
  var prev = "";
  var conti = 0;
  for (var i = 0; i < d.length; i++) {
    var coordString = d[i];
    var coordArray = coordString.split(",");
    if (coordArray.length >= 2) {
      var datos = {
        x: parseFloat(coordArray[coordArray.length - 2]),
        y: parseFloat(coordArray[coordArray.length - 1]),
      };

      coord.push(datos);
      conti++;
      if (conti == 4 && prev == "C") {
        conti = 1;
        coords.push(coord);
        coord = [];
        coord.push(prev);
      }
    }

    if (
      d[i] == "M" ||
      d[i] == "C" ||
      d[i] == "L" ||
      d[i] == "V" ||
      d[i] == "H" ||
      d[i] == "Z"
    ) {
      if (i == 0) {
        coord.push(d[i]);
      } else {
        if (d[i] == "Z") {
          coord = [];
          coords.push([d[i]]);
        } else {
          coords.push(coord);
          coord = [];
          coord.push(d[i]);
        }
      }
      prev = d[i];
      conti = 1;
    }
  }
  var filtered = coords.filter(function (el) {
    return el.length != 0;
  });

  var filtered1 = filtered.filter(function (el) {
    return el != "C";
  });

  var cleanArray = filtered1.filter(function () {
    return true;
  });

  return cleanArray;
}

var path =
  "M -0.74788463,-2.3741128 C 12.159173,-0.40208206 58.113964,0.32435677 69.475736,-0.85069156 81.503456,-2.9963315 85.140455,-13.41406 85.989456,-23.489619 86.838456,-33.56518 85.750876,-36.662549 81.013016,-46.224148 74.681146,-54.743848 67.751071,-67.233139 59.747131,-79.38905 57.578151,-94.008329 57.016716,-121.20143 53.687035,-135.60267 50.566854,-147.54594 34.438074,-149.65104 30.325154,-152.09314 26.212234,-154.53525 19.079931,-157.14556 16.599893,-160.06113 14.119844,-162.9767 12.887481,-163.02454 12.885391,-166.41061 12.883612,-169.28881 13.413463,-174.64398 16.047472,-177.33397 16.285272,-177.57683 17.365208,-177.55512 17.980688,-178.39438 20.316745,-181.57972 21.350552,-189.88501 20.669412,-191.0303 19.988292,-192.17558 18.984043,-191.26627 18.679353,-192.39817 18.118485,-194.48161 18.869199,-197.22114 17.841161,-202.54845 16.857441,-207.64626 10.860073,-215.67809 -0.00167709,-216.24891 -0.2539782,-216.28782 -1.2421334,-216.28782 -1.4946092,-216.28508 -12.356358,-215.67809 -18.353727,-207.64626 -19.337447,-202.54845 -20.365487,-197.22114 -19.614771,-194.48161 -20.17564,-192.39817 -20.480329,-191.26627 -21.484063,-192.17558 -22.165182,-191.0303 -22.846323,-189.88501 -21.812514,-181.57972 -19.476457,-178.39438 -18.860977,-177.55512 -17.781559,-177.57683 -17.543759,-177.33397 -14.909749,-174.64398 -14.379898,-169.28881 -14.381678,-166.41061 -14.383768,-163.02454 -15.61613,-162.9767 -18.09618,-160.06113 -20.576217,-157.14556 -27.708521,-154.53525 -31.821439,-152.09314 -35.934361,-149.65104 -52.063141,-147.54594 -55.183322,-135.60267 -58.513,-121.20143 -59.074435,-94.008329 -61.243415,-79.38905 -69.247357,-67.233139 -76.177427,-54.743848 -82.5093,-46.224148 -87.247165,-36.662549 -88.334743,-33.56518 -87.485742,-23.489619 -86.636739,-13.41406 -82.999748,-2.9963315 -70.972023,-0.85069156 -59.610097,0.32437238 -13.654233,-0.40202271 -0.74788463,-2.3741128 M -36.043404,-108.16249 C -26.400725,-91.245275 -27.893478,-70.138687 -31.864847,-51.753527 -40.562177,-47.225948 -46.790159,-45.22831 -56.338289,-42.37684 -61.57238,-40.975469 -66.202215,-40.755108 -70.413916,-39.420946 -59.470847,-53.093975 -49.637465,-62.943074 -42.209436,-75.521585 -39.406967,-82.843336 -41.499323,-106.71221 -36.043404,-108.16249 Z M 34.547117,-108.16249 C 40.003039,-106.71221 37.91068,-82.843336 40.713149,-75.521585 48.141181,-62.943074 57.97456,-53.093975 68.917629,-39.420946 64.705931,-40.755108 60.076093,-40.975469 54.842002,-42.37684 45.293872,-45.22831 39.06589,-47.225948 30.368562,-51.753527 26.397192,-70.138687 24.904438,-91.245275 34.547117,-108.16249 Z";
var jsonpath = getJsonPath(path);
var jsonpath1 = getJsonPath(path);
//console.log(JSON.stringify(jsonpath));

function jpath2p5jsText(tokens) {
  var ncurves = 0;
  var pen = "";
  pen += "noStroke();" + "\n";
  pen += "fill(0);" + "\n";

  var x = 0,
    y = 0,
    x2 = 0,
    y2 = 0,
    x3 = 0,
    y3 = 0,
    x4 = 0,
    y4 = 0;
  var prx = 0,
    pry = 0;
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token[0] == "M") {
      if (i <= 1) {
        pen += "beginShape()" + "\n";
      } else {
        pen += "beginContour()" + "\n";
      }
      x = token[1].x;
      y = token[1].y;
      pen += "vertex(" + x + "," + y + ");" + "\n";
      prx = x;
      pry = y;
      ncurves++;
    } else if (token[0] == "L") {
      x2 = token[1].x;
      y2 = token[1].y;
      pen += "vertex(" + x2 + "," + y2 + ");" + "\n";
      prx = x2;
      pry = y2;
    } else if (token[0] == "H") {
      x2 = token[1].x;
      y2 = token[1].y;

      pen += "vertex(" + x2 + "," + y2 + ");" + "\n";
      prx = x2;
      pry = y2;
    } else if (token[0] == "V") {
      x2 = token[1].x;
      y2 = token[1].y;

      pen += "vertex(" + prx + "," + pry + ", " + x2 + "," + y2 + ");" + "\n";
      prx = x2;
      pry = y2;
    } else if (token[0] == "C") {
      x2 = token[1].x;
      y2 = token[1].y;
      x3 = token[2].x;
      y3 = token[2].y;
      x4 = token[3].x;
      y4 = token[3].y;
      pen +=
        "bezierVertex(" +
        x2 +
        "," +
        y2 +
        "," +
        x3 +
        "," +
        y3 +
        ", " +
        x4 +
        "," +
        y4 +
        ");" +
        "\n";
      prx = x4;
      pry = y4;
    } else if (token[0] == "Z") {
      if (ncurves > 1) {
        pen += "endContour();" + "\n";
      } else {
        //pen+='endShape();'+"\n"
      }
    } else if (token[0] == "Q") {
      x2 = token[1].x;
      y2 = token[1].y;
      x3 = token[2].x;
      y3 = token[2].y;
      pen += "beginShape();" + "\n";
      pen += "vertex(" + prx + "," + pry + ");" + "\n";
      pen +=
        "quadraticVertex(" + x2 + "," + y2 + "," + x3 + "," + y3 + ");" + "\n";
      pen += "endShape();" + "\n";
      prx = x3;
      pry = y3;
    }
    i++;
  }
  pen += "endShape();" + "\n";
  return pen;
}

function jpath2p5js(tokens) {
  var ncurves = 0;
  var pen = "";
  noStroke();

  var x = 0,
    y = 0,
    x2 = 0,
    y2 = 0,
    x3 = 0,
    y3 = 0,
    x4 = 0,
    y4 = 0;
  var prx = 0,
    pry = 0;
  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    if (token[0] == "M") {
      if (i <= 1) {
        beginShape();
      } else {
        beginContour();
      }
      x = token[1].x;
      y = token[1].y;
      vertex(x, y);
      prx = x;
      pry = y;
      ncurves++;
    } else if (token[0] == "L") {
      x2 = token[1].x;
      y2 = token[1].y;
      vertex(x2, y2);
      prx = x2;
      pry = y2;
    } else if (token[0] == "H") {
      x2 = token[1].x;
      y2 = token[1].y;
      vertex(x2, y2);
      prx = x2;
      pry = y2;
    } else if (token[0] == "V") {
      x2 = token[1].x;
      y2 = token[1].y;

      vertex(x2, y2);
      prx = x2;
      pry = y2;
    } else if (token[0] == "C") {
      x2 = token[1].x;
      y2 = token[1].y;
      x3 = token[2].x;
      y3 = token[2].y;
      x4 = token[3].x;
      y4 = token[3].y;
      bezierVertex(x2, y2, x3, y3, x4, y4);
      prx = x4;
      pry = y4;
    } else if (token[0] == "Z") {
      if (ncurves > 1) {
        endContour();
      } else {
        //pen+='endShape();'+"\n"
      }
    } else if (token[0] == "Q") {
      x2 = token[1].x;
      y2 = token[1].y;
      x3 = token[2].x;
      y3 = token[2].y;
      beginShape();
      vertex(prx, pry);
      quadraticVertex(x2, y2, x3, y3);
      endShape();
      prx = x3;
      pry = y3;
    }
    i++;
  }
  endShape();
  return pen;
}

var mAnim = 85;
var tAnim = 8000;

var tf;
var tfy = 1;
var tfs = 1;
function toFace() {
  if (cameraj.in == "body") {
    tfy = (cameraj.y + facej.y) / mAnim;
    tfs = (cameraj.s + facej.s) / mAnim;
    tf = setInterval(toFacei, tAnim / mAnim);
  }
}
function toFacei() {
  cameraj.y += tfy;
  cameraj.s += tfs;
  //console.log(cameraj);
  redraw();
  if (cameraj.s > facej.s) {
    clearInterval(tf);
    //cameraj.y = cameraini.y;
    //cameraj.s = cameraini.s;
    cameraj.in = "face";
  }
}

var tb;
var tby = 1;
var tbs = 1;
function toBody() {
  if ((cameraj.in = "face")) {
    tby = abs(cameraj.y - cameraini.y) / mAnim;
    tbs = abs(cameraj.s - cameraini.s) / mAnim;
    tb = setInterval(toBodyi, tAnim / mAnim);
  }
}

function toBodyi() {
  console.log(cameraj.s + " " + cameraini.s);
  cameraj.y -= tfy;
  cameraj.s -= tfs;
  //console.log(cameraj);

  redraw();
  if (cameraj.s <= cameraini.s + tfs) {
    clearInterval(tb);
    cameraj.y = cameraini.y;
    cameraj.s = cameraini.s;
    cameraj.in = "body";
    redraw();
  }
}

function setup() {
  createCanvas(400, 400);
  bodyj = { w: 200, h: 250, x: 0, y: 0, s: 1.7 };
  facej = { w: 40, h: 50, x: 0, y: 820, s: 4 };
  floorj = { x: 0, y: 0 };
  eyesj = { x: 0, y: 220 };
  cameraini = { x: width / 2, y: height, s: bodyj.s, in: "" };

  cameraj = { x: width / 2, y: height, s: bodyj.s, in: "body" };
  faceB = createButton("Face");
  faceB.mousePressed(toFace);
  bodyB = createButton("Body");
  bodyB.mousePressed(toBody);
  //frameRate(18)
  noLoop();
}

function draw() {
  background(220);
  push();
  translate(cameraj.x, cameraj.y);
  scale(cameraj.s);
  //translate(0,-cameraj.y)
  //scale(ef/4)
  push();
  translate(0, 0);
  fill(29);
  jpath2p5js(jsonpath1);
  pop();

  pop();
}
