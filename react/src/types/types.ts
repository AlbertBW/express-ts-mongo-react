export type APIReturnType<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: Error;
    };

export type APIResponseType =
  | {
      success: true;
      error: null;
    }
  | {
      success: false;
      error: Error;
    };

export type NewUser = {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
};

export type User = {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type APISession = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type Session = {
  _id: string;
  user: string;
  userAgent: string;
  valid: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export type AuthContextType = {
  user: User | null;
  register: (user: NewUser) => Promise<{ error: string | null }>;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => void;
  accessToken: string | null;
  isLoading: boolean;
};

export type Product = {
  _id: string;
  user: string;
  title: string;
  description: string;
  price: number;
  image: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CreateProductType = {
  title: string;
  description: string;
  price: number;
  image: string;
};
