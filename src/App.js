import './App.css';
import React from 'react';
import { useState, useEffect } from 'react';

/* Helper Functions */
const getRandomInt = (arr, max) => {
    return arr[Math.floor(Math.random() * max)];
}

const Progress = ({ frequency, percentCompleted, setPercentCompleted, start, setStart }) => {
    const refreshRate = 10;

    const progressFillStyles = {
        height: '100%',
        width: `${percentCompleted}%`,
        backgroundColor: "#00695c",
        borderRadius: 'inherit',
        behavior: 'smooth'
        // textAlign: 'right'
    }

    const getPercentComplete = () => {
        const value = Math.floor(((Date.now() - start) / frequency) * 100);

        if (value == 100) {
            setStart(Date.now());
            return 0;
        } else {
            return value;
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setPercentCompleted(getPercentComplete());
        }, refreshRate)
        return () => {
            clearInterval(interval);
        }
    }, [frequency, start])

    return (
        <div className="progress-container">
            <p>{percentCompleted}</p>
            <div style={progressFillStyles}>
                <span className='progress-label'>{`${percentCompleted}%`}</span>
            </div>
        </div>
    )
}

const Input = ({ setFrequency, setPercentCompleted, setStart }) => {

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setFrequency(event.target.value * 1000);
            setPercentCompleted(0);
            setStart(Date.now());
        }
    }
    return (
        <input type="number" onKeyDown={handleKeyDown} />
    )
}

const NotesAndStrings = ({ frequency }) => {
    const notes = [
        'E', 'E#', 'F', 'F#', 'Gb', 'G','G#', 'Ab',
        'A', 'A#', 'Bb', 'B', 'C', 'Cb', 'C#', 'D', 
        'Db', 'D#', 'Eb'
    ];
    const strings = ['Low E', 'A', 'D', 'G', 'B', 'High E'];

    const [note, setNote] = useState(notes[0]);
    const [string, setString] = useState(strings[0]);

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
        <p>{note} on {string} string</p>
    );

}

const NoteRecognitionPractice = () => {
    const [percentCompleted, setPercentCompleted] = useState(0);
    const [frequency, setFrequency] = useState(5000);
    const [start, setStart] = useState(Date.now());

    return (
        <div className="note-recognition-practice">
            <p>Current frequency: <strong>{frequency / 1000}</strong> seconds</p>
            <Input 
                setFrequency={setFrequency}
                setPercentCompleted={setPercentCompleted}
                setStart={setStart}
            />
            <NotesAndStrings 
                frequency={frequency}
            />
            <Progress 
                frequency={frequency}
                percentCompleted={percentCompleted}
                setPercentCompleted={setPercentCompleted}
                start={start}
                setStart={setStart}
            />
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <NoteRecognitionPractice />
            </header>
        </div>
    );
}

export default App;
