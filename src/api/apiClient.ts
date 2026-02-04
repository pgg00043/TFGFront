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

export async function getUserById(userId: number) {
  const response = await fetch(`${API_URL}/users/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('Failed to load user');
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

export async function getAllTeams() {
  const response = await fetch('http://localhost:3000/team', {
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

export async function addPlayerToTeam( teamId: number, playerId: number ) {
  const response = await fetch(
    `${API_URL}/users/${playerId}/team/${teamId}`,
    {
      method: "PATCH",
      headers: authHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to add player to team");
  }
  return response.json();
}

export async function searchPlayers(query: string) {
  const res = await fetch(`/users/search?name=${query}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error();
  return res.json();
}

export async function getTeamById(teamId: number) {
  const response = await fetch(
    `${API_URL}/team/${teamId}`,
    {
      method: "GET",
      headers: authHeaders(),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to load team');
  }
  return response.json();
}

export async function searchTeams(query: string) {
  const res = await fetch(`/teams/search?name=${query}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) throw new Error();
  return res.json();
}

export async function generateCompetitionCalendar(competitionId: number) {
  const res = await fetch(`${API_URL}/competition/${competitionId}/generate-matches`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  if (!res.ok) {
    throw new Error('Error al generar el calendario');
  }
}

export async function updateMatch(matchId: number, data: any) {
  const res = await fetch(`${API_URL}/matches/${matchId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Error al actualizar el partido');
  }
}

export async function uploadTeamImage(teamId: number, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(
    `http://localhost:3000/team/${teamId}/image`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to upload team image');
  }
}

export async function uploadUserAvatar(userId: number, file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(
    `${API_URL}/users/${userId}/image`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    }
  );

  if (!res.ok) {
    throw new Error('Error al subir avatar');
  }
}

export async function uploadCompetitionImage(
  competitionId: number,
  file: File,
) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(
    `${API_URL}/competition/${competitionId}/image`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    },
  );

  if (!res.ok) {
    throw new Error('Error al subir imagen de la competición');
  }
}

export async function createStat(dto: any) {
  const res = await fetch(`${API_URL}/stats`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error('Error creando estadística');
  return res.json();
}

export async function updateStat(id: number, dto: any) {
  const res = await fetch(`${API_URL}/stats/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(dto),
  });

  if (!res.ok) throw new Error('Error actualizando estadística');
  return res.json();
}



