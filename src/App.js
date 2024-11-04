import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">메뉴1</Link>
            </li>
            <li>
              <Link to="/red">메뉴2</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/red" element={<RedPage />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>홈</h2>;
}

function RedPage() {
  return <div style={{ backgroundColor: 'red', height: '100vh' }}>빨간 페이지</div>;
}

export default App;
