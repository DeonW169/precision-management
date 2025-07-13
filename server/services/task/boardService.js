const Board = require("../../models/task/board");
const User = require("../../models/user/user");

const create = async (req, callback) => {
  try {
    const { title, backgroundImageLink } = req.body;

    let newBoard = Board({ title, backgroundImageLink });
    newBoard.save();

    // Add this board to owner's boards
    const user = await User.findById(req.user.id);
    user.boards.unshift(newBoard.id);
    await user.save();

    // Add user to members of this board
    let allMembers = [];
    allMembers.push({
      user: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      color: user.color,
      role: "owner",
    });

    // Add created activity to activities of this board
    newBoard.activity.unshift({
      user: user._id,
      name: user.name,
      action: `${user.name} created this board`,
      color: user.color,
    });

    // Save new board with member
    newBoard.members = allMembers;
    await newBoard.save();

    return callback(false, newBoard);
  } catch (error) {
    return callback({
      message: "Something went wrong",
      error,
    });
  }
};

const getAll = async (userId, callback) => {
  try {
    // Get user
    const user = await User.findById(userId);

    // Get board ids of user
    const boardIds = user.boards;

    // Get boards of user
    const boards = await Board.find({ _id: { $in: boardIds } });

    // Delete unnecessary objects
    boards.forEach((board) => {
      board.activity = undefined;
      board.lists = undefined;
    });

    return callback(false, boards);
  } catch (error) {
    return callback({ message: "Failed to get All Boards", error });
  }
};

const getById = async (id, callback) => {
  try {
    const board = await Board.findOne({ _id: id });
    return callback(false, board);
  } catch (error) {
    return callback({
      message: "Could not find requested Board",
      error,
    });
  }
};

const getActivityById = async (id, callback) => {
  try {
    const board = await Board.findOne({ _id: id });
    const activity = board?.activity ? board.activity : [];
    return callback(false, activity);
  } catch (error) {
    return callback({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

const updateBoardTitle = async (boardId, title, user, callback) => {
  try {
    const board = await Board.findOne({ _id: boardId });
    board.title = title;
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: `${user.name} updated the title of this board`,
      color: user.color,
    });
    await board.save();
    return callback(false, { message: "Title updated" });
  } catch (error) {
    return callback({
      message: "Failed to update the title of the board",
      error,
    });
  }
};

const updateBoardDescription = async (boardId, description, user, callback) => {
  try {
    const board = await Board.findOne({ _id: boardId });
    board.description = description;
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: `${user.name} updated the description of this board`,
      color: user.color,
    });
    await board.save();
    return callback(false, { message: "Description updated" });
  } catch (error) {
    return callback({
      message: "Failed to update the board description",
      error,
    });
  }
};

const updateBackground = async (id, background, isImage, user, callback) => {
  try {
    const board = await Board.findOne({ _id: id });

    board.backgroundImageLink = background;
    board.isImage = isImage;

    // Log the activity
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: `${user.name} updated the background of this board`,
      color: user.color,
    });

    // Save changes
    await board.save();

    return callback(false, board);
  } catch (error) {
    return callback({
      message: "Failed to update the board background",
      error,
    });
  }
};

const addMember = async (id, members, user, callback) => {
  try {
    const board = await Board.findOne({ _id: id });

    // Set variables
    await Promise.all(
      members.map(async (member) => {
        const newMember = await User.findOne({ email: member.email });
        newMember.boards.push(board._id);
        await newMember.save();
        board.members.push({
          user: newMember._id,
          name: newMember.name,
          surname: newMember.surname,
          email: newMember.email,
          color: newMember.color,
          role: "member",
        });
        //Add to board activity
        board.activity.push({
          user: user.id,
          name: user.name,
          action: `${user.name} added user ${newMember.name} to this board`,
          color: user.color,
        });
      })
    );
    // Save changes
    await board.save();

    return callback(false, board);
  } catch (error) {
    return callback({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

module.exports = {
  create,
  getAll,
  getById,
  getActivityById,
  updateBoardTitle,
  updateBoardDescription,
  updateBackground,
  addMember,
};
