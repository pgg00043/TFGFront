import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CompetitionsPage from './pages/teams/CompetitionsPage';
import CompetitionPage from './pages/leagues/CompetitionPage';
import MatchDetailPage from './pages/matches/MatchDetailPage';
import TeamDetailPage from './pages/teams/TeamDetailPage';
import MyLeaguesPage from "./pages/leagues/MyLeaguesPage";
import CreateLeague from './pages/leagues/CreateLeague';
import CreateTeamPage from './pages/teams/CreateTeam';
import MyTeamsPage from './pages/teams/MyTeamsPage';


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
        <Route path="/teams/create" element={<CreateTeamPage />} />
        <Route path="/my-teams" element={<MyTeamsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
