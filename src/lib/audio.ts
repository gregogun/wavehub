export const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export const decode = (audioData: ArrayBuffer) => audioContext.decodeAudioData(audioData);

export const getAudioDuration = async (audioData: ArrayBuffer) => {
  let duration;
  await audioContext.decodeAudioData(audioData, function (buffer) {
    duration = buffer.duration;
  });
  return duration;
};

export const playback = (audio: AudioBuffer) => {
  const play = audioContext.createBufferSource();
  play.buffer = audio;
  play.connect(audioContext.destination);
  play.start(audioContext.currentTime);
};
