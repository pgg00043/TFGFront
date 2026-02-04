import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import CompetitionsPage from './pages/leagues/CompetitionsPage';
import CompetitionPage from './pages/leagues/CompetitionPage';
import MatchDetailPage from './pages/matches/MatchDetailPage';
import TeamDetailPage from './pages/teams/TeamDetailPage';
import MyLeaguesPage from "./pages/leagues/MyLeaguesPage";
import CreateLeague from './pages/leagues/CreateLeague';
import CreateTeamPage from './pages/teams/CreateTeam';
import MyTeamsPage from './pages/teams/MyTeamsPage';
import { AuthProvider } from './auth/AuthContext';
import Header from './components/Header';
import { NotificationProvider } from './ui/NotificationContext';
import UserProfilePage from './pages/user/UserProfile';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Header />
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
            <Route path="/profile/:id" element={<UserProfilePage />} />
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
    
  );
}

export default App;
