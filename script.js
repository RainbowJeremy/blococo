var music = new Audio("music/flowerdance.mp3")

function toggleRococo(){
  var body = document.getElementById("body");
    body.classList.toggle("rococo");
    if (music.paused){
      music.fastSeek(1);
      music.play();
    }
    else{
      music.pause();
    }
}


interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: 'parent',
        endOnly: true
      })
    ],
    // enable autoScroll
    autoScroll: true,

    listeners: {
      // call this function on every dragmove event
      move: dragMoveListener,

      // call this function on every dragend event
      end (event) {
        var textEl = event.target.querySelector('p')

        textEl && (textEl.textContent =
          'moved a distance of ' +
          (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                     Math.pow(event.pageY - event.y0, 2) | 0))
            .toFixed(2) + 'px')
      }
    }
  })

function dragMoveListener (event) {
  var target = event.target
  // keep the dragged position in the data-x/data-y attributes
  var x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
  var y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

  // translate the element
  target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

  // update the posiion attributes
  target.setAttribute('data-x', x)
  target.setAttribute('data-y', y)
}

// this function is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener

function toggleCursor(){
  var cursorStyle = document.body.style.cursor ;
  var status = cursorStyle == "crosshair";
  document.body.style.cursor = status? "auto" : "crosshair";
  return status
}


function drawBezier(firstPortId, secondPortId){ //args are strings of port IDs
  //create elements
  
  const CanvasId = "" + firstPortId + secondPortId;
  const divId = "div" + CanvasId;
  const lastDraw = document.getElementById(divId);

  if(lastDraw){
    console.log("lastDraw");
    console.log(lastDraw);
    lastDraw.parentNode.removeChild(lastDraw);
     
  }

  console.log("drawing bezier...");
  console.log("firstPortId");
  console.log(firstPortId);
  var firstPort = document.getElementById(firstPortId);
  var secondPort = document.getElementById(secondPortId);
  firstPort = firstPort.getElementsByTagName("svg")[0];
  secondPort = secondPort.getElementsByTagName("svg")[0];
  var div = document.createElement('div');
  div.className = "canvas-container"
  div.id =  divId;
  var canv = document.createElement('canvas');

  canv.id = CanvasId;
  
  const ports =[firstPort, secondPort];
  var RtoL = [];
  var UptoDown = [];
  for (const port of ports){
    const portBounds = port.getBoundingClientRect()
    const portmidX = portBounds.left + portBounds.width / 2;
    const portmidY = portBounds.top + portBounds.height / 2;

  }
  var firstPortRect = firstPort.getBoundingClientRect();
  var secondPortRect = secondPort.getBoundingClientRect();

  // Calculate the coordinates for the line
  firstPortRect.midx = firstPortRect.left + firstPortRect.width / 2;
  firstPortRect.midy =firstPortRect.top + firstPortRect.height / 2;
  secondPortRect.midx = secondPortRect.left + secondPortRect.width / 2;
  secondPortRect.midy = secondPortRect.top + secondPortRect.height / 2;

  var RtoL = (firstPortRect.midx < secondPortRect.midx)? [firstPortRect,secondPortRect]: [secondPortRect,firstPortRect];
  var UptoDown = (firstPortRect.midy < secondPortRect.midy)? [firstPortRect,secondPortRect]: [secondPortRect,firstPortRect];
  var portPositions = [RtoL,UptoDown];

  var width  = Math.abs(RtoL[1].midx - RtoL[0].midx);
  var height = Math.abs(UptoDown[1].midy - UptoDown[0].midy);
  canv.width = "" + width;
  canv.height = "" + height;
  div.appendChild(canv);
  document.body.appendChild(div);
  
 
  div.style.top    = UptoDown[0].midy + 1.5  + "px";
  div.style.left   = RtoL[0].midx + "px";
  div.style.width  = width + "px";
  div.style.height = height + 6 + "px";
  

  //canvas drawing logic
  var ctx = canv.getContext("2d");
//ctx.moveTo(0, 0);
//ctx.lineTo(200, 100);
  ctx.lineWidth = 3;

  ctx.beginPath();

//startX, startY
if (RtoL[0]==UptoDown[0]){
  var startX = 0;
  var startY =1.5;  
  var ctrlStartX = 97;
  var ctrlStartY =3;
  var ctrlEndX =width-94;
  var ctrlEndY=height+6;
  var endX = width;
  var endY= height-3;
}
else if (RtoL[0]==UptoDown[1]){
  var startX = 0;
  var endY =1.5;  
  var ctrlStartX = 97;
  var ctrlEndY =3;
  var ctrlEndX =width-94;
  var ctrlStartY=height+6;
  var endX = width;
  var startY= height-3;
}
  ctx.moveTo(startX,startY);
  ctx.bezierCurveTo(ctrlStartX, ctrlStartY, ctrlEndX, ctrlEndY, endX, endY);
  ctx.stroke();
}

class connectedPortsTracker{
  constructor(id1, id2) {
    this.id1 = id1;
    this.id2 = id2;
  }
};
var cpt = new connectedPortsTracker("","");
var connectedPortsList =[cpt];


function connectBlock(id){
  var isActive = toggleCursor();
  var connection = connectedPortsList[connectedPortsList.length-1];
  if (!connection.id1){
    connection.id1=id;
  } else if (!connection.id2){
    connection.id2=id;
  } 

  if (connection.id1 &&  connection.id2){    
    var id1 = connection.id1;
    console.log("var id1 = connection.id1;");
    console.log(id1);
    var id2 = connection.id2;

    drawBezier(id1, id2);

    var cpt = new connectedPortsTracker("", "");
    connectedPortsList.push(cpt);

  }
}



const config = { attributes: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(const mutation of mutationsList) {
        if (mutation.type === 'attributes') {
          if (mutation.attributeName === 'data-x' || mutation.attributeName === 'data-y') {
            var con = connectedPortsList;
            for(var i in con){

              drawBezier(con[i].id1, con[i].id2);
            }
          }
        }
    }
};


const targetNode = document.body; //can be a single element
const observer = new MutationObserver(callback);
observer.observe(targetNode, config);


function fade(element) {
  var op = 1;  // initial opacity
  var timer = setInterval(function () {
      if (op <= 0.1){
          clearInterval(timer);
          element.style.visibility = 'hidden';
      }
      element.style.opacity = op;
      element.style.filter = 'alpha(opacity=' + op * 100 + ")";
      op -= op * 0.2;
  }, 25);
}

function copyToClipboard(copyText){
  console.log("copyText");

  // Get the text field
  //var copyText = document.getElementById("myInput");
  console.log("copyText");
  console.log(copyText.parentNode);
  // Select the text field
  //copyText.select(); // For mobile devices
  //copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.innerText);
  var a = copyText.parentNode.getElementsByClassName("popup")[0];
  a.style.visibility="visible";
  fade(a)


}

