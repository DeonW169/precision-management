const {
  BadRequest,
  Created,
  InternalServerError,
  Ok,
} = require("../../common/util/response");

const cardService = require("../../services/task/cardService");

const createCard = async (req, res) => {
  const { title, listId, boardId } = req.body;
  const user = req.user;

  if (!(title && listId && boardId))
    return BadRequest(res, {
      message: "Not all information has been provided",
    });

  await cardService.create(title, listId, boardId, user, (error, result) => {
    if (error)
      return InternalServerError(res, {
        message: "Unable to create card",
        error,
      });
    return Created(res, result);
  });
};

const deleteCardById = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId } = req.params;

  await cardService.deleteById(
    cardId,
    listId,
    boardId,
    user,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to delete card",
          error,
        });
      return Ok(res, result);
    }
  );
};

const getCard = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId } = req.params;

  await cardService.getCard(cardId, listId, boardId, user, (error, result) => {
    if (error)
      return InternalServerError(res, {
        message: "Unable to get card",
        error,
      });
    return Ok(res, result);
  });
};

const updateCard = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId } = req.params;

  await cardService.update(
    cardId,
    listId,
    boardId,
    user,
    req.body,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to update card",
          error,
        });
      return Ok(res, result);
    }
  );
};

const addCardComment = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId } = req.params;

  await cardService.addComment(
    cardId,
    listId,
    boardId,
    user,
    req.body,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to add card comment",
          error,
        });
      return Ok(res, result);
    }
  );
};

const updateCardComment = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId, commentId } = req.params;

  await cardService.updateComment(
    cardId,
    listId,
    boardId,
    commentId,
    user,
    req.body,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to update card comment",
          error,
        });
      return Ok(res, result);
    }
  );
};

const deleteCardComment = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId, commentId } = req.params;

  await cardService.deleteComment(
    cardId,
    listId,
    boardId,
    commentId,
    user,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to delete card comment",
          error,
        });
      return Ok(res, result);
    }
  );
};

const addCardMember = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId } = req.params;

  await cardService.addMember(
    cardId,
    listId,
    boardId,
    user,
    req.body.memberId,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to add card member",
          error,
        });
      return Ok(res, result);
    }
  );
};

const deleteCardMember = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId, memberId } = req.params;

  await cardService.deleteMember(
    cardId,
    listId,
    boardId,
    user,
    memberId,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to delete card member",
          error,
        });
      return Ok(res, result);
    }
  );
};

const createCardLabel = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId } = req.params;
  const label = req.body;

  await cardService.createLabel(
    cardId,
    listId,
    boardId,
    user,
    label,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to create card label",
          error,
        });
      return Ok(res, result);
    }
  );
};

const updateCardLabel = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId, labelId } = req.params;
  const label = req.body;

  await cardService.updateLabel(
    cardId,
    listId,
    boardId,
    labelId,
    user,
    label,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to update card label",
          error,
        });
      return Ok(res, result);
    }
  );
};

const deleteCardLabel = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId, labelId } = req.params;

  await cardService.deleteLabel(
    cardId,
    listId,
    boardId,
    labelId,
    user,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to delete card label",
          error,
        });
      return Ok(res, result);
    }
  );
};

const updateCardLabelSelection = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId, labelId } = req.params;
  const { selected } = req.body;

  await cardService.updateLabelSelection(
    cardId,
    listId,
    boardId,
    labelId,
    user,
    selected,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to update card label selection",
          error,
        });
      return Ok(res, result);
    }
  );
};

const createCardChecklist = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId } = req.params;
  const title = req.body.title;

  await cardService.createChecklist(
    cardId,
    listId,
    boardId,
    user,
    title,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to create card checklist",
          error,
        });
      return Ok(res, result);
    }
  );
};

const deleteCardChecklist = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId, checklistId } = req.params;

  await cardService.deleteChecklist(
    cardId,
    listId,
    boardId,
    checklistId,
    user,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to delete card checklist",
          error,
        });
      return Ok(res, result);
    }
  );
};

const addCardChecklistItem = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId, checklistId } = req.params;
  const text = req.body.text;

  await cardService.addChecklistItem(
    cardId,
    listId,
    boardId,
    user,
    checklistId,
    text,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to add card checklist",
          error,
        });
      return Ok(res, result);
    }
  );
};

const setCardChecklistItemCompleted = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId, checklistId, checklistItemId } = req.params;
  const completed = req.body.completed;

  await cardService.setChecklistItemCompleted(
    cardId,
    listId,
    boardId,
    user,
    checklistId,
    checklistItemId,
    completed,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to set card checklist item",
          error,
        });
      return Ok(res, result);
    }
  );
};

const setCardChecklistItemText = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId, checklistId, checklistItemId } = req.params;
  const text = req.body.text;

  await cardService.setChecklistItemText(
    cardId,
    listId,
    boardId,
    user,
    checklistId,
    checklistItemId,
    text,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to set card checklist item title",
          error,
        });
      return Ok(res, result);
    }
  );
};

const deleteCardChecklistItem = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId, checklistId, checklistItemId } = req.params;

  await cardService.deleteChecklistItem(
    cardId,
    listId,
    boardId,
    user,
    checklistId,
    checklistItemId,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to delete card checklist item",
          error,
        });
      return Ok(res, result);
    }
  );
};

const updateCardStartDueDates = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId } = req.params;
  const { startDate, dueDate, dueTime } = req.body;

  await cardService.updateStartDueDates(
    cardId,
    listId,
    boardId,
    user,
    startDate,
    dueDate,
    dueTime,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to update card dates",
          error,
        });
      return Ok(res, result);
    }
  );
};

const updateCardDateCompleted = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId } = req.params;
  const { completed } = req.body;

  await cardService.updateDateCompleted(
    cardId,
    listId,
    boardId,
    user,
    completed,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to update card date completed",
          error,
        });
      return Ok(res, result);
    }
  );
};

const addCardAttachment = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId } = req.params;
  const { link, name } = req.body;

  await cardService.addAttachment(
    cardId,
    listId,
    boardId,
    user,
    link,
    name,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to add card attachment",
          error,
        });
      return Ok(res, result);
    }
  );
};

const deleteCardAttachment = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId, attachmentId } = req.params;

  await cardService.deleteAttachment(
    cardId,
    listId,
    boardId,
    user,
    attachmentId,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to delete card attachment",
          error,
        });
      return Ok(res, result);
    }
  );
};

const updateCardAttachment = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId, attachmentId } = req.params;
  const { link, name } = req.body;

  await cardService.updateAttachment(
    cardId,
    listId,
    boardId,
    user,
    attachmentId,
    link,
    name,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to update card attachment",
          error,
        });
      return Ok(res, result);
    }
  );
};

const updateCardCover = async (req, res) => {
  const user = req.user;
  const { boardId, listId, cardId } = req.params;
  const { color, isSizeOne } = req.body;

  await cardService.updateCover(
    cardId,
    listId,
    boardId,
    user,
    color,
    isSizeOne,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to update card cover",
          error,
        });
      return Ok(res, result);
    }
  );
};

module.exports = {
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
};
