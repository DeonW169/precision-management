const {
  BadRequest,
  Created,
  InternalServerError,
  Ok,
} = require("../../common/util/response");

const boardService = require("../../services/task/boardService");

const createBoard = async (req, res) => {
  const { title, backgroundImageLink } = req.body;
  if (!(title && backgroundImageLink))
    return BadRequest(res, { message: "Title cannot be null" });

  await boardService.create(req, (error, result) => {
    if (error)
      return InternalServerError(res, {
        message: "Unable to create board",
        error,
      });
    result.__v = undefined;
    return Created(res, result);
  });
};

const getAllBoards = async (req, res) => {
  const userId = req.user.id;
  await boardService.getAll(userId, (error, result) => {
    if (error)
      return BadRequest(res, { message: "Unable to get all boards", error });

    return Ok(res, result);
  });
};

const getBoardById = async (req, res) => {
  const validate = req.user.boards.filter(
    (board) => board === req.params.boardId
  );
  if (!validate)
    return BadRequest(res, {
      message: "You can not show the this board, you are not a member or owner",
    });

  await boardService.getById(req.params.boardId, (error, result) => {
    if (error)
      return BadRequest(res, {
        message: "Unable to get the requested Board",
        error,
      });
    return Ok(res, result);
  });
};

const getBoardActivityById = async (req, res) => {
  const validate = req.user.boards.filter(
    (board) => board === req.params.boardId
  );
  if (!validate)
    return BadRequest(res, {
      message: "You can not show the this board, you are not a member or owner",
    });

  await boardService.getActivityById(req.params.boardId, (error, result) => {
    if (error)
      return BadRequest(res, {
        message: "Unable to retrieve Boards activity",
        error,
      });
    return Ok(res, result);
  });
};

const updateBoardTitle = async (req, res) => {
  const validate = req.user.boards.filter((board) => board === req.params.boardId);
  if (!validate)
    return BadRequest(res, {
      message: "You can not show the this board, you are not a member or owner",
    });

  const { boardId } = req.params;
  const { title } = req.body;

  await boardService.updateBoardTitle(
    boardId,
    title,
    req.user,
    (error, result) => {
      if (error)
        return BadRequest(res, {
          message: "Unable to update Boards title",
          error,
        });
      return Ok(res, result);
    }
  );
};

const updateBoardDescription = async (req, res) => {
  const validate = req.user.boards.filter((board) => board === req.params.boardId);
  if (!validate)
    return BadRequest(res, {
      message: "You can not show the this board, you are not a member or owner",
    });

  const { boardId } = req.params;
  const { description } = req.body;

  await boardService.updateBoardDescription(
    boardId,
    description,
    req.user,
    (error, result) => {
      if (error)
        return BadRequest(res, {
          message: "Unable to update Boards Description",
          error,
        });
      return Ok(res, result);
    }
  );
};

const updateBoardBackground = async (req, res) => {
  const validate = req.user.boards.filter((board) => board === req.params.boardId);
  if (!validate)
    return BadRequest(res, {
      message: "You can not show the this board, you are not a member or owner",
    });

  const { boardId } = req.params;
  const { background, isImage } = req.body;

  await boardService.updateBackground(
    boardId,
    background,
    isImage,
    req.user,
    (error, result) => {
      if (error)
        return BadRequest(res, {
          message: "Unable to update Boards Background",
          error,
        });
      return Ok(res, result);
    }
  );
};

const addBoardMember = async (req, res) => {
  const validate = req.user.boards.filter((board) => board === req.params.boardId);
  if (!validate)
    return BadRequest(res, {
      message: "You can not show the this board, you are not a member or owner",
    });

  const { boardId } = req.params;
  const { members } = req.body;

  await boardService.addMember(boardId, members, req.user, (error, result) => {
    if (error)
      return BadRequest(res, {
        message: "Unable to add Member to board",
        error,
      });
    return Ok(res, result);
  });
};

module.exports = {
  createBoard,
  getAllBoards,
  getBoardById,
  getBoardActivityById,
  updateBoardTitle,
  updateBoardDescription,
  updateBoardBackground,
  addBoardMember,
};
