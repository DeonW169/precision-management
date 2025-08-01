const User = require("../../models/user/user");
const List = require("../../models/task/list");
const Board = require("../../models/task/board");
const Card = require("../../models/task/card");
const { validateCardOwners, labelsSeed } = require("../../common/util/helpers");

const create = async (title, listId, boardId, user, callback) => {
  try {
    // Get list and board
    const list = await List.findOne({ _id: listId });
    const board = await Board.findOne({ _id: boardId });

    // Validate the ownership
    const validate = await validateCardOwners(null, list, board, user, true);
    if (!validate)
      return callback({
        message: "You do not have permission to add card to this list or board",
      });

    // Create new card
    let newCard = await Card({ title: title });
    newCard.owner = listId;
    newCard.activities.unshift({
      text: `${user.name} added this card to ${list.title}`,
      name: user.name,
      color: user.color,
    });
    newCard.labels = labelsSeed;
    await newCard.save();

    // Add id of the new card to owner list
    list.cards.push(newCard._id);
    await list.save();

    // Set data transfer object
    const result = await List.findById(listId);

    return callback(false, result);
  } catch (error) {
    return callback({
      message: "Failed to create new card",
      error,
    });
  }
};

const deleteById = async (cardId, listId, boardId, user, callback) => {
  try {
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this card",
      });

    // Delete the card
    const result = await Card.findByIdAndDelete(cardId);

    // Delete the list from lists of board
    list.cards = list.cards.filter(
      (tempCard) => tempCard.toString() !== cardId
    );
    await list.save();

    // Add activity log to board
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: `${user.name} deleted ${result.title} from ${list.title}`,
      color: user.color,
    });
    await board.save();

    return callback(false, { message: "Card Deleted" });
  } catch (error) {
    return callback({
      message: "Failed to delete the card",
      error,
    });
  }
};

const getCard = async (cardId, listId, boardId, user, callback) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this card",
      });

    let returnObject = {
      ...card._doc,
      listTitle: list.title,
      listId: listId,
      boardId: boardId,
    };

    return callback(false, returnObject);
  } catch (error) {
    return callback({
      message: "Failed to get the card",
      error,
    });
  }
};

const update = async (cardId, listId, boardId, user, updatedObj, callback) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this card",
      });

    // Update card
    await card.updateOne(updatedObj);
    await card.save();

    return callback(false, { message: "Card Updated" });
  } catch (error) {
    return callback({
      message: "Failed to update card",
      error,
    });
  }
};

const addComment = async (cardId, listId, boardId, user, body, callback) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this card",
      });

    // Add comment
    card.activities.unshift({
      text: body.text,
      userName: user.name,
      isComment: true,
      color: user.color,
    });
    await card.save();

    // Add comment to board activity
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: body.text,
      actionType: "comment",
      cardTitle: card.title,
      color: user.color,
    });
    board.save();

    return callback(false, card.activities);
  } catch (error) {
    return callback({
      message: "Failed to update all fields",
      error,
    });
  }
};

const updateComment = async (
  cardId,
  listId,
  boardId,
  commentId,
  user,
  body,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this card",
      });

    // Update card
    card.activities = card.activities.map((activity) => {
      if (activity._id.toString() === commentId.toString()) {
        if (activity.userName !== user.name) {
          return callback({
            message: "You can not edit the comment that you hasn't",
          });
        }
        activity.text = body.text;
      }
      return activity;
    });
    await card.save();

    // Add to board activity
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: body.text,
      actionType: "comment",
      edited: true,
      color: user.color,
      cardTitle: card.title,
    });
    board.save();

    return callback(false, { message: "Comment updated" });
  } catch (error) {
    return callback({
      message: "Failed to update comment and activities",
      error,
    });
  }
};

