const asyncHandler = require("express-async-handler");

const User = require("../models/userModels");
const Ticket = require("../models/ticketModels");

// / Get  current user tickets
// get request
// @route private
const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find({ user: req.user.id });
  if (!tickets) {
    res.status(401);
    throw new Error("User not found");
  }
  // get user using the id and jwt

  res.status(200).json(tickets);
  const user = await user.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
});

// / Get  current user ticket
// get request
// @route private
const getTicket = asyncHandler(async (req, res) => {
  const ticket = await user.findById(req.user.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(ticket);

  // get user using the id and jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
});

// / delete current user ticket
// get request
// @route private
const deleteTicket = asyncHandler(async (req, res) => {
  // get user using the id and jwt
  const user = await user.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await ticket.remove();

  res.status(200).json({ sucess: true });
});

// / Update current user ticket
// get request
// @route private
const updateTicket = asyncHandler(async (req, res) => {
  // get user using the id and jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(404);
    throw new Error("Ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedTicket);
});

// / create  current user ticket
// post request
// @route private
const createTickets = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(401);
    throw new Error("please add a product and description");
  }
  // Get user using the id and jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });

  //
  res.status(201).json(ticket);
});

module.exports = {
  createTickets,
  getTickets,
  getTicket,
  deleteTicket,
  updateTicket,
};
