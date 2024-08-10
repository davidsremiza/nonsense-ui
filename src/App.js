import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import './App.css';

function App() {
    const [data, setData] = useState([]);
    const [currentItem, setCurrentItem] = useState(null);

    useEffect(() => {
        fetch('/assets/nonsense_results.csv')
            .then(response => response.text())
            .then(csvData => {
                console.log('Raw CSV Data:', csvData);  // Log the raw CSV data
                const parsedData = Papa.parse(csvData, { header: true, skipEmptyLines: true });
                console.log('Parsed CSV Data:', parsedData);  // Log the parsed data
                setData(parsedData.data);
                setCurrentItem(parsedData.data[Math.floor(Math.random() * parsedData.data.length)]);
            })
            .catch(error => console.error('Error loading CSV:', error));
    }, []);

    const handleShuffle = () => {
        setCurrentItem(data[Math.floor(Math.random() * data.length)]);
    };

    return (
        <div className="App">
            {currentItem ? (
                <div className="content">
                    {currentItem.image_filename && (
                        <img src={`/assets/${currentItem.image_filename}`} alt={currentItem.short_title} className="image" />
                    )}
                    <div className="text">
                        <h3>{currentItem.short_title}</h3>
                        <p>{currentItem.scene}</p>
                        <p>{currentItem.poem}</p>
                    </div>
                    <button className="shuffle-button" onClick={handleShuffle}>Shuffle</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default App;
