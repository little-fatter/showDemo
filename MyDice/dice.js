import DiceBox from "https://unpkg.com/@3d-dice/dice-box@1.0.8/dist/dice-box.es.min.js";

const music = new Audio('./dice.mp3');

let Box = new DiceBox("#dice-box", {
  assetPath: "assets/",
  origin: "https://unpkg.com/@3d-dice/dice-box@1.0.8/dist/",
  theme: "default",
  themeColor: "#feea03",
  offscreen: true,
  scale: 6
});

Box.init().then(async () => {
  document.querySelector('.loading').remove()
});

const rollem = document.getElementById("rollem");
const addem = document.getElementById("addem");
const mute = document.getElementById("mute");
const dice_table = document.querySelector("#dice-box canvas");
const switcher = document.getElementById('hide');
const cap = document.querySelector('.cap');
const ul = document.getElementsByTagName('ul')[0];

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

function get_random(list) {
  return list[Math.floor(Math.random() * list.length)];
}

rollem.addEventListener("click", (e) => {
  !mute.checked && music.play();
  Box.roll("5d6", {
    themeColor: color
  });
});

addem.addEventListener("click", (e) => {
    !mute.checked && music.play();
    Box.add("1d6", {
      themeColor: color
    });
  });

dice_table.addEventListener("click", (e) => {
  Box.clear();
});

switcher.addEventListener('click', () => {
  cap.style.display = 'flex'
})
cap.addEventListener('click', () => {
  cap.style.display = 'none'
})

ul.addEventListener('click', (e) => {
  document.querySelector('li.selected').removeAttribute('class')
  e.target.setAttribute('class','selected')
  color = colors[e.target.getAttribute('number')]
  console.log(color)
})
