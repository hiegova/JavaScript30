var clockRadius = document.querySelector(".clock .clockFace").clientHeight / 2;
var innerOffset = parseInt(getComputedStyle(document.querySelector(".markers")).top);
var ul = document.querySelector("ul.markers");
var handHours = document.querySelector(".clock div.hand.hours");
var handMinutes = document.querySelector(".clock div.hand.minutes");
var handSeconds = document.querySelector(".clock div.hand.seconds");

document.querySelector(".markers").style.transformOrigin = `0 ${clockRadius - innerOffset}px`;

for (let i = 0, deg = 0; i <= 60; i++, deg += 6) {
  let li = document.createElement("li");
  ul.appendChild(li);
  li.style.transform = `rotate(${deg}deg) translateX(-50%)`;
}

setHandPosition(handHours, 30);
setHandPosition(handMinutes, 23);
setHandPosition(handSeconds, 18);

setTime();
setInterval(setTime, 1000);

function setTime() {
  var date = new Date();
  var ss = date.getSeconds();
  if (ss === 0) {
    handSeconds.style.transform = `rotate(${360}deg) translateX(-50%)`;
    handSeconds.style.transform = `translateX(-50%)`;
  } else {
    handSeconds.style.transform = `rotate(${ss * 6}deg) translateX(-50%)`;
  }
  var mm = date.getMinutes();
  handMinutes.style.transform = `rotate(${mm * 6 + ss / 10}deg) translateX(-50%)`;
  var hh = date.getHours();
  handHours.style.transform = `rotate(${hh * 30 + mm / 2}deg) translateX(-50%)`;
}

function setHandPosition(hand, ledge /* % */) {
  var top = clockRadius - hand.offsetHeight;
  ledge = ledge * hand.offsetHeight / 100;

  hand.style.top = top + ledge + "px";
  hand.style.transformOrigin = `0 ${clockRadius - top - ledge}px`;
}
