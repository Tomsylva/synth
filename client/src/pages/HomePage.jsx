import React from "react";
import { motion } from "framer-motion";

function HomePage() {
  const [currentInstrument, setCurrentInstrument] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [page, setPage] = React.useState("home");
  const [touchMe, setTouchMe] = React.useState(true);

  const onSuccess = function (midiAccess) {
    const inputs = midiAccess.inputs;
    for (let input of inputs.values()) {
      input.onmidimessage = getMIDIMessage;
    }
    function getMIDIMessage(midiMessage) {
      const command = midiMessage.data[0];
      const note = midiMessage.data[1];
      const velocity = midiMessage.data.length > 2 ? midiMessage.data[2] : 0;
      const instruments = {
        36: {
          instrumentName: "KICK",
          image: "synth/client/public/pngegg.png",
          sound: "#",
        },
        37: { instrumentName: "SNARE", image: "#", sound: "#" },
        38: { instrumentName: "HATS", image: "#", sound: "#" },
        39: { instrumentName: "CRASH", image: "#", sound: "#" },
        40: { instrumentName: "BASS E", image: "#", sound: "#" },
        41: { instrumentName: "BASS F#", image: "#", sound: "#" },
        42: { instrumentName: "BASS G#", image: "#", sound: "#" },
        43: { instrumentName: "BASS A", image: "#", sound: "#" },
        44: { instrumentName: "MELODY E", image: "#", sound: "#" },
        45: { instrumentName: "MELODY A", image: "#", sound: "#" },
        46: { instrumentName: "MELODY G#", image: "#", sound: "#" },
        47: { instrumentName: "MEDLODY C#", image: "#", sound: "#" },
        48: { instrumentName: "BEEPS E", image: "#", sound: "#" },
        49: { instrumentName: "BEEPS C#", image: "#", sound: "#" },
        50: { instrumentName: "BANANA!", image: "#", sound: "#" },
        51: { instrumentName: "SPOON!", image: "#", sound: "#" },
      };

      // eslint-disable-next-line
      switch (command) {
        case 144:
          if (velocity > 0) {
            const instrument = instruments[note].instrumentName;
            setCurrentInstrument(instrument);
            setTouchMe(false);
            if (midiMessage.target.name !== "Playtron") {
              setErrorMessage(
                "This online synth has been designed to work with a Playtron by Playtronica, however, all midi devices will work between C1 and D#2."
              );
            }
          } else {
            endOfNote();
          }
          break;
        case 128:
          endOfNote();
          function endOfNote() {
            setTimeout(function () {
              setCurrentInstrument("");
            }, 300);
          }
          break;
      }
    }
  };

  const onFail = function () {
    setErrorMessage("Could not connect to your midi device");
  };

  const loadSynth = function () {
    setPage("synth");
  };

  navigator.requestMIDIAccess().then(onSuccess, onFail);

  return (
    <div className="App">
      {page === "home" ? (
        <div>
          <h1>PLAYTRON SYNTH!!</h1>
          <button onClick={loadSynth}>Let's get started!</button>
        </div>
      ) : (
        <div className="snyth-page">
          {touchMe ? <h3>Go on, touch me...</h3> : null}
          {currentInstrument ? (
            <motion.div
              initial="visible"
              animate="hidden"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 },
                transition: {
                  delay: 0.01,
                },
              }}
            >
              <h2>{currentInstrument}</h2>
            </motion.div>
          ) : null}
          {errorMessage ? <h3>{errorMessage}</h3> : null}
        </div>
      )}
    </div>
  );
}

export default HomePage;
