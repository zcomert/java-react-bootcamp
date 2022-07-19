import { useState } from "react";
import names from "./data.js";
import List from "./List";
import "./style.css";

function App() {
  const [employees, setEmployees] = useState(names);
  const [isLoading, setIsLoading] = useState(true);

  const body = (
    <main>
      <section className="container">
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
      <section className="container">
        <h1>Loading...</h1>
      </section>
    </main>
  );

  return (
    <>
      {isLoading ? body : loading}
    </>
  );
}

export default App;
