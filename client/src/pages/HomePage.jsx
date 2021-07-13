import React from "react";
import { motion } from "framer-motion";
// import * as JZZ from "jzz";

function HomePage() {
  const [currentInstrument, setCurrentInstrument] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const onSuccess = function (midiAccess) {
    const inputs = midiAccess.inputs;
    // const outputs = midiAccess.outputs;
    for (let input of inputs.values()) {
      input.onmidimessage = getMIDIMessage;
    }
    function getMIDIMessage(midiMessage) {
      const command = midiMessage.data[0];
      const note = midiMessage.data[1];
      const velocity = midiMessage.data.length > 2 ? midiMessage.data[2] : 0;
      const instruments = {
        36: "BASS",
        37: "SNARE",
        38: "HATS",
        39: "CRASH",
        40: "set me",
        41: "set me",
        42: "set me",
        43: "set me",
        44: "set me",
        45: "set me",
        46: "set me",
        47: "set me",
        48: "set me",
        49: "set me",
        50: "set me",
        51: "set me",
      };

      // eslint-disable-next-line
      switch (command) {
        case 144:
          if (velocity > 0) {
            // JZZ.noteOn(note, velocity);
            const instrument = instruments[note];
            setCurrentInstrument(instrument);
            if (midiMessage.target.name !== "Playtron") {
              setErrorMessage(
                "This online synth has been designed to work with a Playtron by Playtronica, however, all midi devices will work between C1 and D#2."
              );
            }
          } else {
            // JZZ.noteOff(note);
            endOfNote();
          }
          break;
        case 128:
          // JZZ.noteOff(note);
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

  navigator.requestMIDIAccess().then(onSuccess, onFail);

  return (
    <div className="App">
      <h1 id="maintitle">PLAYTRON SYNTH</h1>
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
  );
}

export default HomePage;
