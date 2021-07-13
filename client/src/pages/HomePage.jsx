import "../App.css";
// import * as JZZ from "jzz";

function HomePage() {
  const onSuccess = function (midiAccess) {
    console.log("MIDI ACCESS: ", midiAccess);
    const inputs = midiAccess.inputs;
    console.log("INPUTS: ", inputs);
    const outputs = midiAccess.outputs;
    console.log("OUTPUTS: ", outputs);
    for (let input of inputs.values()) {
      input.onmidimessage = getMIDIMessage;
    }
    function getMIDIMessage(midiMessage) {
      console.log(midiMessage);
      const command = midiMessage.data[0];
      const note = midiMessage.data[1];
      const velocity = midiMessage.data.length > 2 ? midiMessage.data[2] : 0;

      // eslint-disable-next-line
      switch (command) {
        case 144:
          if (velocity > 0) {
            // JZZ.noteOn(note, velocity);
            console.log("NOTE ON", note);
          } else {
            // JZZ.noteOff(note);
            console.log("NOTE OFF");
          }
          break;
        case 128:
          // JZZ.noteOff(note);
          console.log("NOTE OFF");
          break;
      }
    }

    // const midiPort = JZZ()
    //   .openMidiIn("Playtron")
    //   .then((midiPort) => {
    //     console.log("Playtron connected");
    //     const inputs = midiPort.inputs;
    //     console.log("inputs", inputs);
    //   });
    // console.log("PORT INFO: ", midiPort.info());
  };

  const onFail = function () {
    console.log("MIDI FAIL");
  };

  // JZZ.requestMIDIAccess().then(onSuccess, onFail);
  navigator.requestMIDIAccess().then(onSuccess, onFail);

  return (
    <div className="App">
      <h1 id="maintitle">PLAYTRON SYNTH</h1>
    </div>
  );
}

export default HomePage;
