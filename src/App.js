import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TileGrid from './pages/TileGrid';
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
        <Route path="/tile-grid" element={<TileGrid />} /> 
        {/* <Route path="/about" element={<About />} />  */}
      </Routes>
    </Router>
  );
}

export default App;