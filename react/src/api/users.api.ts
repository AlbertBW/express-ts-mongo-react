import {
  APIReturnType,
  APISession,
  NewUser,
  Session,
  User,
} from "../types/types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createUser = async (
  user: NewUser
): Promise<APIReturnType<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(response.status, errorText);
      throw new Error(
        `${response.status} Network response was not ok. ${errorText}`
      );
    }

    const data: User = await response.json();

    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const getUser = async (
  accessToken: string
): Promise<APIReturnType<User>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(response.status, errorText);
      throw new Error(
        `${response.status} Network response was not ok. ${errorText}`
      );
    }

    const data: User = await response.json();

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const createUserSession = async (
  email: string,
  password: string
): Promise<APIReturnType<APISession>> => {
  console.log(API_BASE_URL);
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(response.status, errorText);
      throw new Error(
        `${response.status} Network response was not ok. ${errorText}`
      );
    }

    const data: APISession = await response.json();

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const getUserSessions = async (
  accessToken: string
): Promise<APIReturnType<Session[]>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(response.status, errorText);
      throw new Error(
        `${response.status} Network response was not ok. ${errorText}`
      );
    }

    const data: Session[] = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};

export const deleteUserSession = async (accessToken: string) => {
  await fetch(`${API_BASE_URL}/api/sessions`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });
};

export const getRefreshAccessToken = async (): Promise<
  APIReturnType<{ accessToken: string }>
> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/sessions/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(response.status, errorText);
      throw new Error(
        `${response.status} Network response was not ok. ${errorText}`
      );
    }

    const data: { accessToken: string } = await response.json();

    return { data: data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
};
