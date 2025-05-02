import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import FillIn from './pages/FillIn';
import Match from './pages/Match';
import './components/Navbar.css';
import FillInBlankWords from './pages/FillInBlankWords';
import MatchWords from './pages/MatchWords';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />        
        <Route path="/fillin" element={<FillIn />} />        
        <Route path="/match" element={<Match />} />        
        <Route path="/fill-in-blank" element={<FillInBlankWords />} /> 
        <Route path="/drag-drop-match" element={<MatchWords />} /> 
      </Routes>
    </Router>
  );
}

export default App;