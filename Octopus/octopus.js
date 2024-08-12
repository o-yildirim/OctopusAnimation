
var canvas;
var gl;
var program;


var instanceMatrix;

var initialZpos = 35;
var xPos = 0;
var yPos = 0;
var zPos = initialZpos;
var moveSpeed = 0.1;
var xAngle = 0;
var yAngle = 0;

const radius = 3;
const latitudeBands = 30;
const longitudeBands = 30;

const radius2 = 0.7;

var modelViewMatrix;
var modelViewMatrixLoc;
var projectionMatrix;
var projectionMatrixLoc;
var eye = vec3(xPos,yPos,zPos);
const at = vec3(0.0, 0.0, 0.0);
const up = vec3(0.0, 1.0, 0.0);
var fovy = 45 //Default in WebGL
var aspect = 1 //Default in WebGL
var near = 0.1 //Default in WebGL
var far = 2000 //Default in WebGL

var vertices = [

    vec4( -0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5,  0.5,  0.5, 1.0 ),
    vec4( 0.5, -0.5,  0.5, 1.0 ),
    vec4( -0.5, -0.5, -0.5, 1.0 ),
    vec4( -0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5,  0.5, -0.5, 1.0 ),
    vec4( 0.5, -0.5, -0.5, 1.0 )
];
var vertices2 = [];
var colors2 = [];


var red3d = [1,0,0];
var green3d = [1,1,1];

var vertices3 = [];
var colors3 = [];
var red = [
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
    vec3(1.0, 0,0, 0.0),
];

var green = [
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
    vec3(0.0, 1,0, 1.0),
];

var black = [
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
    vec3(0.0, 0,0, 1.0),
];



var headIdX = 0;
var headIdY = 1;
var headIdZ = 2;

var uLegId1 = 3;
var mLegId1 = 4;
var lLegId1 = 5;

var uLegId2 = 6;
var mLegId2 = 7;
var lLegId2 = 8;

var uLegId3 = 9;
var mLegId3 = 10;
var lLegId3 = 11;

var uLegId4 = 12;
var mLegId4 = 13;
var lLegId4 = 14;

var uLegId5 = 15;
var mLegId5 = 16;
var lLegId5 = 17;

var uLegId6 = 18;
var mLegId6 = 19;
var lLegId6 = 20;

var uLegId7 = 21;
var mLegId7 = 22;
var lLegId7 = 23;

var uLegId8 = 24;
var mLegId8 = 25;
var lLegId8 = 26;





var headHeight = 3.5;
var headWidth = 5;
var upperLegHeight = 3.0
var upperLegWidth = 0.5
var middleLegHeight = 2.5
var middleLegWidth = 0.325
var lowerLegHeight = 2
var lowerLegWidth = 0.25


var numNodes = 27;
var numAngles = 27;


var theta = [
            90,0,0, //Head
            90,0,0, //First leg
            90,0,0, //Second leg
            90,0,0, //Third leg
            90,0,0, //Fourth leg
            90,0,0, //Fifth leg
            90,0,0, //Sicth leg
            90,0,0, //Seventh leg
            90,0,0, //Eigthth leg
];

var theta_backup = [...theta];

var keyframe_thetas=[];
var keyframe_thetas_backup = [];



var headPos = [0,0,0];

var headPos_backup = [...headPos];

var keyframe_headPositions = [];
var keyframe_headPositions_backup = [];



var animSpeed = 2;
var startTime = null;
var endTime = null;
var looping = true;
var animating = false;

var numVertices = 25;

var stack = [];

var figure = [];

for( var i=0; i<numNodes; i++) figure[i] = createNode(null, null, null, null);

var vBuffer;
var modelViewLoc;
var bufferColors;
var color = red;

var pointsArray = [];

//-------------------------------------------

function scale4(a, b, c) {
   var result = mat4();
   result[0][0] = a;
   result[1][1] = b;
   result[2][2] = c;
   return result;
}

//--------------------------------------------


function positionCamera()
{

    var newX = Math.cos(yAngle) * Math.sin(xAngle);
    var newY = Math.sin(yAngle);
    var newZ = Math.cos(yAngle) * Math.cos(xAngle);

    eye = vec3(newX, newY, newZ); 
    eye[0] *= initialZpos; 
    eye[1] *= initialZpos;
    eye[2] *= initialZpos;


    modelViewMatrix = lookAt(eye, at, up);
    projectionMatrix = perspective(fovy, aspect, near, far);
}

