const txtarea = document.querySelector("textarea");
const btn = document.querySelector("button");
const voicelist = document.querySelector("select");
let isSpeaking = true;
const txtToSpeech = (text) => {
  let speech = new SpeechSynthesisUtterance(text);
  for (let voice of speechSynthesis.getVoices()) {
    if (voice.name === voicelist.value) {
      speech.voice = voice;
    }
  }
  speechSynthesis.speak(speech);
};

const voices = () => {
  for (let voice of speechSynthesis.getVoices()) {
    let selected = voice.name === "Google US English" ? "selected" : "";
    let option = ` <option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voicelist.insertAdjacentHTML("beforeend", option);
  }
};
speechSynthesis.addEventListener("voiceschanged", voices);

btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (txtarea.value !== "") {
    if (!speechSynthesis.speaking) {
      txtToSpeech(txtarea.value);
    }
    if (txtarea.value.length > 80) {
      if (isSpeaking) {
        speechSynthesis.resume();
        isSpeaking = false;
        btn.innerText = "Pause";
      } else {
        speechSynthesis.pause();
        isSpeaking = true;
        btn.innerText = "Resume";
      }
      setInterval(() => {
        if (!speechSynthesis.speaking && !isSpeaking) {
          isSpeaking = true;
          btn.innerText = "Convert To Speech";
        }
      });
    } else {
      btn.innerText = "Convert To Speech";
    }
  }
});
