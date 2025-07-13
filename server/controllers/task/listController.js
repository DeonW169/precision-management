const {
  BadRequest,
  Created,
  InternalServerError,
  Ok,
  Forbidden,
} = require("../../common/util/response");

const listService = require("../../services/task/listService");

const createBoardList = async (req, res) => {
  const { title, boardId } = req.body;
  if (!(title && boardId))
    return BadRequest(res, { message: "Title cannot be empty" });

  const validate = req.user.boards.filter((board) => board === boardId);
  if (!validate)
    return BadRequest(res, {
      message:
        "You can not add a list to the board, you are not a member or owner!",
    });

  await listService.create(
    { title: title, owner: boardId },
    req.user,
    (error, result) => {
      if (error)
        return BadRequest(res, {
          message: "Unable to create list",
          error,
        });
      return Created(res, result);
    }
  );
};

const getBoardLists = async (req, res) => {
  const boardId = req.params.boardId;

  const validate = req.user.boards.filter((board) => board === boardId);
  if (!validate)
    return BadRequest(res, {
      message:
        "You cannot get lists of the board, you are not a member or owner!",
    });

  await listService.getAll(boardId, (error, result) => {
    if (error)
      return InternalServerError(res, {
        message: "Unable to get lists",
        error,
      });
    return Ok(res, result);
  });
};

const deleteBoardListById = async (req, res) => {
  const { listId, boardId } = req.params;
  const user = req.user;

  if (!(listId && boardId))
    return BadRequest(res, {
      message: "List or Board undefined",
    });

  await listService.deleteById(listId, boardId, user, (error, result) => {
    if (error)
      return InternalServerError(res, {
        message: "Unable to delete this boards list",
        error,
      });
    return Ok(res, result);
  });
};

const updateCardOrder = async (req, res) => {
  const { boardId, sourceId, destinationId, destinationIndex, cardId } =
    req.body;
  const user = req.user;

  if (!(boardId && sourceId && destinationId && cardId))
    return BadRequest(res, {
      message: "Parameters not provided",
    });

  // Validate the owner of board
  const validate = user.boards.filter((board) => board === boardId);
  if (!validate)
    return Forbidden(res, {
      message: "You do not have access to this board",
    });

  await listService.updateCardOrder(
    boardId,
    sourceId,
    destinationId,
    destinationIndex,
    cardId,
    user,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to update card order",
          error,
        });
      return Ok(res, result);
    }
  );
};

const updateBoardListOrder = async (req, res) => {
  const { boardId, sourceIndex, destinationIndex, listId } = req.body;
  const user = req.user;

  if (
    !(
      boardId &&
      sourceIndex != undefined &&
      destinationIndex != undefined &&
      listId
    )
  )
    return BadRequest(res, {
      message: "Parameters not provided",
    });

  // Validate the owner of board
  const validate = user.boards.filter((board) => board === boardId);
  if (!validate)
    return Forbidden(res, {
      message: "You do not have access to this board",
    });

  await listService.updateListOrder(
    boardId,
    sourceIndex,
    destinationIndex,
    listId,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to update list order",
          error,
        });
      return Ok(res, result);
    }
  );
};

const updateBoardListTitle = async (req, res) => {
  const { listId, boardId } = req.params;
  const user = req.user;
  const { title } = req.body;

  // Validate the listId and boardId
  if (!(listId && boardId))
    return BadRequest(res, {
      message: "List or Board undefined",
    });

  await listService.updateListTitle(
    listId,
    boardId,
    user,
    title,
    (error, result) => {
      if (error)
        return InternalServerError(res, {
          message: "Unable to update list title",
          error,
        });
      return Ok(res, result);
    }
  );
};

module.exports = {
  createBoardList,
  getBoardLists,
  deleteBoardListById,
  updateCardOrder,
  updateBoardListOrder,
  updateBoardListTitle,
};