const deleteComment = async (
  cardId,
  listId,
  boardId,
  commentId,
  user,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this card",
      });

    // Delete card
    card.activities = card.activities.filter(
      (activity) => activity._id.toString() !== commentId.toString()
    );
    await card.save();

    // Add to board activity
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: `${user.name} deleted their own comment from ${card.title}`,
      color: user.color,
    });
    board.save();

    return callback(false, { message: "Comment Deleted" });
  } catch (error) {
    return callback({
      message: "Failed to delete the comment",
      error,
    });
  }
};

const addMember = async (cardId, listId, boardId, user, memberId, callback) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);
    const member = await User.findById(memberId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this card",
      });

    // Add member
    card.members.unshift({
      user: member._id,
      name: member.name,
      color: member.color,
    });
    await card.save();

    // Add to board activity
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: `${user.name} added '${member.name}' to ${card.title}`,
      color: user.color,
    });
    board.save();

    return callback(false, { message: "Member added" });
  } catch (error) {
    return callback({
      message: "Failed to add member",
      error,
    });
  }
};

const deleteMember = async (
  cardId,
  listId,
  boardId,
  user,
  memberId,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this card",
      });

    // Delete member
    card.members = card.members.filter(
      (a) => a.user.toString() !== memberId.toString()
    );
    await card.save();

    // Get member
    const tempMember = await User.findById(memberId);

    // Add to board activity
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action:
        tempMember.name === user.name
          ? `left ${card.title}`
          : `${user.name} removed '${tempMember.name}' from ${card.title}`,
      color: user.color,
    });
    board.save();

    return callback(false, { message: "Member removed" });
  } catch (error) {
    return callback({
      message: "Failed to remove member",
      error,
    });
  }
};

const createLabel = async (cardId, listId, boardId, user, label, callback) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this card",
      });

    // Add label
    card.labels.unshift({
      text: label.text,
      color: label.color,
      backColor: label.backColor,
      selected: true,
    });
    await card.save();

    const labelId = card.labels[0]._id;

    return callback(false, { labelId: labelId });
  } catch (error) {
    return callback({
      message: "Failed to create label",
      error,
    });
  }
};

const updateLabel = async (
  cardId,
  listId,
  boardId,
  labelId,
  user,
  label,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this card",
      });

    // Update label
    card.labels = card.labels.map((item) => {
      if (item._id.toString() === labelId.toString()) {
        item.text = label.text;
        item.color = label.color;
        item.backColor = label.backColor;
      }
      return item;
    });
    await card.save();

    return callback(false, { message: "Label Updated" });
  } catch (error) {
    return callback({
      message: "Failed to update label",
      error,
    });
  }
};

const deleteLabel = async (
  cardId,
  listId,
  boardId,
  labelId,
  user,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this card",
      });

    // Delete label
    card.labels = card.labels.filter(
      (label) => label._id.toString() !== labelId.toString()
    );
    await card.save();

    return callback(false, { message: "Label deleted" });
  } catch (error) {
    return callback({
      message: "Failed to delete the label",
      error,
    });
  }
};

const updateLabelSelection = async (
  cardId,
  listId,
  boardId,
  labelId,
  user,
  selected,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this card",
      });

    // Update label
    card.labels = card.labels.map((item) => {
      if (item._id.toString() === labelId.toString()) {
        item.selected = selected;
      }
      return item;
    });
    await card.save();

    return callback(false, { message: "Label added to card" });
  } catch (error) {
    return callback({
      message: "Failed to assign label to card",
      error,
    });
  }
};

const createChecklist = async (
  cardId,
  listId,
  boardId,
  user,
  title,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this card",
      });

    // Add checklist
    card.checklists.push({
      title: title,
    });
    await card.save();

    const checklistId = card.checklists[card.checklists.length - 1]._id;

    // Add to board activity
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: `${user.name} added '${title}' to ${card.title}`,
      color: user.color,
    });
    board.save();

    return callback(false, { checklistId: checklistId });
  } catch (error) {
    return callback({
      message: "Failed to add checklist",
      error,
    });
  }
};