function head() {
   
    color = red;

    instanceMatrix = mult(modelViewMatrix, translate(-2,  2, 0.5 ));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix)); 
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferColors);
    gl.bufferSubData(gl.ARRAY_BUFFER, 24*16, flatten(colors2));

    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 24 * 16, flatten(vertices2));
    gl.drawArrays(gl.TRIANGLES, 24, vertices2.length);


    color = green;

    instanceMatrix = mult(modelViewMatrix, translate(-1, 4.5, 0 ));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix)); 
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferColors);
    gl.bufferSubData(gl.ARRAY_BUFFER, (24 +colors2.length) *16, flatten(colors3));
    
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, (24 +vertices2.length)* 16, flatten(vertices3));
    gl.drawArrays(gl.TRIANGLES, 24 +vertices2.length, vertices3.length);

    instanceMatrix = mult(modelViewMatrix, translate(-3,  4.4, 0.0 ));
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix)); 
    gl.drawArrays(gl.TRIANGLES, 24 +vertices2.length, vertices3.length);


    color = black;
    instanceMatrix = mult(modelViewMatrix, translate(-2,  4.4, 1.5 ));
	instanceMatrix = mult(instanceMatrix, scale4(1.5, 1, 0.4) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix)); 
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferColors);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, flatten(color));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);

   
    
}

function uLeg(){
    color = red;

    instanceMatrix = mult(modelViewMatrix, translate(0.0,  0.5*upperLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(upperLegWidth, upperLegHeight, upperLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferColors);
    gl.bufferSubData(gl.ARRAY_BUFFER,0 , flatten(color));

    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);

}


function mLeg(){
    color = red;

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * middleLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(middleLegWidth, middleLegHeight, middleLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferColors);
    gl.bufferSubData(gl.ARRAY_BUFFER,0 , flatten(color));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);

}

function lLeg(){
    color = red;

    instanceMatrix = mult(modelViewMatrix, translate(0.0, 0.5 * lowerLegHeight, 0.0) );
	instanceMatrix = mult(instanceMatrix, scale4(lowerLegWidth, lowerLegHeight, lowerLegWidth) );
    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(instanceMatrix));
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferColors);
    gl.bufferSubData(gl.ARRAY_BUFFER,0 , flatten(color));
    for(var i =0; i<6; i++) gl.drawArrays(gl.TRIANGLE_FAN, 4*i, 4);
    

}


function createNode(transform, render, sibling, child){
    var node = {
    transform: transform,
    render: render,
    sibling: sibling,
    child: child,
    }
    return node;
}

