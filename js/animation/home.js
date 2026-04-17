//https://www.w3schools.com/jsref/obj_wheelevent.asp

function animeInit1() {
    //alert("v2");
    const epsilon = 0.05;
    const slow = 10;

    // Sensibilité par type d'input
    const MOUSE_WHEEL_STEP = 80;    // px par cran de molette
    const TRACKPAD_MULTIPLIER = 3;  // amplifie les petits deltas trackpad
    const TOUCH_MULTIPLIER = 2;     // sensibilité du swipe

    var inputType = 'unknown'; // 'mouse', 'trackpad', 'touch'
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

    var timelineEl = document.getElementById("timeline-progress");

    var engine = function(deltaY){
        initEngin();

        if (Math.abs(deltaY) < 1) return;

        virtualScroll = mathBetween(0, virtualScroll + deltaY, totalScrollLenght);
        targetScrollY = getScrolltarget(stepArray, virtualScroll);

        // Mise à jour timeline
        if (timelineEl && totalScrollLenght > 0) {
            timelineEl.style.width = (virtualScroll / totalScrollLenght * 100) + "%";
        }
        let lCurrStep = getStepAtTime(stepArray, virtualScroll);

        CurrentSvg = lCurrStep.svg;
        if(!scrollPercentage[CurrentSvg]) scrollPercentage[CurrentSvg] = 0;
        scrollPercentage[CurrentSvg] = getSvgPercent(stepArray ,CurrentSvg, virtualScroll);
        if (scrollPercentage[CurrentSvg] < epsilon) scrollPercentage[CurrentSvg] = 0;
        if (scrollPercentage[CurrentSvg] > 1-epsilon) scrollPercentage[CurrentSvg] = 1;

        if (CurrentSvg >= 0) {
            let chatLength = elem.svg[CurrentSvg].length;
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

    // Détection trackpad vs molette :
    // - Molette : deltaMode=1 (lignes) ou grands deltaY discrets, events espacés
    // - Trackpad : deltaMode=0 (pixels), petits deltaY, events en rafale
    elem.onwheel = function(e){
        e.preventDefault();
        if (inputType === 'touch') return;

        var deltaY;
        var isTrackpad = (e.deltaMode === 0 && Math.abs(e.deltaY) < 50);

        if (isTrackpad) {
            inputType = 'trackpad';
            deltaY = e.deltaY * TRACKPAD_MULTIPLIER;
        } else {
            inputType = 'mouse';
            var direction = e.deltaY > 0 ? 1 : -1;
            deltaY = direction * MOUSE_WHEEL_STEP;
        }

        engine(deltaY);
    };


///////////Touch Event /////////
    var lastTouchY = 0;

    function handleStart(evt) {
        inputType = 'touch';
        evt.preventDefault();
        lastTouchY = evt.touches[0].pageY;
    }

    function handleMove(evt) {
        evt.preventDefault();
        var touchY = evt.touches[0].pageY;
        var deltaY = (lastTouchY - touchY) * TOUCH_MULTIPLIER;
        lastTouchY = touchY;
        engine(deltaY);
    }

    function handleEnd(evt) {
        evt.preventDefault();
    }

    elem.addEventListener("touchstart", handleStart, {passive: false});
    elem.addEventListener("touchmove", handleMove, {passive: false});
    elem.addEventListener("touchend", handleEnd, {passive: false});
    elem.addEventListener("touchcancel", handleEnd, {passive: false});
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