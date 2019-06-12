var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')
var lineWidth = 3

autoSetCanvasSize(canvas)

listenToUser(canvas)

/***********/


var usingEraser = false
eraser.onclick = function(){
  usingEraser = true
  eraser.classList.add('active')
  brush.classList.remove('active')
  red.classList.remove('active')
  blue.classList.remove('active')
  green.classList.remove('active')
}
brush.onclick = function(){
  usingEraser = false
  brush.classList.add('active')
  eraser.classList.remove('active')
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  red.classList.remove('active')
  blue.classList.remove('active')
  green.classList.remove('active')
}
clear.onclick = function(){
  context.clearRect(0,0,canvas.width,canvas.height)
}
download.onclick = function(){
  var url = canvas.toDataURL("image/png")
  console.log(url)
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = '画'
  a.target = '_blank'
  a.onclick()
}

red.onclick = function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red'
  red.classList.add('active')
  green.classList.remove('active')
  blue.classList.remove('active')
  brush.classList.remove('active')
  eraser.classList.remove('active')
}
green.onclick = function(){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  green.classList.add('active')
  red.classList.remove('active')
  blue.classList.remove('active')
  brush.classList.remove('active')
  eraser.classList.remove('active')
}
blue.onclick = function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  blue.classList.add('active')
  red.classList.remove('active')
  green.classList.remove('active')
  brush.classList.remove('active')
  eraser.classList.remove('active')
}
thin.onclick = function(){
  lineWidth = 3
}
thick.onclick = function(){
  lineWidth = 6
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

function listenToUser(canvas){
  var using = false
  var lastPoint = {x:undefined,y:undefined}

  if(document.body.ontouchstart !== undefined){
    //触屏设备
    canvas.ontouchstart = function(a){
      var x = a.touches[0].clientX
      var y = a.touches[0].clientY
      using = true
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 20, 20)
      } else {
        lastPoint = { "x": x, "y": y }
      }
    }
    canvas.ontouchmove = function(a){
      var x = a.touches[0].clientX
      var y = a.touches[0].clientY
      if (!using) { return }
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 20, 20)
      } else {
        var newPoint = { "x": x, "y": y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function(){
      using = false
    }
  }else{
    //非触屏设备
    canvas.onmousedown = function (a) {
      var x = a.clientX
      var y = a.clientY
      using = true
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 20, 20)
      } else {
        lastPoint = { "x": x, "y": y }
      }
    }
    canvas.onmousemove = function (a) {
      var x = a.clientX
      var y = a.clientY
      if (!using) { return }
      if (usingEraser) {
        context.clearRect(x - 5, y - 5, 20, 20)
      } else {
        var newPoint = { "x": x, "y": y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.onmouseup = function () {
      using = false
    }
  }
 }

  function drawCircle(x,y,radius){
    context.beginPath()
    context.arc(x,y,radius,0,Math.PI*2)
    context.fill()
  }
  function drawLine(x1,y1,x2,y2){
    context.beginPath()
    context.moveTo(x1,y1)  //起点
    context.lineWidth = lineWidth
    context.lineTo(x2,y2)  //终点
    context.stroke()
    context.closePath()
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