function initNodes(Id) {

    var m = mat4();
    
    switch(Id) {
    
    case headIdX: 
    case headIdY:
    case headIdZ:
        m = rotate(theta[headIdX], 1, 0, 0);
        m = mult(m,rotate(theta[headIdY], 0, 1, 0));
        m = mult(m,rotate(theta[headIdZ], 0, 0, 1));

        m = mult(m,translate(headPos[0], headPos[1], headPos[2]));
        figure[headIdX] = createNode( m, head, null, uLegId1);
        break;   
    
    case uLegId1:
        m = translate(-3, 0.5, upperLegHeight/2 + 0.8);
        m = mult(m, rotate(145, 0, 0, 1));
        m = mult(m, rotate(theta[uLegId1], 1, 0, 0)); 
       
        
        figure[uLegId1] = createNode( m, uLeg, uLegId2, mLegId1 );
        break;
    
    case uLegId2:
        
        m = translate(-2, 0.5, upperLegHeight/2 + 0.8);
        m = mult(m, rotate(180, 0, 0, 1));
        m = mult(m, rotate(theta[uLegId2], 1, 0, 0)); 

        figure[uLegId2] = createNode( m, uLeg, uLegId3, mLegId2 );
        break;
    
    case uLegId3:
        m = translate(-1, 0.5, upperLegHeight/2 + 0.8);
        m = mult(m, rotate(225, 0, 0, 1));
        m = mult(m, rotate(theta[uLegId3], 1, 0, 0)); 

        figure[uLegId3] = createNode( m, uLeg, uLegId4, mLegId3 );
        break;
    
    case uLegId4:
        m = translate(-1.0, 3.0, upperLegHeight/2 + 0.8);
        m = mult(m, rotate(-45, 0, 0, 1));
        m = mult(m, rotate(theta[uLegId4], 1, 0, 0)); 


        figure[uLegId4] = createNode( m, uLeg, uLegId5, mLegId4 );
        break;

    case uLegId5:
        m = translate(-2.0, 3.0, upperLegHeight/2 +0.8);
        m = mult(m, rotate(0, 0, 0, 1));
        m = mult(m, rotate(theta[uLegId5], 1, 0, 0)); 

        figure[uLegId5] = createNode( m, uLeg, uLegId6, mLegId5 );
        break;
    case uLegId6:
        m = translate(-3, 3.0, upperLegHeight/2 + 0.8);
        m = mult(m, rotate(35, 0, 0, 1));
        m = mult(m, rotate(theta[uLegId6], 1, 0, 0)); 

 
        figure[uLegId6] = createNode( m, uLeg, uLegId7, mLegId6 );
        break;
    
    case uLegId7:

        m = translate(0, 1.75, upperLegHeight/2 + 0.8);
        m = mult(m, rotate(-90, 0, 0, 1));
        m = mult(m, rotate(theta[uLegId7], 1, 0, 0)); 
 
        figure[uLegId7] = createNode( m, uLeg, uLegId8, mLegId7 );
        break
    
    case uLegId8:
        m = translate(-4, 1.75, upperLegHeight/2 + 0.8);
        m = mult(m, rotate(90, 0, 0, 1));
        m = mult(m, rotate(theta[uLegId8], 1, 0, 0)); 

        figure[uLegId8] = createNode( m, uLeg, null, mLegId8);
        break

    



    case mLegId1:
        m = translate(0.0, upperLegHeight, 0.0);
        m = mult(m, rotate(theta[mLegId1], 1, 0, 0)); 
        
        figure[mLegId1] = createNode( m, mLeg, null, lLegId1 );
        break;
    
    case mLegId2:
        m = translate(0.0, upperLegHeight, 0.0);
        m = mult(m, rotate(theta[mLegId2], 1, 0, 0)); 
        figure[mLegId2] = createNode( m, mLeg, null, lLegId2 );
        break;
        
    case mLegId3:
        m = translate(0.0, upperLegHeight, 0.0);
        m = mult(m, rotate(theta[mLegId3], 1, 0, 0)); 
        figure[mLegId3] = createNode( m, mLeg, null, lLegId3 );
        break;
        
    case mLegId4:
        m = translate(0.0, upperLegHeight, 0.0);
        m = mult(m, rotate(theta[mLegId4], 1, 0, 0)); 
        figure[mLegId4] = createNode( m, mLeg, null, lLegId4 );
        break;
    
    case mLegId5:
        m = translate(0.0, upperLegHeight, 0.0);
        m = mult(m, rotate(theta[mLegId5], 1, 0, 0)); 
        figure[mLegId5] = createNode( m, mLeg, null, lLegId5 );
        break;

    case mLegId6:
        m = translate(0.0, upperLegHeight, 0.0);
        m = mult(m, rotate(theta[mLegId6], 1, 0, 0)); 
        figure[mLegId6] = createNode( m, mLeg, null, lLegId6 );
        break;
        
    case mLegId7:
        m = translate(0.0, upperLegHeight, 0.0);
        m = mult(m, rotate(theta[mLegId7], 1, 0, 0)); 
        figure[mLegId7] = createNode( m, mLeg, null, lLegId7 );
        break
        
    case mLegId8:
        m = translate(0.0, upperLegHeight, 0.0);
        m = mult(m, rotate(theta[mLegId8], 1, 0, 0)); 
        figure[mLegId8] = createNode( m, mLeg, null, lLegId8);
        break


    
    
    case lLegId1:
        m = translate(0.0, middleLegHeight, 0.0);
        m = mult(m, rotate(theta[lLegId1], 1, 0, 0)); 
        figure[lLegId1] = createNode( m, lLeg, null, null );
        break;
    
    case lLegId2:
        m = translate(0.0, middleLegHeight, 0.0);
        m = mult(m, rotate(theta[lLegId2], 1, 0, 0)); 
        figure[lLegId2] = createNode( m, lLeg, null, null );
        break;
    
    case lLegId3:
        m = translate(0.0, middleLegHeight, 0.0);
        m = mult(m, rotate(theta[lLegId3], 1, 0, 0)); 
        figure[lLegId3] = createNode( m, lLeg, null, null );
        break;
        
    case lLegId4:
        m = translate(0.0, middleLegHeight, 0.0);
        m = mult(m, rotate(theta[lLegId4], 1, 0, 0)); 
        figure[lLegId4] = createNode( m, lLeg, null, null );
        break;
    
    case lLegId5:
        m = translate(0.0, middleLegHeight, 0.0);
        m = mult(m, rotate(theta[lLegId5], 1, 0, 0)); 
        figure[lLegId5] = createNode( m, lLeg, null, null );
        break;
    
    case lLegId6:
        m = translate(0.0, middleLegHeight, 0.0);
        m = mult(m, rotate(theta[lLegId6], 1, 0, 0)); 
        figure[lLegId6] = createNode( m, lLeg, null, null );
        break;
        
    case lLegId7:
        m = translate(0.0, middleLegHeight, 0.0);
        m = mult(m, rotate(theta[lLegId7], 1, 0, 0)); 
        figure[lLegId7] = createNode( m, lLeg, null, null );
        break
        
    case lLegId8:
        m = translate(0.0, middleLegHeight, 0.0);
        m = mult(m, rotate(theta[lLegId8], 1, 0, 0)); 
        figure[lLegId8] = createNode( m, lLeg, null, null);
        break

    
    }    
}