const deleteChecklist = async (
  cardId,
  listId,
  boardId,
  checklistId,
  user,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to delete this checklist",
      });

    let cl = card.checklists.filter(
      (l) => l._id.toString() === checklistId.toString()
    );

    // Delete checklist
    card.checklists = card.checklists.filter(
      (list) => list._id.toString() !== checklistId.toString()
    );
    await card.save();

    // Add to board activity
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: `${user.name} removed '${cl.title}' from ${card.title}`,
      color: user.color,
    });
    board.save();

    return callback(false, { message: "Checklist deleted" });
  } catch (error) {
    return callback({
      message: "Failed to delete checklist",
      error,
    });
  }
};

const addChecklistItem = async (
  cardId,
  listId,
  boardId,
  user,
  checklistId,
  text,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to add item to this checklist",
      });

    // Add checklistItem
    card.checklists = card.checklists.map((list) => {
      if (list._id.toString() == checklistId.toString()) {
        list.items.push({ text: text });
      }
      return list;
    });
    await card.save();

    // Get to created ChecklistItem's id
    let checklistItemId = "";
    card.checklists = card.checklists.map((list) => {
      if (list._id.toString() == checklistId.toString()) {
        checklistItemId = list.items[list.items.length - 1]._id;
      }
      return list;
    });

    return callback(false, { checklistItemId });
  } catch (error) {
    return callback({
      message: "Failed to create checklist item",
      error,
    });
  }
};

const setChecklistItemCompleted = async (
  cardId,
  listId,
  boardId,
  user,
  checklistId,
  checklistItemId,
  completed,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to update item to this checklist",
      });

    let clItem = "";
    // Update completed (status) of checklistItem
    card.checklists = card.checklists.map((list) => {
      if (list._id.toString() == checklistId.toString()) {
        list.items = list.items.map((item) => {
          if (item._id.toString() === checklistItemId) {
            item.completed = completed;
            clItem = item.text;
          }
          return item;
        });
      }
      return list;
    });
    await card.save();

    // Add to board activity
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: completed
        ? `completed '${clItem}' on ${card.title}`
        : `marked as uncompleted to '${clItem}' on ${card.title}`,
      color: user.color,
    });
    board.save();

    return callback(false, { message: "Mark as completed" });
  } catch (error) {
    return callback({
      message: "Failed to change completed status",
      error,
    });
  }
};

const setChecklistItemText = async (
  cardId,
  listId,
  boardId,
  user,
  checklistId,
  checklistItemId,
  text,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to update item to this checklist",
      });

    // Update text of checklistItem
    card.checklists = card.checklists.map((list) => {
      if (list._id.toString() == checklistId.toString()) {
        list.items = list.items.map((item) => {
          if (item._id.toString() === checklistItemId) {
            item.text = text;
          }
          return item;
        });
      }
      return list;
    });

    await card.save();
    return callback(false, { message: "Item text updated" });
  } catch (error) {
    return callback({
      message: "Failed to update text",
      error,
    });
  }
};

const deleteChecklistItem = async (
  cardId,
  listId,
  boardId,
  user,
  checklistId,
  checklistItemId,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message:
          "You do not have permission to delete item from this checklist",
      });

    // Delete checklistItem
    card.checklists = card.checklists.map((list) => {
      if (list._id.toString() == checklistId.toString()) {
        list.items = list.items.filter(
          (item) => item._id.toString() !== checklistItemId
        );
      }
      return list;
    });

    await card.save();
    return callback(false, { message: "Checklist item deleted" });
  } catch (error) {
    return callback({
      message: "Failed to delete the checklist item",
      error,
    });
  }
};

