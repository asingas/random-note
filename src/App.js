import './App.css';
import React from 'react';
import {useState, useEffect} from 'react';


const Progress = (props) => {

  const [completed, setCompleted] = useState(100);
  const refreshRate = 100

  const progressFillStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: "#00695c",
    borderRadius: 'inherit',
    textAlign: 'right'
  }

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setCompleted(((Date.now() - start) / props.frequency) * 100);
    }, refreshRate)
    return () => {
      clearInterval(interval);
    }

  }, [props.frequency])

  return (
    <div className="progress-container">
      <div style={progressFillStyles}>
        <span className='progress-label'>{`${completed}%`}</span>
      </div>
    </div>
  )
}

const getRandomInt = (arr, max) => {
  return arr[Math.floor(Math.random() * max)];
}

const Input = ({setFrequency}) => {

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setFrequency(event.target.value * 1000);
    }
  }
  return (
    <input type="number" onKeyDown={handleKeyDown} />
  )
}

function App() {
  const notes = [
    'E', 'E#', 'F', 'F#', 'Gb', 'G', 
    'G#', 'Ab', 'A', 'A#', 'Bb', 'B', 
    'C', 'Cb', 'C#', 'D', 'Db', 'D#','Eb'
  ];
  const strings = ['Low E', 'A', 'D', 'G', 'B', 'High E'];

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
        <p>Current frequency: {frequency / 1000} seconds</p> 
        <Input setFrequency={setFrequency}  />
        <p>{note} on {string} string</p>
        <Progress frequency={frequency}/>
      </header>
    </div>
  );
}

export default App;
