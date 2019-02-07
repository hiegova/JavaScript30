var parentElem = document.querySelector("#drums");
var keyMap = {
  a: "clap",
  s: "hihat",
  d: "kick",
  f: "openhat",
  g: "boom",
  h: "ride",
  j: "snare",
  k: "tom",
  l: "tink"
};

renderDrumKit(parentElem, keyMap);

document.addEventListener("keypress", function (e) {
  var chrKey = getChar(e);

  if (!chrKey || !(chrKey in keyMap)) {
    return;
  }

  var keyElem = document.querySelector(`li[data-key="${chrKey}"]`);
  var soundName = `sounds/${keyMap[chrKey]}.wav`;
  var audioPlayer = document.querySelector(`audio[src="${soundName}"]`);

  if (audioPlayer) {

    keyElem.classList.add("playing");
    audioPlayer.currentTime = 0;
    audioPlayer.play();

  } else {

    audioPlayer = document.createElement("audio");
    keyElem.classList.add("playing");
    audioPlayer.src = soundName;
    document.body.appendChild(audioPlayer);
    audioPlayer.play();

  }

  keyElem.addEventListener("transitionend", function handler() {
    keyElem.classList.remove("playing");
    keyElem.removeEventListener("transitionend", handler);
  }, false);
});

function renderDrumKit(parentElem, keyMap) {
  var ul = document.createElement("ul");

  for (var key in keyMap) {
    var kbdKey = document.createElement("kbd");
    var spanInstrument = document.createElement("span");
    var li = document.createElement("li");

    kbdKey.textContent = key;
    kbdKey.className = "key";
    spanInstrument.textContent = keyMap[key];
    spanInstrument.className = "sound";

    li.setAttribute("data-key", key);
    li.appendChild(kbdKey);
    li.appendChild(spanInstrument);

    ul.appendChild(li);
  }

  parentElem.appendChild(ul);
}

function getChar(event) {
  if (event.which == null) {
    if (event.keyCode < 32) return null;
    return String.fromCharCode(event.keyCode)
  }
  if (event.which != 0 && event.charCode != 0) {
    if (event.which < 32) return null;
    return String.fromCharCode(event.which);
  }
  return null;
}
