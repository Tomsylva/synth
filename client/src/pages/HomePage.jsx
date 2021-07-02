import logo from "../logo.svg";
import "../App.css";
import * as JZZ from "jzz";

function HomePage() {
  const onSuccess = function () {
    console.log("MIDI SUCCESS");
    const midiPort = JZZ()
      .openMidiIn("Playtron")
      .then(console.log("Playtron connected"));
    console.log("PORT INFO: ", midiPort.info());
    midiPort.close().then(console.log("MIDI PORT CLOSED"));
  };

  const onFail = function () {
    console.log("MIDI FAIL");
  };

  JZZ.requestMIDIAccess().then(onSuccess, onFail);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default HomePage;