function saveKeyframe(){
    var keyframe = [];
    for(let i = 0; i< theta.length;i++){
        keyframe.push(theta[i]);
    }
    keyframe_thetas.push(keyframe)
    keyframe = [];
    for(let i = 0; i< headPos.length;i++){
        keyframe.push(headPos[i]);
    }
    keyframe_headPositions.push(keyframe);

}



function animate(timestamp) {
    if(!animating) return;

    if (!startTime) {
        startTime = timestamp;
    }

    if (!endTime) {
        endTime = startTime + 1000 / animSpeed;
    }

    const progress = (timestamp - startTime) / (endTime - startTime);

    if (progress >= 1.0) {
        startTime = null;
        endTime = null;
        keyframe_thetas.shift();
        keyframe_headPositions.shift();

        if (keyframe_thetas.length == 1) 
        { 
            if(!looping){
                stopAnimation();
                return;
            }
            keyframe_thetas = [...keyframe_thetas_backup];
            keyframe_headPositions = [...keyframe_headPositions_backup]
        }

        requestAnimationFrame(animate);
        return;
    }

    const keyframeHead0 = keyframe_headPositions[0];
    const keyframeHead1 = keyframe_headPositions[1];

    if(keyframeHead0 != null && keyframeHead1 != null){
        for (let j = 0; j < keyframeHead0.length; j++) {
            if (keyframeHead0[j] != null && 
                keyframeHead1[j] != null) {
                headPos[j] = lerp(keyframeHead0[j], keyframeHead1[j], progress);
                initNodes(headIdX);
            }
        }
    }
    

    const keyframe0 = keyframe_thetas[0];
    const keyframe1 = keyframe_thetas[1];

    if(keyframe0 != null && keyframe1 != null){
        for (let j = 0; j < keyframe0.length; j++) {
            if (keyframe0[j] != null && 
                keyframe1[j] != null) {
                theta[j] = lerp(keyframe0[j], keyframe1[j], progress);
                initNodes(j);
            }
        }
    }

    requestAnimationFrame(animate);
}



function lerp(start, end, progress) {
    return start + (end - start) * progress;
}



function startAnimation() {
    if (keyframe_thetas.length >= 2) {
        keyframe_thetas_backup = [...keyframe_thetas];
        keyframe_headPositions_backup = [...keyframe_headPositions];
        animating = true;
        requestAnimationFrame(animate);
    } 
}


