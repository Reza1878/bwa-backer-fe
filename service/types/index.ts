export type MetaResponse = {
  message: any;
  code: any;
  status: any;
};

export type ApiResponse = {
  meta: MetaResponse;
  data: any;
};

export type ProjectType = {
  id: number;
  short_description: string;
  description: string;
  goal_amount: number;
  current_amount: number;
  name: string;
  image_url: string;
  backer_count: number;
  slug: string;
  perks: string[];
  user: {
    name: string;
    image_url: string;
  };
  images: {
    image_url: string;
    is_primary: boolean;
  }[];
};

export type UserType = {
  id: number;
  name: string;
  occupation: string;
  email: string;
  token: string;
  image_url: string;
};
