export const audioContext = new AudioContext();

export const decode = (audioData: ArrayBuffer) => audioContext.decodeAudioData(audioData);

export const playback = (audio: AudioBuffer) => {
  const play = audioContext.createBufferSource();
  play.buffer = audio;
  play.connect(audioContext.destination);
  play.start(audioContext.currentTime);
};
