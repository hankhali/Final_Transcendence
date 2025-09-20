export interface ApiService {
  tournaments: {
    start: (tournamentId: number) => Promise<{ data: any; error: any }>;
    finish: (matchId: number, result: any) => Promise<{ data: any; error: any }>;
    submitMatchResult: (tournamentId: number, matchId: number, player1Score: number, player2Score: number) => Promise<{ data: any; error: any }>;
  };
}

export interface OneVOneService {
  start: (player2Username: string) => Promise<{ data: any; error: any }>;
  finish: (matchId: number, result: any) => Promise<{ data: any; error: any }>;
  submitResult: (matchId: number, player1Score: number, player2Score: number) => Promise<{ data: any; error: any }>;
}

export const apiService: ApiService;
export const onevone: OneVOneService;