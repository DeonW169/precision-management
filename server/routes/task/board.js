const express = require("express");
const {
  createBoard,
  getAllBoards,
  getBoardById,
  getBoardActivityById,
  updateBoardTitle,
  updateBoardDescription,
  updateBoardBackground,
  addBoardMember,
} = require("../../controllers/task/boardController");
const { protect } = require("../../common/middleware/authMiddleware");

const router = express.Router();

router.post("/:boardId/add-member", protect, addBoardMember);
router.put("/:boardId/update-background", protect, updateBoardBackground);
router.put(
  "/:boardId/update-board-description",
  protect,
  updateBoardDescription
);
router.put("/:boardId/update-board-title", protect, updateBoardTitle);
router.post("/create", protect, createBoard);
router.get("/:boardId", protect, getBoardById);
router.get("/:boardId/activity", protect, getBoardActivityById);
router.get("/", protect, getAllBoards);

module.exports = router;
