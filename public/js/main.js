import {Demineur} from './Demineur.js';

let demineur = new Demineur(
  document.getElementById("app"),
  document.getElementById("reset-game")
);

demineur.prepare();

// morpion.launch(document.querySelectorAll("#app span"));
