import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CompetitionsPage from './pages/CompetitionsPage';
import CompetitionPage from './pages/CompetitionPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<CompetitionsPage />} />
        <Route path="/competition/:id" element={<CompetitionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