var render = function() {

    gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );

    traverse(headIdX);
    requestAnimFrame(render);
}
function traverse(Id) {
    if(Id == null) return; 
    stack.push(modelViewMatrix);
    modelViewMatrix = mult(modelViewMatrix, figure[Id].transform);
    figure[Id].render();
   
    if(figure[Id].child != null) traverse(figure[Id].child); 
     modelViewMatrix = stack.pop();
   
    if(figure[Id].sibling != null) traverse(figure[Id].sibling); 
    positionCamera();
 }



function sphere(points, colors,radius,color3d)
{
    for (let latNumber = 0; latNumber < latitudeBands; latNumber++) {
        for (let longNumber = 0; longNumber < longitudeBands; longNumber++) {
            const theta = (latNumber * Math.PI) / latitudeBands;
            const phi = (longNumber * 2 * Math.PI) / longitudeBands;
            const nextTheta = ((latNumber + 1) * Math.PI) / latitudeBands;
            const nextPhi = ((longNumber + 1) * 2 * Math.PI) / longitudeBands;

            const x1 = Math.sin(theta) * Math.cos(phi);
            const y1 = Math.cos(theta);
            const z1 = Math.sin(theta) * Math.sin(phi);

            const x2 = Math.sin(theta) * Math.cos(nextPhi);
            const y2 = Math.cos(theta);
            const z2 = Math.sin(theta) * Math.sin(nextPhi);

            const x3 = Math.sin(nextTheta) * Math.cos(phi);
            const y3 = Math.cos(nextTheta);
            const z3 = Math.sin(nextTheta) * Math.sin(phi);

            const x4 = Math.sin(nextTheta) * Math.cos(nextPhi);
            const y4 = Math.cos(nextTheta);
            const z4 = Math.sin(nextTheta) * Math.sin(nextPhi);

            points.push(vec4(radius*x1,radius*y1,radius*z1,1.0));
            points.push(vec4(radius*x2,radius*y2,radius*z2,1.0));
            points.push(vec4(radius*x4,radius*y4,radius*z4,1.0));

            points.push(vec4(radius*x1,radius*y1,radius*z1,1.0));
            points.push(vec4(radius*x3,radius*y3,radius*z3,1.0));
            points.push(vec4(radius*x4,radius*y4,radius*z4,1.0));
            
            colors.push(color3d);
            colors.push(color3d);
            colors.push(color3d);
            colors.push(color3d);
            colors.push(color3d);
            colors.push(color3d);
        
        }
    }
}





