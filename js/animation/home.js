//https://www.w3schools.com/jsref/obj_wheelevent.asp

function animeInit1() {
    //alert("v2");
    const epsilon = 0.05;
    const slow = 10;
    const slowScroll = 2;
    const ScrollSpeed = 100;

    var isTouch = false;
    var deltaCumulative = 0;
    var timer = 0;

    var elem = document.getElementsByClassName("zttq-premiere ng-scope")[0]
    elem.style.overflowY = "hidden";
    var currY = [];
    var targetScrollY = 0;
    var currentScrollY = 0;
    var virtualScroll = 0;
    var scrollPercentage = [];
    var CurrentSvg = -1;

    var eleRect = elem.getBoundingClientRect();
    var svgElems = document.getElementsByTagName("svg");

    var nmbSvg = 0;

    var targetRect = [];
    var startAnimY = [];
    var endAnimY = [];
    var stepArray = [];
    var totalScrollLenght = 0;

    setInterval(function(){
            if(!elem) elem = document.getElementsByClassName("zttq-premiere ng-scope")[0];
            currentScrollY = currentScrollY + (targetScrollY-currentScrollY)/slow
            //console.log(currentScrollY);
            elem.scrollTo(0, currentScrollY);

            for (var i = 0; i < nmbSvg; i++) {
                if(!currY[i]) currY[i] = 0;
                if(!scrollPercentage[i]) scrollPercentage[i] = 0;
                if (Math.abs(scrollPercentage[i]-currY[i]) > epsilon/slow) {
                    currY[i] = currY[i] + (scrollPercentage[i]-currY[i])/slow
                    svgElems[i].setCurrentTime(currY[i]);
                    svgElems[i].pauseAnimations();
                }
            }
        }, 30
    );

    var initEngin = function(){
        if(!elem) elem = document.getElementsByClassName("zttq-premiere ng-scope")[0];
        if(!svgElems) svgElems = document.getElementsByTagName("svg");
        if (nmbSvg != document.getElementsByTagName("svg").length) {
            svgElems = document.getElementsByTagName("svg");
            nmbSvg = svgElems.length;
            targetRect = [];
            startAnimY = [];
            endAnimY = [];
            stepArray = [];
            totalScrollLenght = 0;

            for (var i = 0; i < nmbSvg; i++) {
                targetRect.push(svgElems[i].getBoundingClientRect());
                startAnimY.push(targetRect[i].y-eleRect.y-elem.clientHeight/2);
                endAnimY.push(targetRect[i].y-eleRect.y+targetRect[i].height-elem.clientHeight/2);
                stepArray.push({svg : i, duration : endAnimY[i]-startAnimY[i], boolScroll : true})
                totalScrollLenght += endAnimY[i]-startAnimY[i];
                svgElems[i].setCurrentTime(0);
                    svgElems[i].pauseAnimations();
                // console.log(svgElems[i]);
            }

            stepArray.splice(0, 0, {svg : -1, duration : startAnimY[0], boolScroll : true});
            totalScrollLenght += startAnimY[0];

            totalScrollLenght += AddStep(stepArray, {svg : 0, duration : 1000, boolScroll : false} , 0.12);
            totalScrollLenght += AddStep(stepArray, {svg : 0, duration : 1400, boolScroll : false} , 0.5);

            totalScrollLenght += AddStep(stepArray, {svg : 1, duration : 1000, boolScroll : false} , 0.10);
            totalScrollLenght += AddStep(stepArray, {svg : 1, duration : 1500, boolScroll : false} , 0.22);
            totalScrollLenght += AddStep(stepArray, {svg : 1, duration : 3500, boolScroll : false} , 0.50);
            totalScrollLenght += AddStep(stepArray, {svg : 1, duration : 1500, boolScroll : false} , 0.75);


            totalScrollLenght += AddStep(stepArray, {svg : 2, duration : 2500, boolScroll : false} , 0.30);

            console.log(stepArray);

        }
    }

    var engine = function(direction){
        initEngin();

        let deltaY = direction*ScrollSpeed/slowScroll;
        let style = "";

        let lPrevStep = getStepAtTime(stepArray, virtualScroll);
        virtualScroll = mathBetween(0, virtualScroll + deltaY, totalScrollLenght);
        virtualScroll = Math.floor(virtualScroll/Math.abs(deltaY))*Math.abs(deltaY);
        targetScrollY = getScrolltarget(stepArray, virtualScroll);
        let lCurrStep = getStepAtTime(stepArray, virtualScroll);
        if(!lCurrStep.boolScroll){
            style = "background-color: aqua";
        }

        CurrentSvg = lCurrStep.svg;
        if(!scrollPercentage[CurrentSvg]) scrollPercentage[CurrentSvg] = 0;
        scrollPercentage[CurrentSvg] = getSvgPercent(stepArray ,CurrentSvg, virtualScroll);
        if (scrollPercentage[CurrentSvg] < epsilon) scrollPercentage[CurrentSvg] = 0;
        if (scrollPercentage[CurrentSvg] > 1-epsilon) scrollPercentage[CurrentSvg] = 1;
        //console.log(scrollPercentage[CurrentSvg],"%");
        console.log("%c %d %d %d %f %", style, virtualScroll, targetScrollY, totalScrollLenght, Math.floor(scrollPercentage[CurrentSvg]*100));


        if (CurrentSvg >= 0) {
            let chatLength = elem.svg[CurrentSvg].length;
            // console.log(elem.svg[CurrentSvg]);
            for (var i = 0; i < chatLength; i++) {
                let chatBox = elem.svg[CurrentSvg][i];
                if (scrollPercentage[CurrentSvg] > parseInt(chatBox.dataset.precentspawn)/100){
                    chatBox.classList.add('chat-transition');
                }
                else{
                    chatBox.classList.remove('chat-transition');
                }
            }
        }
    };

    elem.onresize = function(e){
        initEngin();
    };

    elem.onwheel = function(e){
        let currentTime = Date.now();
        //console.log(e.deltaMode, currentTime - timer);
        deltaCumulative += e.deltaY;
        if (Math.abs(deltaCumulative) < 2 || isTouch || currentTime - timer < 50) return;
        var direction = deltaCumulative > 0 ? 1 : -1;
        engine(direction);
        deltaCumulative = 0;
        timer = currentTime;
    };


///////////Touch Event /////////
    var ongoingTouches = new Array;
    var IsSwap = false;
    
    
    function ongoingTouchIndexById(idToFind) {
      for (var i=0; i<ongoingTouches.length; i++) {
        var id = ongoingTouches[i].identifier;
        
        if (id == idToFind) {
          return i;
        }
      }
      return -1;    // not found
    }
    
    function handleStart(evt) {
        isTouch = true;
        IsSwap = false;
      evt.preventDefault();
      var touches = evt.changedTouches;
            
      for (var i=0; i<touches.length; i++) {
        ongoingTouches.push(touches[i]);
      }
    }
  
    function handleMove(evt) {
      evt.preventDefault();
      var touches = evt.changedTouches;
      
      for (var i=0; i<touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);
        console.log(ongoingTouches[idx].pageY,touches[i].pageY);

        if (!IsSwap && Math.abs(ongoingTouches[idx].pageY - touches[i].pageY) > 20) {
            var direction = ongoingTouches[idx].pageY < touches[i].pageY ? -1:1;
            engine(direction*2);
            IsSwap = true;
        }
      }
    }

    function handleEnd(evt) {
      evt.preventDefault();
      var touches = evt.changedTouches;
            
      for (var i=0; i<touches.length; i++) {
        var idx = ongoingTouchIndexById(touches[i].identifier);
        ongoingTouches.splice(i, 1);  // remove it; we're done
      }
    }
    
    function handleCancel(evt) {
      evt.preventDefault();
      var touches = evt.changedTouches;
      
      for (var i=0; i<touches.length; i++) {
        ongoingTouches.splice(i, 1);  // remove it; we're done
      }
    }
  
    function startup() {
      elem.addEventListener("touchstart", handleStart, false);
      elem.addEventListener("touchend", handleEnd, false);
      elem.addEventListener("touchcancel", handleCancel, false);
      elem.addEventListener("touchleave", handleEnd, false);
      elem.addEventListener("touchmove", handleMove, false);
    }

    startup();
}

