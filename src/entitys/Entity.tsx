export type Team = {
  id: number;
  name: string;
  players?: User[];
  competitions?: number[];
  played: number;
  won: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
  imageUrl?: string;
  owner: {
    id: number;
    name: string;
  }
};

export type Match = {
  id: number;
  date: Date;
  hour: string;
  location: string;
  homeTeam: {
    id: number;
    name: string;
    players: User[];
  };
  awayTeam: {
    id: number;
    name: string;
    players: User[];
  };
  scoreHome: number | 0;
  scoreAway: number | 0;
  competition: Competition;
  stats?: Stat[];
};

export type Competition = {
  id: number;
  name: string;
  category: string;
  teams: Team[];
  ownerId: number;
  imageUrl?: string;
};

export type StandingRow = {
  id: number;
  name: string;
  played: number;
  won: number;
  lost: number;
  pointsFor: number;
  pointsAgainst: number;
};

export type User = {
  userId: number;
  name: string;
  surname: string;
  id: number;
  username: string;
  email: string;
  imageUrl?: string;
  teams?: Team[];

}

export type Stat = {
  id: number;
  points: number;
  rebounds: number;
  assists: number;
  steals: number;
  blocks: number;
  turnovers: number;
  fouls: number;
  minutesPlayed: number;
  user: User;
};