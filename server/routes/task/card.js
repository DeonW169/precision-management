const express = require("express");
const {
  createCard,
  deleteCardById,
  getCard,
  updateCard,
  addCardComment,
  updateCardComment,
  deleteCardComment,
  addCardMember,
  deleteCardMember,
  createCardLabel,
  updateCardLabel,
  deleteCardLabel,
  updateCardLabelSelection,
  createCardChecklist,
  deleteCardChecklist,
  addCardChecklistItem,
  setCardChecklistItemCompleted,
  setCardChecklistItemText,
  deleteCardChecklistItem,
  updateCardStartDueDates,
  updateCardDateCompleted,
  addCardAttachment,
  deleteCardAttachment,
  updateCardAttachment,
  updateCardCover,
} = require("../../controllers/task/cardController");
const { protect } = require("../../common/middleware/authMiddleware");

const router = express.Router();

router.post("/create", protect, createCard);
router.delete("/:boardId/:listId/:cardId/delete-card", protect, deleteCardById);
router.put("/:boardId/:listId/:cardId/update-cover", protect, updateCardCover);
router.put(
  "/:boardId/:listId/:cardId/:attachmentId/update-attachment",
  protect,
  updateCardAttachment
);
router.delete(
  "/:boardId/:listId/:cardId/:attachmentId/delete-attachment",
  protect,
  deleteCardAttachment
);
router.post(
  "/:boardId/:listId/:cardId/add-attachment",
  protect,
  addCardAttachment
);
router.put(
  "/:boardId/:listId/:cardId/update-dates",
  protect,
  updateCardStartDueDates
);
router.put(
  "/:boardId/:listId/:cardId/update-date-completed",
  protect,
  updateCardDateCompleted
);
router.delete(
  "/:boardId/:listId/:cardId/:checklistId/:checklistItemId/delete-checklist-item",
  protect,
  deleteCardChecklistItem
);
router.put(
  "/:boardId/:listId/:cardId/:checklistId/:checklistItemId/set-checklist-item-text",
  protect,
  setCardChecklistItemText
);
router.put(
  "/:boardId/:listId/:cardId/:checklistId/:checklistItemId/set-checklist-item-completed",
  protect,
  setCardChecklistItemCompleted
);
router.post(
  "/:boardId/:listId/:cardId/:checklistId/add-checklist-item",
  protect,
  addCardChecklistItem
);
router.delete(
  "/:boardId/:listId/:cardId/:checklistId/delete-checklist",
  protect,
  deleteCardChecklist
);
router.post(
  "/:boardId/:listId/:cardId/create-checklist",
  protect,
  createCardChecklist
);
router.put(
  "/:boardId/:listId/:cardId/:labelId/update-label-selection",
  protect,
  updateCardLabelSelection
);
router.delete(
  "/:boardId/:listId/:cardId/:labelId/delete-label",
  protect,
  deleteCardLabel
);
router.put(
  "/:boardId/:listId/:cardId/:labelId/update-label",
  protect,
  updateCardLabel
);
router.post("/:boardId/:listId/:cardId/create-label", protect, createCardLabel);
router.post("/:boardId/:listId/:cardId/add-member", protect, addCardMember);
router.delete(
  "/:boardId/:listId/:cardId/:memberId/delete-member",
  protect,
  deleteCardMember
);

router.get("/:boardId/:listId/:cardId", protect, getCard);
router.put("/:boardId/:listId/:cardId", protect, updateCard);
router.post("/:boardId/:listId/:cardId/add-comment", protect, addCardComment);
router.put("/:boardId/:listId/:cardId/:commentId", protect, updateCardComment);
router.delete(
  "/:boardId/:listId/:cardId/:commentId",
  protect,
  deleteCardComment
);

module.exports = router;
