import DiceBoxConstructor from "https://unpkg.com/@3d-dice/dice-box@1.0.8/dist/dice-box.es.min.js";

const music = new Audio('./dice.mp3');
const rollem = document.getElementById("rollem");
const addem = document.getElementById("addem");
const mute = document.getElementById("mute");
const switcher = document.getElementById('hide');
const cap = document.querySelector('.cap');
const ul = document.getElementsByTagName('ul')[0];
const empowerBtn = document.querySelector('.IOSOnly');
let DiceBox, couldRollDice = true;
const colors = [
  "#9c27b0",
  "#22BABB",
  "#9EF8EE",
  "#FA7F08",
  "#F24405",
  "#F25EB0",
  "#B9BF04",
  "#F2B705",
  "#4caf50"
];
let color = colors[0]
const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
const SHAKE_THRESHOLD = 4000;
let last_updateTime = 0;
let accelerateX, accelerateY, accelerateZ, last_accelerateX = 0, last_accelerateY = 0, last_accelerateZ = 0;

(function InitDice() {
  DiceBox = new DiceBoxConstructor("#dice-box", {
    assetPath: "assets/",
    origin: "https://unpkg.com/@3d-dice/dice-box@1.0.8/dist/",
    offscreen: true,
    scale: 6
  });

  DiceBox.init().then(async () => {
    document.querySelector('.loading').remove()
    addListeners()
  });
  DiceBox.onRollComplete = () => couldRollDice = true
})()

  (function initDevicemotion() {
    if (window.DeviceMotionEvent) {
      if (isIOS) {
        empowerBtn.style.display = "inline-block";
      } else {
        window.addEventListener('devicemotion', deviceMotionHandler, false)
      }
    } else {
      alert('不支持摇一摇！');
    }
  })()

function playMusic() {
  if (!mute.checked) {
    navigator.vibrate([500, 300, 400]);
    music.play();
  }
}

function rollDice() {
  if (couldRollDice === false) return
  couldRollDice = false
  playMusic()
  DiceBox.roll("5d6", {
    themeColor: color
  });
}

function getPermission() {
  if (
    typeof window.DeviceMotionEvent !== 'undefined' &&
    typeof window.DeviceMotionEvent.requestPermission === 'function'
  ) {
    window.DeviceMotionEvent.requestPermission()
      .then(function (state) {
        if ('granted' === state) {
          window.addEventListener('devicemotion', deviceMotionHandler, false)
        } else {
          alert('摇一摇需要授权设备运动权限,请重启应用后,再次进行授权!')
        }
      })
      .catch(function (err) {
        alert('error: ' + err)
      })
  }
}

function deviceMotionHandler(eventData) {
  const acceleration = eventData.accelerationIncludingGravity;
  const curTime = new Date().getTime();
  if ((curTime - last_updateTime) > 10) {
    const diffTime = curTime - last_updateTime;
    last_updateTime = curTime;
    accelerateX = acceleration.x;
    accelerateY = acceleration.y;
    accelerateZ = acceleration.z;
    const speed = Math.abs(accelerateX + accelerateY + accelerateZ - last_accelerateX - last_accelerateY - last_accelerateZ) / diffTime * 10000;
    if (speed > SHAKE_THRESHOLD) {
      rollDice()
    }
    last_accelerateX = accelerateX;
    last_accelerateY = accelerateY;
    last_accelerateZ = accelerateZ;
  }
}

function addListeners() {
  const dice_table = document.querySelector("#dice-box canvas");

  rollem.addEventListener("click", function reRollDice() {
    rollDice()
  });

  addem.addEventListener("click", function addOneDice() {
    playMusic()
    DiceBox.add("1d6", {
      themeColor: color
    });
  });

  dice_table.addEventListener("click", function clearDice() {
    DiceBox.clear();
  });

  switcher.addEventListener('click', function closeLight() {
    cap.style.display = 'flex'
  })

  cap.addEventListener('click', function openLight() {
    cap.style.display = 'none'
  })

  ul.addEventListener('click', function selectColor(e) {
    if (e.target.nodeName === 'LI') {
      document.querySelector('li.selected')?.removeAttribute('class')
      e.target.setAttribute('class', 'selected')
      color = colors[e.target.getAttribute('number')]
    }
  })
}

