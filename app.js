var message=document.getElementById('message');
message.innerHTML="Click on any picture to turn it. Try to click on another one and find a pair !";

var imagesTab = [
    "<img id='1' class='images' src='img/img1.jpg'></img>",
    "<img id='2' class='images' src='img/img2.jpg'></img>",
    "<img id='3' class='images' src='img/img3.jpg'></img>",
    "<img id='4' class='images' src='img/img4.jpg'></img>",
    "<img id='5' class='images' src='img/img5.jpg'></img>",
    "<img id='6' class='images' src='img/img6.jpg'></img>",
    "<img id='7' class='images' src='img/img7.jpg'></img>",
    "<img id='21' class='images' src='img/img1.jpg'></img>",
    "<img id='22' class='images' src='img/img2.jpg'></img>",
    "<img id='23' class='images' src='img/img3.jpg'></img>",
    "<img id='24' class='images' src='img/img4.jpg'></img>",
    "<img id='25' class='images' src='img/img5.jpg'></img>",
    "<img id='26' class='images' src='img/img6.jpg'></img>",
    "<img id='27' class='images' src='img/img7.jpg'></img>"
    ];

imagesTab.sort(function(){
    return 0.5 - Math.random();
});

var openedSpots =0;
var imgTemp =0;
var spotTemp =0;
var good =0;
var takes =0;

var backside = function(spotId){
    takes += 1;
    var spotById = document.getElementById('image'+spotId);
    spotById.style = "transform: rotateY(180deg)";
    var numId = parseInt(spotId);
    numId -= 1;
    var imgId = parseInt(imagesTab[numId].substr(9,2));
    setTimeout(function(){
        openedSpots += 1;
        spotById.innerHTML = imagesTab[numId]; 
        testSpots(openedSpots,imgId,spotId);
    }, 500);
};


var testSpots = function(openedSpots,imgId,spotId) {
    if(openedSpots === 1){
        imgTemp = imgId;
        spotTemp = spotId;
    }
    else if(openedSpots === 2){
        setTimeout(function(){
            compare(imgId,spotId,imgTemp,spotTemp);
        }, 1500);
    }
};

var compare = function(imgId,spotId,imgTemp,spotTemp) {
    if(imgId === (imgTemp+20) || imgTemp === (imgId+20)){
        good +=1;
        message.innerHTML="You got it, "+good+" pair(s) found.";
        openedSpots = 0;
        testwin(good,takes);
    }
    else{
        var spotById = document.getElementById('image'+spotId);
        spotById.style = "transform: rotateY(360deg)";
        setTimeout(function(){
            spotById.innerHTML = "<img class='images' src='backcard.png' onclick='backside("+spotId+")'></img>";
        }, 500);
        var spotByIdSecond = document.getElementById('image'+spotTemp);
        setTimeout(function(){
            spotByIdSecond.innerHTML = "<img class='images' src='backcard.png' onclick='backside("+spotTemp+")'></img>";
        }, 500);
        spotByIdSecond.style = "transform: rotateY(360deg)";
        openedSpots = 0;
    }
};

var testwin = function(good,takes) {
    if(good===7){
        message.innerHTML="You won, congratulations ! You did it in "+takes+" takes. <br>Do you want to play again ? <a style='color:blue;cursor:pointer;' onclick='reset()'>Click here</a> then.";
    }
};

var reset = function(){
    openedSpots =0;
    imgTemp =0;
    spotTemp =0;
    good =0;
    takes =0;
    message.innerHTML="Here you go again.";
    for(i=0;i<15;i++){
        var spot = document.getElementById('image'+(i+1));
        spot.style = "transform: rotateY(360deg)";
        spot.innerHTML = "<img class='images' src='backcard.png' onclick='backside("+(i+1)+")'></img>";
    }
    imagesTab.sort(function(){
        return 0.5 - Math.random();
    });
};