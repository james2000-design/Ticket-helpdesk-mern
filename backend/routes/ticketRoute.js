const express = require("express");

const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const ticketController = require("../controllers/ticketController");

const {
  getTickets,
  createTickets,
  getTicket,
  deleteTicket,
  updateTicket,
} = require("../controllers/ticketController");

// / Re-route into note router
const noteRouter = require("./noteRoute");
router.use("/:ticketId/notes", noteRouter);

router.route("/").get(protect, getTickets).post(protect, createTickets);
router
  .route("/:id")
  .get(
    (req, res, next) => {
      console.log("Route param ID in route definition:", req.params.id);
      next();
    },
    protect,
    getTicket
  )
  .delete(protect, deleteTicket)
  .put(protect, updateTicket);

module.exports = router;
