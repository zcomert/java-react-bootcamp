import names from "./data.js";
import List from "./List";
import './style.css';

function App() {
  console.log(names);
  return (
    <>
      <h1>Hello React! {names.length} </h1>
      <List names={names}/>
      
    </>
  );
}

export default App;
