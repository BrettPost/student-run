import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [teachers, setTeachers] = useState();

    useEffect(() => {
        populateTeachers();
    }, []);

    const contents = teachers === undefined
        ? <p><em>Loading... Please refresh once the ASP.NET backend has started. See <a href="https://aka.ms/jspsintegrationreact">https://aka.ms/jspsintegrationreact</a> for more details.</em></p>
        : <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                {teachers.map((teacher, i) =>
                    <tr key={i}>
                        <td>{teacher.id}</td>
                        <td>{teacher.firstName}</td>
                        <td>{teacher.lastName}</td>
                        <td>{teacher.grade}</td>
                    </tr>
                )}
            </tbody>
        </table>;

    return (
        <div>
            <h1 id="tableLabel">Weather forecast</h1>
            <p>This component demonstrates fetching data from the server.</p>
            {contents}
        </div>
    );
    
    async function populateTeachers() {
        const response = await fetch('teacher');
        if (response.ok) {
            const data = await response.json();
            setTeachers(data);
        }
    }
}

export default App;