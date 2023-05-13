import React from 'react';
import { useEffect, useState } from 'react'

const FetchData = () => {

    const [records, setRecords] = useState([])

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then(data => setRecords(data))
            .catch(err => console.log(err))
    }, [])



    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th><th>Room nr.</th>
                    </tr>

                    {records.map((list, index) => (
                        <tr key={index}> {list.name}</tr>
                    ))}

                </thead>
            </table>
        </div>
    );
}

export default FetchData;


/*                    <tr>
                        {records.map((list, index) => (
                            <li key={index}>{list.id} | {list.name}</li>
                        ))}
                    </tr>*/