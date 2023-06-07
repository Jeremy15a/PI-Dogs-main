import './App.css';
import LandingPage from './Components/LandingPage/LandingPage';
import HomePage from './Components/HomePage/HomePage';
import Detail from './Components/Detail/Detail.jsx'
import CreateDog from './Components/CreateDog/CreateDogs.jsx'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/CreateDog" element={<CreateDog />} />
      </Routes>
    </div>
  );
}

export default App;