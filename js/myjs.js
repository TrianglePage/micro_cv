/*--------------typing-------------*/
jQuery(document).ready(function(){
    //setTimeout(first_div_anim, 3000);
    // Instantiate jTicker
    jQuery("#div_brief").ticker({
        cursorList:  " ",
        rate:        150,
        delay:       4000
    }).trigger("play").trigger("stop");

    jQuery(".style").click(function(){
        jQuery("#div_brief")
            .trigger({
                type: "control",
                cursor: jQuery("#div_brief").data("ticker").cursor.css({width: "4em", background: "#efefef", position: "relative", top: "1em", left: "-1em"})
            })
        return false;
    });

    map_point_anim();

    $("#imag_photo_bk").click(function(){
        $("#imag_photo").fadeIn(1000);
    });

    $("#ability_01").click(function(){
        drawChart(1);
    });
    $("#ability_02").click(function(){
        drawChart(2);
    });
    $("#ability_03").click(function(){
        drawChart(3);
    });
    $("#ability_04").click(function(){
        drawChart(4);
    });
});
/*--------------typing end --------*/

/*------ first div -------*/
function clear_first_div_anim()
{
    canvas = document.getElementById("subTitleCanvas");
    ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function first_div_anim()
{

}
function first_div_anim_bk()
{
    var subTitleCanvas;
    var stage;
    var g_center_x, g_center_y, midle_x, end_x;
    var x1, y1, midle_y1, end_y1;
    var x2, y2, midle_y2, end_y2;
    var x3, y3, midle_y3, end_y3;

    var x_gain, y1_gain, y2_gain, y3_gain;
    var step = 15;
    var s;
    var g;
    var bitmap;
    var cir;
    var c;
    var ctx;
    var canvas_obj = document.getElementById("subTitleCanvas").getBoundingClientRect();
    //var canvas_top=canvas_obj.top;
    var canvas_left=canvas_obj.left;
    var h = canvas_obj.height/3 - 5;
    var midle_pos = 5;

    x1 = x2 = x3 = g_center_x = canvas_obj.width -3;
    y1 = y2 = y3 = g_center_y = 5;
    midle_x = g_center_x - (g_center_x*1/midle_pos);
    end_x = canvas_left;
    midle_y1 = y1+h;
    midle_y2 = y1+(h*2);
    midle_y3 = y1+(h*3);
    x_gain = canvas_obj.width/step;
    y1_gain = midle_y1/step*midle_pos;
    y2_gain = midle_y2/step*midle_pos;
    y3_gain = midle_y3/step*midle_pos;

    canvas = document.getElementById("subTitleCanvas");
    ctx = canvas.getContext("2d");
    stage = new createjs.Stage(canvas);

    g = new createjs.Graphics();
    g.setStrokeStyle(2);
    g.beginStroke('rgba(58,245,251,1)');
    s= new createjs.Shape(g);
    s.shadow = new createjs.Shadow('rgba(180,180,255,1)', 0, 0, 3);

    cir = new createjs.Graphics();

    //s.append(cir);
    c = new createjs.Shape(cir);
    /*
     bitmap = new createjs.Bitmap("./img/yuan/yuan_02.png");
     bitmap.localToGlobal(g_center_x-8, g_center_y-3);
     bitmap.setTransform(g_center_x-8, g_center_y-3, .05, .05);
     */
    stage.addChild(s);
    stage.addChild(c);
    //stage.addChild(bitmap);
    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", tick);

    var deg = 0;
    var rad = 0;
    var flag = 0;
    function tick(e){
        if(rad < 10 && flag == 0)
        {
            rad++;
            if(rad == 5)
            {
                flag = 1;
            }
        }
        else
        {
            rad--;
            if(rad == 0)
            {
                flag = 0;
            }
        }
        cir.clear();
        cir.setStrokeStyle(2);

        cir.beginStroke('rgba(47,180,230,1)');
        cir.beginFill('rgba(47,180,230,1)');
        //cir.drawCircle(g_center_x,g_center_y,5);

        cir.drawCircle(g_center_x,g_center_y,rad);
        cir = new createjs.Graphics();
        c.shadow = new createjs.Shadow('rgba(180,180,255,1)', 0, 0, 5);
        //bitmap.setTransform(g_center_x-8, g_center_y-3, .06, .06, deg+=10);
        // bitmap.setTransform(g_center_x-8, g_center_y-3, .06, .06);
        if(x1>midle_x)
        {
            g.moveTo(x1,y1);
            g.lineTo(x1-=x_gain,y1+=y1_gain);
            stage.update();
        }
        else if(x1>10)
        {
            g.moveTo(x1,y1);
            g.lineTo(x1-=x_gain,y1);
            stage.update();
        }
        else if(x2>midle_x)
        {
            g.moveTo(x2,y2);
            g.lineTo(x2-=x_gain,y2+=y2_gain);
            stage.update();
        }
        else if(x2>10)
        {
            g.moveTo(x2,y2);
            g.lineTo(x2-=x_gain,y2);
            stage.update();
        }
        else if(x3>midle_x)
        {
            g.moveTo(x3,y3);
            g.lineTo(x3-=x_gain,y3+=y3_gain);
            stage.update();
        }
        else if(x3>10)
        {
            g.moveTo(x3,y3);
            g.lineTo(x3-=x_gain,y3);
            stage.update();
        }

        ctx.font = "16px Courier New";
        ctx.fillStyle = 'rgba(47,180,230,1)';

        if(x1<10)
        {
            ctx.fillText("sex:female", x1, y1-3);
        }
        if(x2<10)
        {
            ctx.fillText("birth:12.12", x1, y2-3);
        }
        if(x3<10)
        {
            ctx.fillText("from:china", x1, y3-3);
        }
    }

}

/*------ first div end ---*/
window.onload = function(){

}

function drawChart(x) {
    var ctype;
    switch(x)
    {
        case 1:
            ctype="column";
            break;
        case 2:
            ctype="spline";
            break;
        case 3:
            ctype="doughnut";
            break;
        case 4:
            ctype="pie";
            break;
    }

    var chart = new CanvasJS.Chart("page2_box_bottom", {
        theme: "theme2",//theme1
        backgroundColor: "rgba(34,34,34,0)",
        title:{
            text: "Ability"
        },
        animationEnabled: true,   // change to true
        data: [
            {
                // Change type to "bar", "splineArea", "area", "spline", "pie",etc.
                type: ctype,
                //color: "rgba(2,34,21,.5)",
                dataPoints: [
                    { color:"rgba(28,34,21,.1)", label: "attack",  y: 10  },
                    { color:"rgba(1,40,120,.6)", label: "defence", y: 15},
                    { color:"rgba(21,3,77,.3)", label: "speed", y: 25  },
                    { color:"rgba(200,88,81,.5)", label: "power",  y: 30  },
                    { color:"rgba(5,123,164,.6)", label: "magic",  y: 28  }
                ]
            }
        ]
    });
    chart.render();

}
/*
function drawChart(id, percent, ang) {
    var chart = new CanvasJS.Chart(id, {
        theme: "theme4",//theme1
        backgroundColor: "rgba(34,34,34,0)",
        //title:{
            //text: "Basic Column Chart - CanvasJS"
        //},
        animationEnabled: true,   // change to true
      legend:{
        //width: 40%,
        verticalAlign: "bottom",
        horizontalAlign: "left"
      },
        data: [
            {
                startAngle: ang,
                //indexLabelFontSize: 20,
                //indexLabelFontFamily: "Garamond",
                //indexLabelFontColor: "darkgrey",
                //indexLabelLineColor: "darkgrey",
                //indexLabelPlacement: "outside",
                // Change type to "bar", "splineArea", "area", "spline", "pie",etc.
                type: "column",
                //type: "spline",
                //type: "doughnut",
                //color: "rgba(2,34,21,.5)",

                dataPoints: [
                    { color:"rgba(255,34,21,.6)", y: percent  },
                    { color:"rgba(28,34,21,0.7)", y: 100-percent },
                ]
            }
        ]
    });
    chart.render();

}
*/
function line_anim_2(){
    $(".line-3").animate({
        width:'100px',
        left:'50px'
    }, 600);
};

function line_anim_1(){
    $(".line-2").animate({
        width:'100px',
        left:'50px'
    }, 600, line_anim_2);
};

function flash_pic(){
    $("#sex").fadeIn(0);
    setTimeout(function(){$("#sex").fadeOut(0);},100);
    setTimeout(function(){$("#sex").fadeIn(0);},300);
    setTimeout(function(){$("#sex").fadeOut(0);},500);
    setTimeout(function(){$("#sex").fadeIn(0);},600);
}

function line_anim(){
    $(".line-1").animate({
        width:'100px',
        left:'50px'
    }, 600, line_anim_1);
};
function func_animate(idx){
    if(idx==0){
        setTimeout(line_anim,1000);
        setTimeout(flash_pic,1000);
        $("#imag_photo_bk").css({"opacity":"0.3"});
        //setTimeout(line_anim_1,2000);
        //clear_first_div_anim();
        //setTimeout(first_div_anim, 2000);
    }
    if(idx==1){
        drawChart(1);
        $("#imag_photo").fadeOut(0);
    }
    if(idx==2){

    }
    if(idx==3){

    }
}

var g_mapp = 1;

function map_point_anim(){
    var flag = 0;
    var l,t;
    var cl,ct;
    var mapp;
    $(".map-point").click(function(){
        if(g_mapp == 1)
        {
            g_mapp = $(this);
        }
        else
        {
            if(g_mapp.css("z-index") == 1)
            {
                g_mapp.css({
                    "width": "25px",
                    "height": "25px",
                    "left": l+12.5,
                    "top":t+12.5,
                    "z-index": "0",
                    });
            }
        }

        g_mapp = $(this);

        if($(this).css("z-index") == 1)
        {
            return;
        }

        l = $(this).offset().left;
        t = $(this).offset().top;
        var k = mapp = $(this);
        $(this).css({
            "-moz-transition": "opacity 0.25s ease-in-out 0.25s, height 0 ease-in-out 0.25s, overflow 0 ease-in-out 0.25s",
            "-o-transition": "opacity 0.25s ease-in-out 0.25s, height 0 ease-in-out 0.25s, overflow 0 ease-in-out 0.25s",
            "-webkit-transition": "opacity 0.25s ease-in-out, height 0 ease-in-out, overflow 0 ease-in-out",
            "-webkit-transition-delay": "0.25s, 0.25s, 0.25s",
            "-webkit-transition": "opacity 0.25s ease-in-out 0.25s, height 0 ease-in-out 0.25s, overflow 0 ease-in-out 0.25s",
            "transition": "opacity 0.25s ease-in-out 0.25s, height 0 ease-in-out 0.25s, overflow 0 ease-in-out 0.25s",
            "overflow": "hidden",

            "margin":"0",
            "padding":"0",
            "filter": "progid:DXImageTransform.Microsoft.Alpha(enabled=false)",
            "opacity": "1",
            "width": "260px",
            "height": "200px",
            "left":"200px",
            "top" :"400px",
            "color": "#e5e5e5",
            "z-index": "1",
            "-webkit-transition": "opacity 0.25s ease-in-out, width 0.25s ease-in-out, height 0.25s ease-in-out,left 0.25s ease-in-out 0.25s,top 0.25s ease-in-out 0.25s,",
            "transition": "opacity 0.25s ease-in-out, width 0.25s ease-in-out, height 0.25s ease-in-out,left 0.25s ease-in-out 0.25s,top 0.25s ease-in-out 0.25s,;)",}
        );
       // kc=k.children();
       // cl=kc.offset().left;
       // ct=kc.offset().top;

        $(this).children().css({
                "filter": "progid:DXImageTransform.Microsoft.Alpha(enabled=false)",
                "opacity": "1",
                "width": "260px",
                "height": "200px",
                "color": "#e5e5e5",
                "z-index": "1",
                "-webkit-transition": "opacity 0.25s ease-in-out, width 0.25s ease-in-out, height 0.25s ease-in-out",
                "transition": "opacity 0.25s ease-in-out, width 0.25s ease-in-out, height 0.25s ease-in-out;)",}
        );
/*
        setTimeout(function(){
            k.css({
            "width": "25px",
            "height": "25px",
            "left": l+12.5,
            "top":t+12.5,
            "z-index": "0",
            });
            kc.css({
            "left":cl,
            "top":tl,
            });
        }, 3000);*/

    $(".mainBox3").click(function(){
        //alert();
        if(mapp.css("z-index") == 1)
        {
        mapp.css({
            "width": "25px",
            "height": "25px",
            "left": l+12.5,
            "top":t+12.5,
            "z-index": "0",
            });
        }
    });

    });
}