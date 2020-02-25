/*====================================
  Setting
====================================*/
var loadingEn = false;
$(document).ready(function(){
/*====================================
  Initialization
====================================*/
/*=== Window width/height ===*/
  var windowW = window.innerWidth;
  var windowH = window.innerHeight;
  var device = deviceDet(windowW);
  $(window).on('resize', function() {
    windowW = window.innerWidth;
    windowH = window.innerHeight;
    device = deviceDet(windowW);
  });
/*=== Device detection by width ===*/
  function deviceDet(windowW) {
    if (windowW < 415) {
      device = 'sp';
    } else if (windowW < 769) {
      device = 'tb';
    } else {
      device = 'pc';
    }
    return device;
  }
/*=== Scroll ===*/
  var windowTop = $(window).scrollTop();
  var windowBot = windowTop + windowH;
  $(window).on('scroll', function() {
    windowTop = $(window).scrollTop();
    windowBot = windowTop + windowH;
  });
/*====================================
  Matter
====================================*/
  matterEn();
  $(window).on('resize', function() {
    matterEn();
  });
  function matterEn() {
/*=== Init ===*/
    if (device == 'pc') {
      objNum = 100;
      robjRest = 1;
    } else {
      objNum = 50;
      robjRest = 0.8;
    }
    var wallL = 99999;
    var objR = 10;
    var matter = document.getElementById('matter');
    $('#matter').empty();
    var matterH = windowH - $('header').outerHeight() - $('footer').outerHeight();
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        World = Matter.World,
        Bodies = Matter.Bodies,
        Body = Matter.Body;
    // create engine
    var engine = Engine.create(),
        world = engine.world;
    // create renderer
    var render = Render.create({
        element: matter,
        engine: engine,
        options: {
          width: windowW,  //ステージの横幅
          height: matterH,  //ステージの高さ
          background: '#FFFFFF',  //ステージの背景色
          wireframes: false  //ワイヤーフレームモードをオフ
        }
    });
    /*=== Objects ===*/
    //円のオブジェクト作成
    var objArr = [];
    for (var i=0; i<objNum; i++) {
      fPosX = (windowW-objR/2)*(Math.random()) + objR/2;
      fPosY = (matterH-objR/2)*(Math.random()) + objR/2;
      var obj = Bodies.circle(fPosX, fPosY, objR, {
        restitution: 0.8,
        render: {
          fillStyle: 'hsl('+(i*30)+', 100%, 70%)',
        }
      })
      objArr.push(obj);
    }
    World.add(world, objArr);
    $('main').on('click', function() {
        // console.log(objArr[0]);
      for (var i=0; i<objArr.length; i++) {
        xRnd = (Math.random()-1/2)/20;
        yRnd = (Math.random()-1)/20;
        Body.applyForce(
          objArr[i],
          { x: objArr[i].position.x, y: objArr[i].position.y },
          { x: xRnd, y: yRnd }
        );
      }
    });
    Matter.Events.on(engine, 'beforeUpdate', function() {

    });
    //囲い
    var roof = Bodies.rectangle(windowW/2, -wallL/2, windowW, wallL, { isStatic: true });
    var wallLeft = Bodies.rectangle(-wallL/2, matterH/2, wallL, matterH, { isStatic: true });
    var wallRight = Bodies.rectangle(windowW+wallL/2, matterH/2, wallL, matterH, { isStatic: true });
    var floor = Bodies.rectangle(windowW/2, matterH+wallL/2, windowW, wallL, { isStatic: true });
    //作成した図形をステージに追加して描画
    World.add(world, [
      roof,
      wallLeft,
      wallRight,
      floor
    ]);
    Render.run(render);
    Runner.run(Runner.create(), engine);  //物理エンジンを実行
  }
/*====================================
  Basic operation
====================================*/
/*=== Loading ===*/
  if (loadingEn) {
    var i = 0;
    sequence([
      {time:500, operation: function() { $('.loadingPanel .board').addClass('open'); }},
      {time:1500, operation: function() { $('.loadingPanel').addClass('trans1'); }},
      {time:1000, operation: function() { $('.loadingPanel').addClass('loaded'); }},
    ]);
  } else {
    $('.loadingPanel').css({display: 'none'});
  }
  function sequence(seq) {
    setTimeout(function() {
      seq[i]['operation']();
      i++;
      if (i < seq.length) {
        sequence(seq);
      } else {
        return 0;
      }
    }, seq[i]['time']);
  }
/*=== Smooth scroll ===*/
  $('a[href^="#"]').on('click', function() {
    var margin = (device == 'pc') ? 100:0;
    var href = $(this).attr('href');
    var target = $((href=='#' || href=='') ? 'html' : href);
    var posY = target.offset().top - margin;
    $('html, body').animate({scrollTop:posY}, 800, 'swing');
    return false;
  });
/*=== Hamberger ===*/
  var $target = $('header');
  $('.navBtn').on('click', function() {
    $target.toggleClass('open');
  });
  $('nav a').on('click', function() {
    $target.removeClass('open');
  });
  // footer避け
  $main = $('main');
  var mainBot = $main.offset().top + $main.outerHeight();
  var footerH = $('footer').outerHeight();
  navPos();
  $(window).on('scroll', function() {
    navPos();
  });
  function navPos() {
    if (device !== 'pc') {
      if (windowBot > mainBot) {
        $('.navBtn').css({'bottom': (footerH+10)+'px'});
        $('nav').css({'bottom': footerH+'px'});
      } else {
        $('.navBtn').css({'bottom': '30px'});
        $('nav').css({'bottom': 0});
      }
    }
  }
});


/*====================================
  Memo
======================================
console.log();
for (var i=0; i<array.length; i++) {}
$('').each(function(i, elm){});
var ua = navigator.userAgent;
if (((ua.indexOf('iPhone') > 0 || ua.indexOf('Android') > 0) && ua.indexOf('Mobile') > 0) && windowW < 415 && !flagScrStopCancel ) {}
var i = $('li').index();
$('').on('click', function() {});
$('').on('mousedown', function(){});
$('').on('mousemove', function(){});
$('').on('mouseup mouseleave', function(){});
$('').on('touchstart', function(){});
$('').on('touchmove', function(){});
$('').on('touchend', function(){});
$(window).scrollTop()
$(window).on('scroll', function(){});
$(window).on('resize', function(e) {});
$('').offset().top
$('')[0].scrollHeight
.addClass('right')
.children('')
.find('*')
.append('<span></span>')
.outerWidth();
.attr('', )
.prop('disabled', true)
.animate({'': ''}, 100, 'linear', function(){});
var timer = setTimeout(function() {}, 100);
clearTimeout(timer);
*/