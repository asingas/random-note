import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';

const getRandomInt = (arr, max) => {
  return arr[Math.floor(Math.random() * max)];
}

const Input = ({setFrequency}) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setFrequency(event.target.value * 1000);
    }
  }
  return <input type="number" onKeyDown={handleKeyDown} />
}

function App() {

  const notes = ['E', 'E#', 'F', 'F#', 'Gb', 'G', 'G#', 'Ab', 'A', 'A#', 'Bb', 'B', 'C', 'Cb', 'C#', 'D', 'Db', 'D#','Eb'];
  const strings = ['High E', 'A', 'D', 'G', 'B', 'E'];

  const [frequency, setFrequency] = useState(5000);

  const [note, setNote] = useState('');
  const [string, setString] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setNote(getRandomInt(notes, notes.length));
      setString(getRandomInt(strings, strings.length));
    }, frequency)
    return () => {
      clearInterval(interval);
    }
  }, [frequency])

  return (
    <div className="App">
      <header className="App-header">
        <Input setFrequency={setFrequency} />
        <p>{note}</p> 
        <p>{string}</p>
      </header>
    </div>
  );
}

export default App;
