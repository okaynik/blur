export interface Like {
  post_id: number;
  username: string;
  vote: Vote;
}

export type Vote = "up" | "down";
