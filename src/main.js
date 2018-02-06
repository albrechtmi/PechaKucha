var pechaKuchaData;
var pechaKuchaSlideNo = 0;
var intervalNumber;
var seconds = 0;
var timePerSlide = 21; //21
var startSlide = 1;

function loadPechaKucha() {
  //initiales laden
  pechaKuchaData = JSON.parse(sData);

  //setting initial values
  //debugger;
  var slide = pechaKuchaData.slides[pechaKuchaSlideNo]; //Start Satz
  setSlideData(slide);
  //prepare for start
  pechaKuchaSlideNo = 0;
  setFolienCounter(pechaKuchaSlideNo);

  if(config.withText == true) {
    document.getElementById("pechaKuchaStartImgText").style.display = "";
  } else {
    document.getElementById("pechaKuchaStartImgText").style.display = "none";
  }

}

function setFolienCounter(slideNumber) {
  if(slideNumber == 0 ) {
    return;
  }

  if(slideNumber == pechaKuchaData.slides.length - 1 ) {
    return;
  }

  var slideNo = slideNumber;
  var sSlidesAnz = pechaKuchaData.slides.length - 2;
  document.getElementById("foliencounter").innerHTML = slideNo + "/" + sSlidesAnz;
}

function startPechaKucha() {
  document.getElementById("pechaKuchaStartImg").style.display = "none";
  document.getElementById("pechaKuchaStartImgText").style.display = "none";
  intervalNumber = 0;
  setProgressBar(0);
  pechaKuchaSlideNo = startSlide;
  var slide = pechaKuchaData.slides[pechaKuchaSlideNo];
  setSlideData(slide);
  add1SecondFunction();
  setFolienCounter(pechaKuchaSlideNo);
}

function startPechaKuchaText() {
  document.getElementById("pechaKuchaText").style.display = "block";
  startPechaKucha();
}

function nextSlide() {
  pechaKuchaSlideNo = pechaKuchaSlideNo + 1;
  seconds = 0;
  if(pechaKuchaSlideNo == pechaKuchaData.slides.length ) {
    //Bei letzter Folie angekommen - STOP();
    document.getElementById("pechaKuchaStartImgLayer").style.display = "";
    var correctLength = timePerSlide - 1;
    setProgressBar(correctLength);
    document.getElementById("pechaKuchaStartImg").style.display = "";
    document.getElementById("pechaKuchaStartImgText").style.display = "";
    return;
  }
  var slide = pechaKuchaData.slides[pechaKuchaSlideNo];
  setSlideData(slide); //Daten setzen
  setFolienCounter(pechaKuchaSlideNo);
  add1SecondFunction(); //Timer fortsetzen
}

function setSlideData(slide) {
  document.getElementById("pechaKuchaTitle").innerHTML = slide.title;
  document.getElementById("pechaKuchaText").innerHTML = slide.textHTML;

  //Bildinfos setzen
  var img = document.getElementById("pechaKuchaImageSrc");
  img.style.height = slide.imgHeight;
  img.style.width = slide.imgWidth;
  img.style.marginTop = slide.imageMarginTop;
  img.src = slide.imageSrc;


  //ProgressBar Infos setzen
  document.getElementById("progressBarLayer").style.backgroundColor = slide.progressBarColorBackground;
  document.getElementById("progressBar").style.backgroundColor = slide.progressBarColor;

  //Title Color setzen
  document.getElementById("pechaKuchaTitle").style.color = slide.titleColor;

  //Text Color setzen
  document.getElementById("pechaKuchaText").style.color = slide.textColor;

  //Border Color setzen
  document.getElementById("container").style.borderColor = slide.borderColor;
}

function setProgressBar(secondsCount) {
  var percent = 0;
  var correctLength = timePerSlide - 1;
  percent = 100 * secondsCount / correctLength;
  var percentString = "";
  percentString = percent + "%";
  document.getElementById("progressBar").style.width = percentString;
}

function add1SecondFunction() {
  // do whatever you like here
  setProgressBar(seconds);
  seconds = seconds + 1;
  //document.getElementById("secondsIndicator").innerHTML = seconds; //Display Timer Value
  if (seconds > timePerSlide) {
    console.log("next slide");
    nextSlide();
    return;
  }
  setTimeout(add1SecondFunction, 1000);
}
