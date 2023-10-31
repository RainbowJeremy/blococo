var portCounter= 7;
var blockCounter= 2;

function addBlock(el){
    const block = document.getElementById("drag-1");
    const clone = block.cloneNode(true);

    var heading = clone.getElementsByClassName("block-heading")[0];
    heading.classList.add(el.classList[2]);
    heading.getElementsByTagName("span")[0].innerHTML = el.getElementsByTagName("span")[0].innerHTML 

    blockCounter++;
    clone.id = blockCounter +  "activeBlock";
    clone.style.visibility = "visible";
    clone.style.display = "block";


    var ports = clone.getElementsByClassName("icon-port");
    for (i in ports){
        portCounter ++;
        ports[i].id = "port" + portCounter;

    }
    const drawBoard = document.getElementById("drawBoard");
    drawBoard.appendChild(clone);
    
}

var colors = ["#9B59B6","#229954",
            "#C0392B","#3498DB",
            "#F4D03F",];

var inputColorCounter = 0;
var outputColorCounter = 0;


function addInputBlock(el){
    const block = document.getElementById("inputblock1");
    const clone = block.cloneNode(true);

    blockCounter++;
    clone.id = "inputBlock" + blockCounter;
    clone.style.display = "block";
    clone.getElementsByTagName("svg")[0].style.fill = colors[inputColorCounter];
    inputColorCounter ++;
    inputColorCounter = inputColorCounter % 5;

    const drawBoard = document.getElementById("drawBoard");
    drawBoard.appendChild(clone);

}

function addOutputBlock(el){
    const block = document.getElementById("outputblock1");
    const clone = block.cloneNode(true);

    blockCounter++;
    clone.id =   "outputBlock" + blockCounter;
    clone.style.display = "block";
    clone.style.marginLeft = "50vw";

    clone.getElementsByTagName("svg")[0].style.fill = colors[outputColorCounter];
    outputColorCounter ++;
    outputColorCounter = outputColorCounter % 5;

    const drawBoard = document.getElementById("drawBoard");

    drawBoard.appendChild(clone);

}