// Первое задание: переключатель
(function() {
  var selected = null,
      xPos = 0,
      checkboxInput = document.querySelector('.switch-check'),
      checkboxContainer = document.querySelector('.radio__state'),
      label = document.querySelector('.radio__container');

  // Задание элемента для перетаскивания
  function drag(elem) {
    selected = elem;
    xElem = xPos - selected.offsetLeft + selected.parentNode.offsetLeft;
  }

  // Перетаскивание переключателя
  function moveElement(event) {
    xPos = document.all ? window.event.clientX : event.pageX;
    if (selected !== null) {
      if ((xPos - xElem) <= 0 && (xPos - xElem) >= -40) {
        selected.style.left = (xPos - xElem) + 'px';
      }
    }
  }

  function toggleByClick(checkbox, toggler, input) {
    if (input.checked == true) {
      toggler.style.left = '-40px';
      input.checked = false;
    }
    else {
      toggler.style.left = '0px';
      input.checked = true;
    }
  }

  // "Обнуление" объекта после перетаскивания
  function destroy(
    ) {
    selected = null;
  }

  // Привязка функций к элементам
  checkboxContainer.onmousedown = function () {
    drag(this);
    return false;
  };

  label.onmouseup = function () {
    toggleByClick(this, checkboxContainer, checkboxInput);
  };

  document.onmousemove = moveElement;
  document.onmouseup = toggleByClick;
  document.onmouseup = destroy;
})();


//Второе задание: процентный input
(function() {

var canvas = document.getElementById("range-canvas"),
    ctx = canvas.getContext("2d"),
    cw = canvas.width,
    ch = canvas.height,
    offsetX = canvas.offsetLeft,
    offsetY = canvas.offsetTop,
    scrollX = canvas.scrollLeft,
    scrollY = canvas.scrollTop,
    isDragging = false,
    startX, startY,
    cx = 65,
    cy = 65,
    radius = 60,
    PI = Math.PI,
    PI2 = PI * 2;

  ctx.lineWidth = 10;
  ctx.font = '700 44px Arial Narrow';
  ctx.fillStyle = "#494949";

  draw(20, 120);

  function draw(x, y) {
    var dx = x - cx,
        dy = y - cy,
        endAngle = (Math.atan2(dy, dx) + PI2) % PI2,
        pct = Math.floor(endAngle / PI2 * 100);

    ctx.clearRect(0, 0, cw, ch);
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, PI2);
    ctx.closePath();
    ctx.strokeStyle = '#494949';
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, endAngle);
    ctx.strokeStyle = '#7cffe2';
    ctx.stroke();

    ctx.fillText(pct + '%', cx - 35, cy + 15);
  }

  function handleMouseDown(e) {
    e.preventDefault();
    e.stopPropagation();
    isDragging = true;
    mX = parseInt(e.clientX - offsetX);
    mY = parseInt(e.clientY - offsetY);

    draw(mX, mY);
  }

  canvas.addEventListener('mousedown', function(e) {
    handleMouseDown(e);
  });
  canvas.addEventListener('mousemove', function(e) {
    if (isDragging)
      handleMouseDown(e);
  });
  canvas.addEventListener('mouseup', function(e) {
    handleMouseDown(e)
    isDragging = false;
  });

})();


