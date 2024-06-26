const asyncHandler = require("express-async-handler");

const Note = require("../models/noteModel");
const Ticket = require("../models/ticketModels");

// / Get  notes for a ticket
// get request /api/tickets/:ticketId/notes
// @route private
const getNotes = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  res.status(200).json(notes);
});

// / create  notes for a ticket
// post request /api/tickets/:ticketId/notes
// @route private
const addNote = asyncHandler(async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }

  const note = await Note.create({
    ticket: req.params.ticketId,
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });

  res.status(200).json(note);
});

module.exports = {
  addNote,
  getNotes,
};