function mathBetween(a,c,b) {
    if(a<b) return Math.min(Math.max(a,c),b);
    return Math.min(Math.max(b,c),a);
}

function AddStep(pArrStep,pStep,startTimePercent) {
    var nmpStep = pArrStep.length;
    var totaltimeStep = 0;
    var timeOfTheStep = 0;
    for (var i = 0; i < nmpStep; i++) {
        if (pArrStep[i].svg < pStep.svg) timeOfTheStep += pArrStep[i].duration;
        if (pArrStep[i].svg == pStep.svg){
            if (pArrStep[i].boolScroll) totaltimeStep += pArrStep[i].duration;
            else timeOfTheStep += pArrStep[i].duration;
        }
    }

    var time = 0;
    var startTime = timeOfTheStep + totaltimeStep*startTimePercent;

    for (var i = 0; i < nmpStep; i++) {
        time += pArrStep[i].duration;
        if (time > startTime) {
            let surplusTime = time - startTime;
            let cloneStep = Object.assign({}, pArrStep[i]);
            cloneStep.duration = surplusTime;
            pArrStep[i].duration -= surplusTime;

            pArrStep.splice(i+1, 0, cloneStep);
            pArrStep.splice(i+1, 0, pStep);
            break;
        }
    }
    return pStep.duration;
}

