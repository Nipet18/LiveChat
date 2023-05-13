import React from 'react';
import { useEffect, useState } from "react";

const UserStat = ({ socket, username, room }) => {

    const [records, setRecords] = useState([])

    useEffect(() => {
        fetch("/../server/index/api")
            .then(response => response.json())
            .then(data => setRecords(data))
            .catch(err => console.log(err))
    }, [])


    //how to fetch user data from server?
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th><th>Room nr.</th>
                    </tr>
                    <tr>

                        {records.map((list, index) => (
                            <li key={index}>{list.id} | {list.name}</li>
                        ))}
                    </tr>

                    <tr>
                        <p>{username}</p>

                    </tr>
                </thead>
            </table>
        </div>
    );
}

export default UserStat;