const updateStartDueDates = async (
  cardId,
  listId,
  boardId,
  user,
  startDate,
  dueDate,
  dueTime,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message: "You do not have permission to update card in this checklist",
      });

    // Update dates
    card.date.startDate = startDate;
    card.date.dueDate = dueDate;
    card.date.dueTime = dueTime;
    if (dueDate === null) card.date.completed = false;
    await card.save();
    return callback(false, { message: "Card updated" });
  } catch (error) {
    return callback({
      message: "Failed to update card",
      error,
    });
  }
};

const updateDateCompleted = async (
  cardId,
  listId,
  boardId,
  user,
  completed,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate)
      return callback({
        message:
          "You do not have permission to update card date in this checklist",
      });

    // Update date completed event
    card.date.completed = completed;

    await card.save();

    // Add to board activity
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: `marked the due date on ${card.title} ${
        completed ? "complete" : "not complete"
      }`,
      color: user.color,
    });
    board.save();

    return callback(false, { message: "Completed status updated" });
  } catch (error) {
    return callback({
      message: "Failed to update status",
      error,
    });
  }
};

const addAttachment = async (
  cardId,
  listId,
  boardId,
  user,
  link,
  name,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate) {
      message: "You dont have permission to update date of this card";
    }

    //Add attachment
    const validLink = new RegExp(/^https?:\/\//).test(link)
      ? link
      : "http://" + link;

    card.attachments.push({ link: validLink, name: name });
    await card.save();

    //Add to board activity
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: `attached ${validLink} to ${card.title}`,
      color: user.color,
    });
    board.save();

    return callback(false, {
      attachmentId:
        card.attachments[card.attachments.length - 1]._id.toString(),
    });
  } catch (error) {
    return callback({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

const deleteAttachment = async (
  cardId,
  listId,
  boardId,
  user,
  attachmentId,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate) {
      message: "You dont have permission to delete this attachment";
    }

    let attachmentObj = card.attachments.filter(
      (attachment) => attachment._id.toString() === attachmentId.toString()
    );

    //Delete checklistItem
    card.attachments = card.attachments.filter(
      (attachment) => attachment._id.toString() !== attachmentId.toString()
    );
    await card.save();

    //Add to board activity
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: `deleted the ${attachmentObj[0].link} attachment from ${card.title}`,
      color: user.color,
    });
    board.save();

    return callback(false, { message: "Success!" });
  } catch (error) {
    return callback({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

const updateAttachment = async (
  cardId,
  listId,
  boardId,
  user,
  attachmentId,
  link,
  name,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate) {
      message: "You dont have permission to update attachment of this card";
    }

    //Update date completed event
    card.attachments = card.attachments.map((attachment) => {
      if (attachment._id.toString() === attachmentId.toString()) {
        attachment.link = link;
        attachment.name = name;
      }
      return attachment;
    });

    await card.save();
    return callback(false, { message: "Success!" });
  } catch (error) {
    return callback({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

const updateCover = async (
  cardId,
  listId,
  boardId,
  user,
  color,
  isSizeOne,
  callback
) => {
  try {
    // Get models
    const card = await Card.findById(cardId);
    const list = await List.findById(listId);
    const board = await Board.findById(boardId);

    // Validate owner
    const validate = await validateCardOwners(card, list, board, user, false);
    if (!validate) {
      message: "You dont have permission to update attachment of this card";
    }

    //Update date cover color
    card.cover.color = color;
    card.cover.isSizeOne = isSizeOne;

    await card.save();
    return callback(false, { message: "Success!" });
  } catch (error) {
    return callback({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

module.exports = {
  create,
  update,
  getCard,
  addComment,
  deleteById,
  updateComment,
  deleteComment,
  addMember,
  deleteMember,
  createLabel,
  updateLabel,
  deleteLabel,
  updateLabelSelection,
  createChecklist,
  deleteChecklist,
  addChecklistItem,
  setChecklistItemCompleted,
  setChecklistItemText,
  deleteChecklistItem,
  updateStartDueDates,
  updateDateCompleted,
  addAttachment,
  deleteAttachment,
  updateAttachment,
  updateCover,
};
