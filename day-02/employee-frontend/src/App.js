import { useState, useEffect } from "react";
import names from "./data.js";
import List from "./List";
import "./style.css";

function App() {
  
  const getData = async () => {
   
    try {
      const response = await fetch("http://localhost:8080/");
      const data = await response.json(); 
      setEmployees(data);
     
    } catch(err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const [employees, setEmployees] = useState(names);
  const [isLoading, setIsLoading] = useState(true);

  const body = (
    <main>
      <section className='container'>
        <List names={employees} />
        <button
          onClick={() => {
            setEmployees([]);
          }}
        >
          Clear All
        </button>
      </section>
    </main>
  );

  const loading = (
    <main>
      <section className='container'>
        <h1>Loading...</h1>
      </section>
    </main>
  );

  return <>{isLoading ? body : loading}</>;
}

export default App;
