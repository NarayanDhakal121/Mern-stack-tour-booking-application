import React, { createContext, useEffect, useReducer } from "react";

const initial_state = {
  user:
    localStorage.getItem("user") &&
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(initial_state);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loading: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        loading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        user: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");

  // Define initialUser and set it to null by default
  let initialUser = null;

  try {
    initialUser = storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Invalid JSON data in local storage:", error);
    localStorage.removeItem("user");
  }

  const [state, dispatch] = useReducer(AuthReducer, {
    ...initial_state,
    user: initialUser,
  });

  useEffect(() => {
    if (initialUser) {
      localStorage.setItem("user", JSON.stringify(initialUser));
    } else {
      localStorage.removeItem("user");
    }
  }, [initialUser]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
