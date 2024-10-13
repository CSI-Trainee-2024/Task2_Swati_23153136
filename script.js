var timer=false;
var sec=0;
var min=0;
var hr=0;
function start(){
    timer=true;
    let t=document.getElementById("btn1");
    let x=t.outerHTML=`${hr}:${min}:${sec}`;
    stopwatch();
}
function stopwatch(){
    if(timer==true){
        sec=sec+1;
        if(sec==60){
            min=min+1;
            sec=0;
        }
        if(min==60){
            hr=hr+1;
            min=0;
        }
        setTimeout("stopwatch()",1000);
    }
}
