export type MetaResponse = {
  message: string;
  code: number;
  status: string;
};

export type Response = {
  meta: MetaResponse;
  data: any;
};
