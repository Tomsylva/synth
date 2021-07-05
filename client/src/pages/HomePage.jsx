import "../App.css";
import * as JZZ from "jzz";

function HomePage() {
  const onSuccess = function () {
    const midiPort = JZZ()
      .openMidiIn("Playtron")
      .then(console.log("Playtron connected"), (midiPort) => {
        midiPort
          .noteOn(0, "C2", 127)
          .then(console.log("NOTEON"))
          .wait(500)
          .noteOff(0, "C2")
          .close()
          .then(console.log("NOTEOFF"));
      });
    console.log("PORT INFO: ", midiPort.info());
    // const closeMidi = function () {
    //   midiPort.close().then(console.log("MIDI PORT CLOSED"));
    // };
  };

  const onFail = function () {
    console.log("MIDI FAIL");
  };

  JZZ.requestMIDIAccess().then(onSuccess, onFail);

  return (
    <div className="App">
      <h1>PLAYTRON SYNTH</h1>
    </div>
  );
}

export default HomePage;
