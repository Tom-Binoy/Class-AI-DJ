rwristx = 0;
lwristx = 0;
rwristy = 0;
lwristy = 0;
score = 0;


function preload(){
    music = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(700,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    //posenet = ml5.poseNet(video, modelLoaded);
    //posenet.on('pose',gotPoses)
}
function modelLoaded()
{
    console.log("modelLoaded")
}
function draw(){
    image(video, 0, 0, 700, 500);
    fill("White");
    stroke("blue");
    if(score >= 0.3){
        circle(lwristx,lwristy,20);
        d = floor(Number(lwristy))
        result = d/500;
        music.setVolume(result);
        document.getElementById("volume").innerHTML = "Volume : "+result;
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
    {
        w = result[0].pose
        rw = w.rightWrist
        lw = w.leftWrist
        rwristx = rw.x;
        rwristy = rw.y;
        lwristx = lw.x;
        lwristy = lw.y;
        score = w.keypoints[9].score
    }
}