import axios from "axios";

const API_URL = "/api/tickets/";

// create new ticket

const createTicket = async (ticketData, token) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axios.post(API_URL, ticketData, config);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(
      "Error creating ticket",
      error.response ? error.response.data : error.message
    );
  }
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
  console.log("this is the response", response.data);
  return response.data;
};
// close User ticket

const closeTicket = async (ticketId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
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
