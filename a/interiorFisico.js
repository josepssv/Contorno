var headB, bodyB;
var bodyj = { w: 200, h: 250, x: 0, y: 0, s: 1 };
var headj = { w: 40, h: 50, x: 0, y: 220, s: 3 };
var floorj = { x: 0, y: 0 };
var headj = { x: 0, y: 220 };

var cameraj = { x: 0, y: 0, orbit:'' };

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

var pathProfile="M -9.8134021,-0.53335392 C 3.6228279,0.90950911 20.560598,0.31247411 31.922368,-0.86257592 43.950098,-3.0082159 53.929818,-7.0128939 55.433468,-20.930715 57.475248,-39.829508 50.666658,-48.263028 46.155018,-62.616855 36.968678,-91.843305 50.168248,-119.26179 50.999788,-126.65271 53.404528,-148.02659 44.975058,-150.89483 39.126908,-164.92454 37.196268,-169.55613 36.006538,-174.57924 38.116358,-180.24284 40.226178,-185.90644 41.960228,-190.40853 39.646028,-201.67714 37.374778,-212.73665 26.951258,-215.2974 20.227648,-216.06074 13.504038,-216.82408 6.6242779,-215.33865 2.2397679,-212.00776 -1.2731421,-209.33902 -4.1541221,-206.99047 -4.8152821,-197.85509 -5.2371921,-192.02548 -10.699922,-186.46491 -8.4215321,-185.17141 -6.8137021,-184.2586 -5.6150821,-184.65106 -5.7359821,-183.86788 -6.0127721,-182.07495 -6.9024821,-179.93678 -4.8990521,-179.46734 -4.3902821,-179.34813 -4.6562321,-181.08428 -4.2095521,-180.62798 -4.1344521,-179.19237 -3.9564021,-181.25571 -1.1554721,-181.27734 4.5823679,-185.51509 11.549408,-181.62102 14.519808,-174.76386 9.0063279,-176.13039 1.6221379,-180.83955 -2.2043821,-178.99034 -2.5090721,-177.85844 -1.7055321,-178.88835 -1.2072221,-177.32261 -2.6837421,-177.93199 -3.3413621,-178.51254 -3.9568221,-178.95351 -4.9119021,-177.93147 -4.2337921,-179.68087 -5.0435521,-179.01764 -6.4063521,-177.90143 -3.0556721,-176.02968 -3.9896321,-171.69955 -4.7834121,-168.01933 8.0353879,-168.74205 11.305668,-167.03966 13.377568,-164.49264 14.134478,-160.58197 14.678228,-159.17829 13.838298,-152.56141 -6.6424421,-143.77585 -6.8603821,-124.29437 -6.9746521,-114.08015 -4.7015521,-112.58611 -8.3189421,-103.89809 -17.904892,-90.251935 -43.661572,-54.854035 -57.333592,-45.216895 -71.005607,-35.579765 -68.549057,-37.296752 -76.413067,-30.166862 -80.098527,-26.825452 -83.816447,-21.122138 -81.733777,-13.248712 -78.840097,-2.3093039 -70.708677,-2.7241779 -64.766382,-1.9014549 -53.404452,-0.72638492 -36.335212,1.3359921 -23.428862,-0.63609792 M -1.5318921,-77.111795 C 0.68865786,-72.341425 1.3973079,-51.028167 1.3973079,-51.028167 -7.3000221,-46.500587 -13.078112,-46.12269 -22.626242,-43.27122 -27.860332,-41.86985 -35.457002,-41.835522 -41.256202,-39.939955 -37.154502,-49.266258 -16.155582,-61.234531 -6.9037121,-70.486405 -5.4352521,-71.954865 -3.4122321,-74.111625 -1.5318921,-77.111795 Z M -6.6098621,-184.46378 C -6.3751221,-184.73922 -4.3535321,-197.11617 2.2371879,-192.84475 24.517828,-178.40474 27.149888,-157.69768 18.652948,-136.30309 19.144688,-143.95655 21.911228,-164.35989 18.920848,-168.1589 15.930468,-171.95791 11.608218,-181.23112 7.7153379,-183.81092 2.9088179,-186.99619 -1.1670621,-189.31142 -6.6098621,-184.46378 Z"
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

function toProfile() {
  jsonpath1 = getJsonPath(pathProfile);
  cameraj.orbit='profile'
  redraw()
}
function toFront() {
  cameraj.orbit='front'
  jsonpath1 = getJsonPath(path);
  redraw()
}

function toHead() {
  cameraj.y += headj.y;
  cameraj.s += headj.s;
  //console.log(cameraj);
  redraw();
  cameraj.y -= headj.y;
  cameraj.s -= headj.s;
}

function toBody() {
  redraw();
}

function setup() {
  createCanvas(400, 400);
  bodyj = { w: 200, h: 250, x: 0, y: 0, s: 1.7 };
  headj = { w: 40, h: 50, x: 0, y: 680, s: 3.1 };
  floorj = { x: 0, y: 0 };
  //headj = { x: 0, y: 220 };
  cameraini = { x: width / 2, y: height, s: bodyj.s, in: "", orbit: "front" };
  cameraj = { x: width / 2, y: height, s: bodyj.s, in: "body", orbit: "front" };

  headB = createButton("head");
  headB.mousePressed(toHead);
  bodyB = createButton("Body");
  bodyB.mousePressed(toBody);
  frontB = createButton("Front");
  frontB.mousePressed(toFront);
  profileB = createButton("Profile");
  profileB.mousePressed(toProfile);
  //frameRate(18)
  noLoop();
}

function draw() {
  background(255);
  push();
  translate(cameraj.x, cameraj.y);
  scale(cameraj.s);
  //translate(0,-cameraj.y)
  //scale(ef/4)
  push();
  translate(0, 0);
  var lhair= 25
  var lpulmon = 20
  
  if(cameraj.orbit=='front'){lhair=0;lpulmon=0}
  drawingContext.filter = 'blur(20px)';
  noStroke()
  fill(122)
  ellipse(0+lhair,-height/2.1,50,60)  
  drawingContext.filter = 'blur(0px)';
  fill(220);
  jpath2p5js(jsonpath1);  
  
  drawingContext.filter = 'blur(10px)';
  fill(244)
  ellipse(0+lpulmon,-height/3.2,40,40)
 
  pop();

  pop();
}