//Третье задание: ползунок
(function() {
    var canvas=document.getElementById("slider");
    var ctx=canvas.getContext("2d");
    var offsetX=canvas.offsetLeft;
    var canvasWidth=canvas.width;
    var canvasHeight=canvas.height;
    var isDragging=false;
    var percentage;

    ctx.fillStyle = '#494949';
    ctx.fillRect(10, 0,canvasWidth - 20, canvasHeight);

    ctx.fillStyle = '#64eaec';
    ctx.fillRect(canvasWidth * 0.85, 0, (canvasWidth * 0.15) - 10, canvasHeight);

    //закругление границ слева
    ctx.beginPath();
    ctx.arc(10, canvasHeight/2, canvasHeight/2, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#494949';
    ctx.fill();

    //закругление границ справа
    ctx.beginPath();
    ctx.arc(canvasWidth - 10, canvasHeight/2, canvasHeight/2, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#64eaec';
    ctx.fill();

    //"ручка" слайдера
    ctx.beginPath();
    ctx.arc(canvasWidth * 0.85, 10, 9, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#64eaec';
    ctx.fill();
    ctx.strokeStyle = '#494949';
    ctx.stroke();

    //точка в "ручке" слайдера
    ctx.beginPath();
    ctx.arc(canvasWidth * 0.85, 10, 3, 0, 2 * Math.PI, false);
    ctx.fillStyle = '#494949';
    ctx.fill();

    function handleMouseDown(e){
      canMouseX=parseInt(e.clientX-offsetX);
      isDragging=true;
    }

    function handleMouseUp(e){
      canMouseX=parseInt(e.clientX-offsetX);
      isDragging=false;
    }

    function handleMouseOut(e){
      canMouseX=parseInt(e.clientX-offsetX);
      isDragging=false;
    }

    function handleMouseMove(e){
      canMouseX=parseInt(e.clientX-offsetX);
      if(isDragging){
        ctx.clearRect(0,0,canvasWidth,canvasHeight);

        ctx.fillStyle = '#494949';
        ctx.fillRect(10, 0, canvasWidth - 20, canvasHeight);

        // закругление границ слева
        ctx.beginPath();
        ctx.arc(10, canvasHeight/2, canvasHeight/2, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#494949';
        ctx.fill();
        ctx.strokeStyle = '#494949';
        ctx.stroke();

        // закругление границ справа
        ctx.beginPath();
        ctx.arc(canvasWidth - 10, canvasHeight/2, canvasHeight/2, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#64eaec';
        ctx.fill();

        if ((canMouseX >= 10) && canMouseX <= (canvasWidth - 10)) {
          ctx.fillStyle = '#64eaec';
          ctx.fillRect(canMouseX, 0, (canvasWidth - canMouseX - 10), canvasHeight);

          ctx.beginPath();
          ctx.arc(canMouseX, 10, 9, 0, 2 * Math.PI, false);
          ctx.fillStyle = '#64eaec';
          ctx.fill();
          ctx.strokeStyle = '#494949';
          ctx.stroke();

          //точка в "ручке"" слайдера
          ctx.beginPath();
          ctx.arc(canMouseX, 10, 3, 0, 2 * Math.PI, false);
          ctx.fillStyle = '#494949';
          ctx.fill();

          percentage = (Math.ceil((canMouseX/(canvasWidth))*100));
        }

        else if (canMouseX < 10) {
          ctx.fillStyle = '#64eaec';
          ctx.fillRect(10, 0, canvasWidth - 20, canvasHeight);

          ctx.beginPath();
          ctx.arc(9, 10, 9, 0, 2 * Math.PI, false);
          ctx.fillStyle = '#64eaec';
          ctx.fill();
          ctx.strokeStyle = '#494949';
          ctx.stroke();

          //точка в "ручке"" слайдера
          ctx.beginPath();
          ctx.arc(9, 10, 3, 0, 2 * Math.PI, false);
          ctx.fillStyle = '#494949';
          ctx.fill();

          percentage = (Math.ceil((canMouseX/(canvasWidth - 10))*100));
        }

        else if (canMouseX > (canvasWidth - 10)) {
          ctx.beginPath();
          ctx.arc((canvasWidth - 10), 10, 9, 0, 2 * Math.PI, false);
          ctx.fillStyle = '#64eaec';
          ctx.fill();
          ctx.strokeStyle = '#494949';
          ctx.stroke();

          //точка в "ручке" слайдера
          ctx.beginPath();
          ctx.arc((canvasWidth - 10), 10, 3, 0, 2 * Math.PI, false);
          ctx.fillStyle = '#494949';
          ctx.fill();

          percentage = (Math.ceil((canMouseX/(canvasWidth))*100));
        }
      }
    }

    canvas.addEventListener('mousedown', function(e){
      handleMouseDown(e);
    });
    canvas.addEventListener('mousemove', function(e){
      handleMouseMove(e);
    });
    canvas.addEventListener('mouseup', function(e){
      handleMouseUp(e);
    });
    canvas.addEventListener('mouseout', function(e){
      handleMouseOut(e);
    });
})();


// Четвертое задание: выбор цвета
(function() {
  var canvas = document.getElementById('picker'),
      ctx = canvas.getContext('2d'),
      image = new Image();

  image.onload = function () {
    ctx.drawImage(image, 0, 0, image.width, image.height);
  }
  image.setAttribute('src', 'img/colorwheel.png');

  canvas.addEventListener('click', function(e) {
    var canvasX = Math.floor(e.pageX - canvas.offsetLeft),
        canvasY = Math.floor(e.pageY - canvas.offsetTop),
        // определение цвета в текущем положении
        imageData = ctx.getImageData(canvasX, canvasY, 1, 1),
        pixel = imageData.data,
        // преобразование в hex
        pixelColor = '#' + ('0' + parseInt(pixel[0],10).toString(16)).slice(-2) + ('0' + parseInt(pixel[1],10).toString(16)).slice(-2) + ('0' + parseInt(pixel[2],10).toString(16)).slice(-2);
        // обновление цвета в превью
    document.querySelector('.preview').style.backgroundColor = pixelColor;
  });

})();
