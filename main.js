img=""
status=""
objects= []

function setup(){
    canvas= createCanvas(380, 380)
    canvas.center()
    video= createCapture(VIDEO)
    video.size(380, 380)
    video.hide()
    objectDetector= ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML= "Status: Detcting Objects"
}

function modelLoaded(){
    console.log("Model is initialized!")
    status= true
}

function gotResult(error, results){
    if(error){
        console.log(error)
    }

    console.log(results)
    objects= results
}


function draw(){
    image(video, 0, 0, 380, 380)
    /*fill("red")
    text("Dog", 45, 75)
    noFill()
    stroke("red")
    rect(30, 60, 450, 350)

    fill("red")
    text("Cat", 320, 120)
    noFill()
    stroke("red")
    rect(300, 90, 270, 320)*/

  if(status != ""){

    r= random(255)
    b= random(255)
    g= random(255)

    objectDetector.detect(video, gotResult)

      for(i=0; i < objects.length; i++){
          document.getElementById("status").innerHTML = "Status: Objects Detected"
          document.getElementById("number_of_objects").innerHTML = "Baby Found";
          fill(r,g,b)
          percent= floor(objects[i].confidence * 100)
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15 )
          noFill()
          stroke(r,g,b)
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
      }
  }
}
