export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    id: number;
    name: string;
  };
}

export type NewComment = {
  comment: string;
  rating: number;
};
