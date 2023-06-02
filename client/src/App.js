import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import HomePage from './Components/HomePage/HomePage';
// import axios from 'axios';
import { useState/*, useEffect,*/  } from 'react';
import { Route, Routes/*, useLocation, useNavigate */} from 'react-router-dom' 
// 


function App() {
  const [dogs, setDogs] = useState([]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage dogs={dogs}/>} />
      </Routes>
    </div>
  );
}

export default App;
