import { Route, Routes, Link } from 'react-router-dom';
import TopLink from './components/links/TopLink';
import Add from "./pages/author/Add"
import List from "./pages/author/List"
import Put from "./pages/author/Put"
import Home from './pages/home/Home';

function App() {
  return (
    <div>
      <TopLink />
      <Routes>
        <Route path="/author/list" element={<List />} />
        <Route path="/author/add" element={<Add />} />
        <Route path="/author/put" element={<Put />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
