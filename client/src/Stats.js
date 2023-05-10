import React, { useState, useEffect } from 'react';

function Stats() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('/Chat/data')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h2>Statistics</h2>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        {item.name}: {item.value}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Stats;
