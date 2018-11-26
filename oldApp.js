
var message=document.getElementById('message');
message.innerHTML="Click on any picture to turn it. Try to click on another one and find a pair !";

var imagesTab = [
    "<img class='images' src='img/img1.jpg' id='1img'></img>",
    "<img class='images' src='img/img2.jpg' id='2img'></img>",
    "<img class='images' src='img/img3.jpg' id='3img'></img>",
    "<img class='images' src='img/img4.jpg' id='4img'></img>",
    "<img class='images' src='img/img5.jpg' id='5img'></img>",
    "<img class='images' src='img/img6.jpg' id='6img'></img>",
    "<img class='images' src='img/img7.jpg' id='7img'></img>",
    "<img class='images' src='img/img1.jpg' id='1simg'></img>",
    "<img class='images' src='img/img2.jpg' id='2simg'></img>",
    "<img class='images' src='img/img3.jpg' id='3simg'></img>",
    "<img class='images' src='img/img4.jpg' id='4simg'></img>",
    "<img class='images' src='img/img5.jpg' id='5simg'></img>",
    "<img class='images' src='img/img6.jpg' id='6simg'></img>",
    "<img class='images' src='img/img7.jpg' id='7simg'></img>"
    ]

imagesTab.sort(function(){
    return 0.5 - Math.random()
});

var openedSpots = 0;

var backside = function(spotId){
    spotId = parseInt(spotId);
    var spotById = document.getElementById('image'+spotId);
    spotById.style = "transform: rotateY(180deg)";
    spotById.removeEventListener('click', backside);
    openedSpots = openedSpots + 1;
    var numId = parseInt(spotId);
    numId -= 1;
    setTimeout(function(){
        spotById.innerHTML = imagesTab[numId]; 
    }, 500);
    var imgId = imagesTab[numId].substr(32,1);
    autoSpots(openedSpots,imgId,spotId);
}

var autoSpots = function(opened,imgId,spotId) {
    var imgTemp =0;
    var spotTemp =0;
    if(opened === 1){
        imgTemp = imgId;
        spotTemp = spotId;
    }
    else if(opened === 2 && checkIfSame(imgTemp,imgId)==true){
        openedSpots = 0;     
    }
    else if(opened === 2 && checkIfSame(imgTemp,imgId)==false){
        var spotById = document.getElementById('image'+spotId);
        spotById.style = "transform: rotateY(180deg)";
        spotById.addEventListener('click', backside);
        spotById.innerHTML = "<img class='images' src='backcard.png' onclick='backside("+spotId+")'></img>";
        var spotByIdSecond = document.getElementById('image'+spotTemp);
        spotByIdSecond.innerHTML = "<img class='images' src='backcard.png' onclick='backside("+spotTemp+")'></img>";
        spotByIdSecond.style = "transform: rotateY(180deg)";
        spotByIdSecond.addEventListener('click', backside);
        openedSpots = 0;
    }
}

var checkIfSame = function(firstId, secondId){
    if(firstId === secondId){
        return true;
    }
    else{
        return false;
    }
}