import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:4500/api/projects")
      .then(res => {
        console.log(res.data);
        setProjects(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  if (!projects) {
    return <div>Loading Projects...</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        {projects &&
          projects.map(item => (
            <div key={item.id}>
              <h4>{item.name}</h4>
              <p>{item.description}</p>
              <p>{item.completed}</p>
            </div>
          ))}
      </header>
    </div>
  );
}

export default App;