function getStepAtTime(pArrStep,pTime) {
    var nmpStep = pArrStep.length;
    var time = 0;
    for (var i = 0; i < nmpStep; i++) {
        time += pArrStep[i].duration;
        if (time > pTime) {
            return pArrStep[i];
        }
    }
    return pArrStep[nmpStep-1];
}

function getSvgPercent(pArrStep,svgIndex, pTime) {
    var nmpStep = pArrStep.length;
    var totalTimeStep = 0;
    var startTime = 0;
    var currentDuration = -10;
    for (var i = 0; i < nmpStep; i++) {
        if (pArrStep[i].svg == svgIndex) {
            if (currentDuration < 0) currentDuration = pTime - startTime;
            totalTimeStep += pArrStep[i].duration;
        }
        startTime += pArrStep[i].duration;
    }
    return currentDuration/totalTimeStep;
}

function getScrolltarget(pArrStep, pVirtualScroll){
    var nmpStep = pArrStep.length;
    var scrollTarget = 0;
    var time = 0;
    for (var i = 0; i < nmpStep; i++) {
        time += pArrStep[i].duration;
        if (time <= pVirtualScroll) {
            if (pArrStep[i].boolScroll) {
                scrollTarget += pArrStep[i].duration;
            }
        }
        else{
            if (pArrStep[i].boolScroll) {
                scrollTarget += pVirtualScroll - (time - pArrStep[i].duration);
            }
            break;
        }
    }
    return scrollTarget;
}

/**
 * 
 * SECTION A
 * 
 */
function chatAnimA() {
    var elem = document.getElementById("section-a");
    var chats = elem.getElementsByClassName("chat");
    var softGlobal = document.getElementsByClassName("zttq-premiere ng-scope")[0];

    if (!softGlobal.svg) {softGlobal.svg = []}
    if (!softGlobal.svg[0]) {softGlobal.svg[0] = []}
        var lLength = chats.length;
        for (var i = 0; i < lLength; i++) {
            softGlobal.svg[0].push(chats[i])
        }
}


/**
 * 
 * SECTION A2
 * 
 */
 function chatAnimA2() {
    var elem = document.getElementById("section-a2");
    var chats = elem.getElementsByClassName("chat");
    var transHori = elem.getElementsByClassName("apparition-hori");
    var softGlobal = document.getElementsByClassName("zttq-premiere ng-scope")[0];

    if (!softGlobal.svg) {softGlobal.svg = []}
    if (!softGlobal.svg[1]) {softGlobal.svg[1] = []}
    	var lLength = chats.length;
    	for (var i = 0; i < lLength; i++) {
    		softGlobal.svg[1].push(chats[i])
    	}
    	lLength = transHori.length;
    	for (var i = 0; i < lLength; i++) {
    		softGlobal.svg[1].push(transHori[i])
    	}
}

/**
 * 
 * SECTION B
 * 
 */
 function chatAnimB() {
    var elem = document.getElementById("section-b");
    var chats = elem.getElementsByClassName("chat");
    var softGlobal = document.getElementsByClassName("zttq-premiere ng-scope")[0];

    if (!softGlobal.svg) {softGlobal.svg = []}
    if (!softGlobal.svg[2]) {softGlobal.svg[2] = []}
    	var lLength = chats.length;
    	for (var i = 0; i < lLength; i++) {
    		softGlobal.svg[2].push(chats[i])
    	}
}