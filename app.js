// 1,
// Convert given array [2, 4, 6, 8, 9, 15] to [4, 16, 64].
const numbers = [2, 4, 6, 8, 9, 15];
let firstNumber = numbers[0];
const lastNumber = numbers[numbers.length - 1];
//new array
const result = [];
//loop
while (firstNumber <= lastNumber) {
  if (numbers.indexOf(firstNumber) !== -1 ) {
    result.push(Math.pow(firstNumber, 2));
  }
  firstNumber *=  2; //find 2/ 4/ 8
}
console.log(result);
//------------------------------


//2.
//Another Example for 1.
const text = [ 3, 5, 6, 9, 10, 20];
let last = text[text.length-1];
let num = text[0];

const stock = [];

while(num <= last){
  // console.log(num);
  if(num%3 === 0){
    stock.push(num);};
  num *= 2;
}
console.log(stock);
//-------------------------------


// 3.
// Calculative cumulative ttl for given requests.
const requests = [
  {requestId: 't2', startedAt: 1489744808, ttl: 8},
  {requestId: 't3', startedAt: 1489744803, ttl: 3},
  {requestId: 't1', startedAt: 1489744806, ttl: 12},
  {requestId: 't4', startedAt: 1489744810, ttl: 1}
];

let min = requests[0].startedAt;
let max = 0;

requests.forEach(request => {
  const completeAt = request.startedAt + request.ttl;
  if (request.startedAt < min) {
    min = request.startedAt;
  }
  if (completeAt > max) {
    max = completeAt;
  }
});

const cummulativeTtl = (max - min);

console.log(cummulativeTtl);
//-----------------------------



//5.
// NODEJS , DETERMINE TYPE OF POLYGON

// Given a Polygons text file
// 1,3,1 2,2,2,2 4,5,6 2,4,2,4 4,2,3 3,4,2,6 8,8,8,8 5,5,6,6 2,4,3,5,4

 // count a value how many times in an array
function countValueInArray(array, niddle) {
    return array.filter(item => item == niddle).length;
}

 // read file
const fileText = [];

function readTextFile(file) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                // when text file content json : [["1,3,1"], ["2,2,2,2"], ["2,4,2,4"], ["4,2,3"], ["3,4,2,6"]]
                //fileText = JSON.parse(rawFile.responseText);

                // for line separated file
                fileText = rawFile.responseText.split('\n');
                //alert(fileText);
            }
        }
    }
    // rawFile.send(null);
}

// this will check whether it can make a triangle
function checkTriangle(set) {
    if (set.length != 3) {
        return false;
    }
    var a = parseInt(set[0]);
    var b = parseInt(set[1]);
    var c = parseInt(set[2]);

    if (((a + b) > c) && ((a + c) > b) && ((b + c) > a)) {
        return true;
    } else {
        return false;
    }
}

// this will check whether it can make a square
function checkSquare(set) {
    if (set.length != 4) {
        return false;
    }

    var a = parseInt(set[0]);
    var b = parseInt(set[1]);
    var c = parseInt(set[2]);
    var d = parseInt(set[3]);

    const equal = set.reduce(function(sum, val) {
        return val === set[0];
    });

    return equal;
}

/**
 * this will check whether it can make rectangle or not
 */
function checkRectangle(set) {
    if (set.length != 4) {
        return false;
    }

    var a = parseInt(set[0]);
    var b = parseInt(set[1]);
    var c = parseInt(set[2]);
    var d = parseInt(set[3]);
    // CONDITIONS
    if (((countValueInArray(set, a) == 2) && (countValueInArray(set, b) == 2)) || ((countValueInArray(set, c) == 2) && (countValueInArray(set, d) == 2)) || ((countValueInArray(set, a) == 2) && (countValueInArray(set, c) == 2)) || ((countValueInArray(set, a) == 2) && (countValueInArray(set, d) == 2)) || ((countValueInArray(set, b) == 2) && (countValueInArray(set, d) == 2)) || ((countValueInArray(set, b) == 2) && (countValueInArray(set, c) == 2))) {
        return true;
    } else {
        return false;
    }

}

// create polygons array
var polygons = [];
readTextFile('./polygons.txt');
//document.write(fileText.length);
fileText.forEach(function(p) {
    polygons.push(p);
});
//document.write(polygons[0]);
var triangles = [];
var squares = [];
var rectangles = [];
var others = [];
var finalResult;
// polygons loop of all sets
for (let i = 0; i < polygons.length; i++) {
    var set;
    set = polygons[i].split(',');
    //document.writeln(set.length);

    if (set.length == 3) {
        finalResult = checkTriangle(set);
        if (finalResult == true) {
            triangles.push(set);
        } else {
            others.push(set);
        }

    } else if (set.length == 4) {
        finalResult = checkSquare(set);
        if (finalResult == true) {
            squares.push(set);
            //rectangles.push(set);
        } else if (checkRectangle(set) == true) {
            rectangles.push(set);
        } else {
            others.push(set);
        }

    } else {
        others.push(set);
    }
}

/*let unionOfAll = new Set(triangles, squares, rectangles, others);
unionOfAll.forEach(function(set){
    document.writeln(set);
});*/
// as they are already mutually exclusive set/array
let unionOfAll = triangles.concat(squares.concat(triangles.concat(others)));

document.write("Original polygons txt file contents: <br>" + fileText.join("<br>") + "<br><hr><br>");

document.write("Mutually exclusive sets:-<br>");
document.write("Triangles: " + JSON.stringify(triangles) + "<br>");
document.write("Squares: " + JSON.stringify(squares) + "<br>");
document.write("Rectangles: " + JSON.stringify(rectangles) + "<br>");
document.write("Others: " + JSON.stringify(others) + "<br><hr><br>");

document.write("Union of all: " + JSON.stringify(unionOfAll) + "<br>");
//-------------------------------
