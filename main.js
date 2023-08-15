rwristx = 0;
lwristx = 0;
rwristy = 0;
lwristy = 0;
scorel = 0;
scorer = 0;


function preload(){
    music = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(700,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose',gotPoses)
}
function modelLoaded()
{
    console.log("modelLoaded")
}
function draw(){
    image(video, 0, 0, 700, 500);
    fill("White");
    stroke("blue");
    if(scorel >= 0.3){
        circle(lwristx,lwristy,20);
        d = floor(Number(lwristy))
        result = d/500;
        music.setVolume(result);
        document.getElementById("volume").innerHTML = "Volume : "+result;
    }
    else if(scorer >= 0.3 )
    {
        circle(rwristx,rwristy,20);
        checkrw()
    }
}
function play()
{
    music.play();
    music.setVolume(1);
    music.rate(1);
}
function gotPoses(result)
{
    if(result.length != 0)
    {   sn = 9
        w = result[0].pose
        rw = w.rightWrist
        lw = w.leftWrist
        rwristx = rw.x;
        rwristy = rw.y;
        lwristx = lw.x;
        lwristy = lw.y;
        scorel = w.keypoints[++sn].score;
        scorer = scorel;
    }
}
function checkrw()
{   no = 0;  w = rwristy;
    if( w >= 0 && w<= 100){
        no = 0.5;
    }
    else if( w >= 101 && w<= 200){
        no = 1;
    }
    else if( w >= 201 && w<= 300){
        no = 1.5;
    }
    else if( w >= 301 && w<= 400){
        no = 2;
    }
    else if( w >= 401 && w<= 500){
        no = 2.5;
    }

    document.getElementById("speed").innerHTML = "Speed : "+no+"x";
    music.rate(no)
}