window.onload = function init() 
{
    sphere(vertices2,colors2,radius,red3d);
    sphere(vertices3,colors3,radius2,green3d);

    canvas = document.getElementById( "gl-canvas" );
    
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }
    gl.enable(gl.DEPTH_TEST);
    
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.5, 0.803, 1.0, 1.0 );

    document.getElementById('upload').addEventListener('change', (event) => {
        var fileText = ""  
        const selectedFile = event.target.files[0];
        
        if (selectedFile) {
        
            const reader = new FileReader();  
            reader.onload = function (e) {
            fileText = e.target.result;
                upload(fileText)
            };
        
            reader.readAsText(selectedFile);
        } 
    });
    
    document.addEventListener("keydown", function (event) {

    if(event.key == "a" ||event.key == "A"){
        xAngle = (xAngle + moveSpeed );
    }
    else if(event.key == "d" || event.key == "D"){
        xAngle = (xAngle - moveSpeed ); 
    }

    if(event.key == "w" || event.key == "W"){
        yAngle = (yAngle + moveSpeed);
    }
    else if(event.key == "s" || event.key == "S"){
        yAngle =(yAngle - moveSpeed);
    }
    positionCamera();
    });


    program = initShaders( gl, "vertex-shader", "fragment-shader");
    
    gl.useProgram( program);

    instanceMatrix = mat4();
    
    projectionMatrix = perspective(fovy, aspect, near, far);
    modelViewMatrix = mat4();

        
    gl.uniformMatrix4fv(gl.getUniformLocation( program, "modelViewMatrix"), false, flatten(modelViewMatrix) );
    gl.uniformMatrix4fv( gl.getUniformLocation( program, "projectionMatrix"), false, flatten(projectionMatrix) );
    
    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix")
    
    cube();




    bufferColors = gl.createBuffer();    
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferColors );
    gl.bufferData(gl.ARRAY_BUFFER, 16*60000, gl.STATIC_DRAW);

    gl.bufferSubData(gl.ARRAY_BUFFER, 0,flatten(color));
    var vColor = gl.getAttribLocation(program,"vColor");
    gl.vertexAttribPointer( vColor, 3, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor );

  

    vBuffer = gl.createBuffer();    
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer );
    gl.bufferData(gl.ARRAY_BUFFER, 16*60000, gl.STATIC_DRAW);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0,flatten(pointsArray));
    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition );
    
       //-----------------------------------------HEAD----------------------------
    document.getElementById("sliderRotX").onchange = function() {
        theta[headIdX] = event.srcElement.value;
        initNodes(headIdX);
    };
    document.getElementById("sliderRotY").onchange = function() {
        theta[headIdY] = event.srcElement.value;
        initNodes(headIdY);
    };
    document.getElementById("sliderRotZ").onchange = function() {
        theta[headIdZ] = event.srcElement.value;
        initNodes(headIdZ);
    };


    document.getElementById("sliderHeadX").onchange = function() {
        headPos[0] = event.srcElement.value;
        initNodes(headIdX);
    };
    document.getElementById("sliderHeadY").onchange = function() {
        headPos[1] = event.srcElement.value;
        initNodes(headIdX);
    };
    document.getElementById("sliderHeadZ").onchange = function() {
        headPos[2] = event.srcElement.value;
        initNodes(headIdX);
    };

    //-----------------------------------------UPPER LEGS----------------------------
    document.getElementById("slider1").onchange = function() {
        theta[uLegId1] = event.srcElement.value;
        initNodes(uLegId1);
        
    };

    document.getElementById("slider2").onchange = function() {
         theta[uLegId2] = event.srcElement.value;
         initNodes(uLegId2);
    };
    document.getElementById("slider3").onchange = function() {
         theta[uLegId3] =  event.srcElement.value;
         initNodes(uLegId3);
    };
     
        document.getElementById("slider4").onchange = function() {
        theta[uLegId4] = event.srcElement.value;
        initNodes(uLegId4);
    };
    document.getElementById("slider5").onchange = function() {
         theta[uLegId5] =  event.srcElement.value;
         initNodes(uLegId5);
    };
        document.getElementById("slider6").onchange = function() {
        theta[uLegId6] = event.srcElement.value;
        initNodes(uLegId6);
    };
    document.getElementById("slider7").onchange = function() {
         theta[uLegId7] = event.srcElement.value;
         initNodes(uLegId7);
    };
    document.getElementById("slider8").onchange = function() {
         theta[uLegId8] =  event.srcElement.value;
         initNodes(uLegId8);
    };

    //-----------------------------------------MIDDLE LEGS----------------------------
    document.getElementById("slider9").onchange = function() {
        theta[mLegId1] = event.srcElement.value;
        initNodes(mLegId1);
    };
    document.getElementById("slider10").onchange = function() {
         theta[mLegId2] = event.srcElement.value;
         initNodes(mLegId2);
    };
    document.getElementById("slider11").onchange = function() {
        theta[mLegId3] = event.srcElement.value;
        initNodes(mLegId3);
   };
    document.getElementById("slider12").onchange = function() {
        theta[mLegId4] = event.srcElement.value;
        initNodes(mLegId4);
    };
    document.getElementById("slider13").onchange = function() {
        theta[mLegId5] = event.srcElement.value;
        initNodes(mLegId5);
    };
    document.getElementById("slider14").onchange = function() {
        theta[mLegId6] = event.srcElement.value;
        initNodes(mLegId6);
    };
    document.getElementById("slider15").onchange = function() {
        theta[mLegId7] = event.srcElement.value;
        initNodes(mLegId7);
    };
    document.getElementById("slider16").onchange = function() {
        theta[mLegId8] = event.srcElement.value;
        initNodes(mLegId8);
    };
     //-----------------------------------------LOWER LEGS----------------------------
     document.getElementById("slider17").onchange = function() {
        theta[lLegId1] = event.srcElement.value;
        initNodes(lLegId1);
    };
    document.getElementById("slider18").onchange = function() {
        theta[lLegId2] = event.srcElement.value;
        initNodes(lLegId2);
    };
    document.getElementById("slider19").onchange = function() {
        theta[lLegId3] = event.srcElement.value;
        initNodes(lLegId3);
    };
    document.getElementById("slider20").onchange = function() {
        theta[lLegId4] = event.srcElement.value;
        initNodes(lLegId4);
    };
    document.getElementById("slider21").onchange = function() {
        theta[lLegId5] = event.srcElement.value;
        initNodes(lLegId5);
    };
    document.getElementById("slider22").onchange = function() {
        theta[lLegId6] = event.srcElement.value;
        initNodes(lLegId6);
    };
    document.getElementById("slider23").onchange = function() {
        theta[lLegId7] = event.srcElement.value;
        initNodes(lLegId7);
    };
    document.getElementById("slider24").onchange = function() {
        theta[lLegId8] = event.srcElement.value;
        initNodes(lLegId8);
    };

    document.getElementById("slideranimspeed").onchange = function() {
        animSpeed = event.srcElement.value;
   };



    for(i=0; i<numNodes; i++) initNodes(i);
  
    render();
}


