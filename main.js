var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

autoSetCanvasSize(canvas)

listenToMouse(canvas)

/***********/


var usingEraser = false
eraser.onclick = function(){
  usingEraser = true
  actions.className = 'actions x'
}
brush.onclick = function(){
  usingEraser = false
  actions.className = 'actions'
}


/*******/
function autoSetCanvasSize(canvas){  
  setCanvasSize()
  window.onresize = function(){
    setCanvasSize()
  }
  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width=pageWidth
    canvas.height=pageHeight
  }
}

function listenToMouse(canvas){
  var using = false
  var lastPoint = {x:undefined,y:undefined}
  function drawCircle(x,y,radius){
    context.fillStyle = 'white'
    context.beginPath()
    context.arc(x,y,radius,0,Math.PI*2)
    context.fill()
  }
  function drawLine(x1,y1,x2,y2){
    context.strokeStyle = 'white'
    context.beginPath()
    context.moveTo(x1,y1)  //起点
    context.lineWidth = 2
    context.lineTo(x2,y2)  //终点
    context.stroke()
    context.closePath()
  }

    canvas.onmousedown = function(a){
    var x = a.clientX
    var y = a.clientY 
    using=true
    if(usingEraser){
      context.clearRect(x-5,y-5,10,10)
    }else{
      lastPoint = {"x":x,"y":y}
      drawCircle(x,y,1)
    }
  }
  canvas.onmousemove = function(a){
      var x = a.clientX
      var y = a.clientY
      if(!using){return}
      if(usingEraser){
        context.clearRect(x-5,y-5,10,10)
      }else{
        var newPoint = {"x":x,"y":y}
        drawCircle(x,y,1)   
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
        lastPoint = newPoint
       }
  }
  canvas.onmouseup = function(a){
    using=false
  }
}




/*
context.fillStyle = 'black'
context.fillRect(10,10,100,100)
context.strokeStyle = 'white'
context.strokeRect(10,10,100,100)
context.clearRect(40,40,40,40)

context.beginPath()
context.moveTo(200,40)
context.lineTo(240,80)
context.lineTo(160,80)
context.fill()

context.fillStyle = 'black'
context.beginPath()
context.arc(150,150,20,Math.PI,Math.PI*2)
context.fill()
context.fillStyle = 'white'
context.beginPath()
context.arc(150,150,20,0,Math.PI)
context.fill()*/