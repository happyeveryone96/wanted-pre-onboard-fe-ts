export interface TodoCreateParams {
  todo: string;
}

export interface TodoEditParams extends TodoCreateParams {
  isCompleted: boolean;
}
