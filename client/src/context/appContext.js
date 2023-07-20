import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_TICKET_BEGIN,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_ERROR,
  GET_TICKET_BEGIN,
  GET_TICKET_SUCCESS,
  SET_EDIT_TICKET,
  DELETE_TICKET_BEGIN,
  EDIT_TICKET_BEGIN,
  EDIT_TICKET_SUCCESS,
  EDIT_TICKET_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
  GET_COMMENTS_BEGIN,
  GET_COMMENTS_SUCCESS,
  GET_USER_BEGIN,
  GET_USER_SUCCESS,
} from "./actions";

// const token = localStorage.getItem("token");
// const user = localStorage.getItem("user");
// const userLocation = localStorage.getItem("location");

const initialState = {
  userLoading: true,
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  // token: token,
  userLocation: "",
  showSidebar: false,
  isEditing: false,
  editTicketId: "",
  categoryOptions: [
    "IT issues",
    "new employee",
    "document request",
    "equipment request",
    "HR & Payroll",
  ],
  category: "IT issues",
  title: "",
  text: "",
  urgencyOptions: ["low", "high", "critical"],
  urgency: "low",
  statusOptions: ["pending", "assigned", "solved"],
  status: "pending",
  tickets: [],
  totalTickets: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyTickets: [],
  search: "",
  searchStatus: "all",
  searchCategory: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest"],
  ticketId: 1,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: "api/v1",
  });

  //request
  // authFetch.interceptors.request.use(
  //   (config) => {
  //     config.headers["Authorization"] = `Bearer ${state.token}`;
  //     return config;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  //response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // const addUserToLocalStorage = ({ user, token, location }) => {
  //   localStorage.setItem("user", JSON.stringify(user));
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("location", location);
  // };

  // const removeUserFromLocalStorage = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   localStorage.removeItem("location");
  // };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      const { user, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, location },
      });
      // addUserToLocalStorage({ user, token, location });
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, location },
      });
      // addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = async () => {
    await authFetch.get("/auth/logout");
    dispatch({ type: LOGOUT_USER });
    // removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("auth/updateUser", currentUser);

      const { user, location } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location },
      });
      // addUserToLocalStorage({ user, location, token });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createTicket = async () => {
    dispatch({ type: CREATE_TICKET_BEGIN });
    try {
      const { category, title, text, urgency } = state;
      await authFetch.post("/tickets", {
        category,
        title,
        text,
        urgency,
      });
      dispatch({ type: CREATE_TICKET_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_TICKET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getTickets = async () => {
    const { page, search, searchStatus, searchCategory, sort } = state;
    let url = `/tickets?page=${page}&status=${searchStatus}&category=${searchCategory}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_TICKET_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { tickets, totalTickets, numOfPages } = data;
      dispatch({
        type: GET_TICKET_SUCCESS,
        payload: { tickets, totalTickets, numOfPages },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const getCommentsUrl = async () => {
    const { ticketId } = state;
    let url = `/tickets/${ticketId}/comments`;

    dispatch({ type: GET_COMMENTS_BEGIN });
    try {
      const { data } = await authFetch.get(url);
      const { ticketId } = data;
      dispatch({
        type: GET_COMMENTS_SUCCESS,
        payload: { ticketId },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const setEditTicket = (id) => {
    dispatch({ type: SET_EDIT_TICKET, payload: { id } });
  };

  const editTicket = async () => {
    dispatch({ type: EDIT_TICKET_BEGIN });
    try {
      const { category, title, urgency, text, status } = state;
      await authFetch.patch(`/tickets/${state.editTicketId}`, {
        category,
        title,
        urgency,
        text,
        status,
      });
      dispatch({ type: EDIT_TICKET_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_TICKET_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const deleteTicket = async (ticketId) => {
    dispatch({ type: DELETE_TICKET_BEGIN });
    try {
      await authFetch.delete(`/tickets/${ticketId}`);
      getTickets();
    } catch (error) {
      console.log(error.response);
      alert(
        "You are not allowed to delete this ticket, as it was not created by you"
      );
    }
  };

  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch.get("/tickets/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyTickets: data.monthlyTickets,
        },
      });
    } catch (error) {
      logoutUser();
    }
    clearAlert();
  };

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  const changePage = (page) => {
    dispatch({ type: CHANGE_PAGE, payload: { page } });
  };

  const getCurrentUser = async () => {
    dispatch({ type: GET_USER_BEGIN });
    try {
      const { data } = await authFetch("/auth/getCurrentUser");
      const { user, location } = data;
      dispatch({ type: GET_USER_SUCCESS, payload: { user, location } });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
        handleChange,
        clearValues,
        createTicket,
        getTickets,
        setEditTicket,
        deleteTicket,
        editTicket,
        showStats,
        clearFilters,
        changePage,
        getCommentsUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
