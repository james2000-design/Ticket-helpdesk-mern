import axios from "axios";

const API_URL = "/api/tickets/";

// create new ticket

const createTicket = async (tickeData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, tickeData, config);

  return response.data;
};

// get User tickets

const getTickets = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// get User ticket

const getTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + ticketId, config);

  return response.data;
};
// close User ticket

const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(
    API_URL + ticketId,
    { status: "closed" },
    config
  );

  return response.data;
};

const ticketService = {
  getTickets,
  getTicket,
  createTicket,
  closeTicket,
};

export default ticketService;
