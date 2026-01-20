const API_URL = 'http://localhost:3000';


export function authHeaders() {
  const token = localStorage.getItem('token');

  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

export async function login(username: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json();
}

export async function register(data: {
  name: string;
  surname: string;
  rol: string;
  username: string;
  email: string;
  password: string;
  }) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Register failed');
  }

  return response.json();
}


export async function getCompetitions() {
  const response = await fetch(`${API_URL}/competition`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load competitions');
  }

  return response.json();
}


export async function getCompetitionById(id: number) {
  const response = await fetch(`${API_URL}/competition/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error('Failed to load competition');
  }

  return response.json();
}


export async function getCompetitionStandings(competitionId: number) {
  const response = await fetch(
    `${API_URL}/competition/${competitionId}/teams`,
    {
      method: 'GET',
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to load standings');
  }

  return response.json();
}

export async function getCompetitionMatches(competitionId: number) {
  const response = await fetch(
    `${API_URL}/competition/${competitionId}/matches`,
    {
      method: 'GET',
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to load matches');
  }

  return response.json();
}

export async function getMatchById(matchId: number) {
  const response = await fetch(
    `${API_URL}/matches/${matchId}`,
    {
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to load match');
  }

  return response.json();
}

export async function getTeamPlayers(teamId: number) {
  const response = await fetch(
    `${API_URL}/team/${teamId}/players`,
    {
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to load players');
  }

  return response.json();
}

export async function getMyCompetitions() {
  const response = await fetch(`${API_URL}/competition/my`, {
    method: 'GET',
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to load my competitions');
  }

  return response.json();
}


export async function createCompetition(data: {
  name: string;
  category: string;
}) {
  const response = await fetch(`${API_URL}/competition`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create competition');
  }

  return response.json();
}

export async function createTeam(data: { name: string }) {
  const response = await fetch('http://localhost:3000/team', {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Failed to create team');
  }

  return response.json();
}

export async function getMyTeams() {
  const response = await fetch('http://localhost:3000/team/my', {
    method: 'GET',
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error('Failed to load teams');
  }

  return response.json();
}

export async function addTeamToCompetition(
  competitionId: number,
  teamId: number
) {
  const response = await fetch(
    `${API_URL}/competition/${competitionId}/team/${teamId}`,
    {
      method: "PATCH",
      headers: authHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to add team to competition");
  }

  return response.json();
}


