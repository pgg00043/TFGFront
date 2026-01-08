import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CompetitionsPage from './pages/CompetitionsPage';
import CompetitionPage from './pages/CompetitionPage';
import MatchDetailPage from './pages/MatchDetailPage';
import TeamDetailPage from './pages/TeamDetailPage';
import MyLeaguesPage from "./pages/MyLeaguesPage";
import CreateLeague from './pages/CreateLeague';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<CompetitionsPage />} />
        <Route path="/competition/:id" element={<CompetitionPage />} />
        <Route path="/matches/:id" element={<MatchDetailPage />} />
        <Route path="/team/:id" element={<TeamDetailPage />} />
        <Route path="/competitions/create" element={<CreateLeague />} />
        <Route path="/my-leagues" element={<MyLeaguesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
