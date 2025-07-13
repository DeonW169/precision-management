const express = require("express");
const {
  createBoardList,
  getBoardLists,
  deleteBoardListById,
  updateCardOrder,
  updateBoardListOrder,
  updateBoardListTitle,
} = require("../../controllers/task/listController");

const { protect } = require("../../common/middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createBoardList);
router.get("/:boardId", protect, getBoardLists);
router.delete("/:boardId/:listId", protect, deleteBoardListById);
router.put("/:boardId/:listId/update-title", protect, updateBoardListTitle);
router.post("/change-card-order", protect, updateCardOrder);
router.post("/change-list-order", protect, updateBoardListOrder);

module.exports = router;