function download(){
    var filenameInput = document.getElementById("filename");

    var filename = filenameInput.value;
    if(filename == null || filename.length == 0){
        window.alert("Please enter a file name!");
        return
    }
    animSpeed = document.getElementById("slideranimspeed").value;
    var save_text = animSpeed + "\n";
    
    for(let i = 0; i< keyframe_headPositions.length;i++){
        var headPositions = keyframe_headPositions[i];
        for(let j = 0; j < headPositions.length; j++){
            save_text += headPositions[j];
            if(j != headPositions.length-1){
                save_text += " ";
            }
        }
        if(i != keyframe_headPositions.length-1){
            save_text += "\n";
        }
    }
    save_text += "\n";
   
    for(let i = 0; i< keyframe_thetas.length;i++){
        var thetaValues = keyframe_thetas[i];
        for(let j = 0; j < thetaValues.length; j++){
            save_text += thetaValues[j];
            if(j != thetaValues.length-1){
                save_text += " ";
            }
        }
        if(i != keyframe_thetas.length-1){
            save_text += "\n";
        }
    }


    const link = document.createElement("a");
    const file = new Blob([save_text], { type: 'text/plain' });
    link.href = URL.createObjectURL(file);
    link.download = filename +".txt";
    link.click();
    URL.revokeObjectURL(link.href);
}

function upload(text){
    keyframe_thetas = [];
    keyframe_thetas_backup = [];
    keyframe_headPositions = [];
    keyframe_headPositions_backup = [];

    var splitted_text = text.split("\n");
    animSpeed = parseFloat(splitted_text[0]);
    document.getElementById("slideranimspeed").value = animSpeed;
    splitted_text.shift();
    for(let i = 0; i< splitted_text.length;i++){
        var thetas_chars = splitted_text[i].split(" ");
        if(thetas_chars.length != 3){
            var temp_thetas = [];
            for(let j = 0; j<thetas_chars.length;j++){
                temp_thetas.push(parseInt(thetas_chars[j]));
            }
            keyframe_thetas.push(temp_thetas);
        }
        else{
            var temp_headPositions = [];
            for(let j = 0; j<thetas_chars.length;j++){
                temp_headPositions.push(parseFloat(thetas_chars[j]));
            }
            keyframe_headPositions.push(temp_headPositions);
        }
    }

}


function quad(a, b, c, d) {
    pointsArray.push(vertices[a]); 
    pointsArray.push(vertices[b]); 
    pointsArray.push(vertices[c]);     
    pointsArray.push(vertices[d]);    
}


function cube()
{
   quad( 1, 0, 3, 2 );
   quad( 2, 3, 7, 6 );
   quad( 3, 0, 4, 7 );
   quad( 6, 5, 1, 2 );
   quad( 4, 5, 6, 7 );
   quad( 5, 4, 0, 1 );
}

function stopAnimation(){
    animating = false;
    theta = [...theta_backup];
    headPos = [...headPos_backup];
    keyframe_thetas = [...keyframe_thetas_backup];
    keyframe_headPositions = [...keyframe_headPositions_backup];
    initNodes(headIdX);
}

function enableDisableLooping(click){
    looping = click.checked;
}




