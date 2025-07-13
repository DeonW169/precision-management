const List = require("../../models/task/list");
const Board = require("../../models/task/board");
const Card = require("../../models/task/card");

const create = async (model, user, callback) => {
  try {
    // Create new List
    const tempList = await List(model);

    // Save the new List
    const newList = await tempList.save();

    // Get owner board
    const ownerBoard = await Board.findById(model.owner);

    // Add newList's id to owner board
    ownerBoard.lists.push(newList.id);

    // Add created activity to owner board activities
    ownerBoard.activity.unshift({
      user: user._id,
      name: user.name,
      action: `${user.name} added ${newList.title} to this board`,
      color: user.color,
    });

    // Save changes
    ownerBoard.save();

    // Return new list
    return callback(false, newList);
  } catch (error) {
    return callback({
      message: "Failed to create the list",
      error,
    });
  }
};

const getAll = async (boardId, callback) => {
  try {
    // Get lists whose owner id equals to boardId param
    let lists = await List.find({ owner: boardId })

    // Order the lists
    const board = await Board.findById(boardId);
    let responseObject = board.lists.map((listId) => {
      return lists.filter(
        (listObject) => listObject._id.toString() === listId.toString()
      )[0];
    });

    return callback(false, responseObject);
  } catch (error) {
    return callback({
      message: "Failed to get the list of specified board",
      error,
    });
  }
};

const deleteById = async (listId, boardId, user, callback) => {
  try {
    // Get board to check the parent of list is this board
    const board = await Board.findById(boardId);

    // Validate the parent of the list
    const validate = board.lists.filter((list) => list.id === listId);
    if (!validate)
      return callback({ message: "List or board information are wrong" });

    // Validate whether the owner of the board is the user who sent the request.
    if (!user.boards.filter((board) => board === boardId))
      return callback({
        message:
          "You cannot delete a list that does not hosted by your boards",
      });

    // Delete the list
    const result = await List.findByIdAndDelete(listId);

    // Delete the list from lists of board
    board.lists = board.lists.filter((list) => list.toString() !== listId);

    // Add activity log to board
    board.activity.unshift({
      user: user._id,
      name: user.name,
      action: `${user.name} deleted ${result.title} from this board`,
      color: user.color,
    });
    board.save();

    // Delete all cards in the list
    await Card.deleteMany({ owner: listId });

    return callback(false, result);
  } catch (error) {
    return callback({
      message: "Failed to delete the list",
      error,
    });
  }
};

const updateCardOrder = async (
  boardId,
  sourceId,
  destinationId,
  destinationIndex,
  cardId,
  user,
  callback
) => {
  try {
    // Validate the parent board of the lists
    const board = await Board.findById(boardId);
    let validate = board.lists.filter((list) => list.id === sourceId);
    const validate2 = board.lists.filter((list) => list.id === destinationId);
    if (!validate || !validate2)
      return callback({ message: "List or board informations are wrong" });

    // Validate the parent list of the card
    const sourceList = await List.findById(sourceId);
    validate = sourceList.cards.filter(
      (card) => card._id.toString() === cardId
    );
    if (!validate)
      return callback({ message: "List or card informations are wrong" });

    // Remove the card from source list and save
    sourceList.cards = sourceList.cards.filter(
      (card) => card._id.toString() !== cardId
    );
    await sourceList.save();

    // Insert the card to destination list and save
    const card = await Card.findById(cardId);
    const destinationList = await List.findById(destinationId);
    const temp = Array.from(destinationList.cards);
    temp.splice(destinationIndex, 0, cardId);
    destinationList.cards = temp;
    await destinationList.save();

    // Add card activity
    if (sourceId !== destinationId)
      card.activities.unshift({
        text: `moved this card from ${sourceList.title} to ${destinationList.title}`,
        userName: user.name,
        color: user.color,
      });

    // Change owner board of card
    card.owner = destinationId;
    await card.save();

    return callback(false, { message: "Success" });
  } catch (error) {
    return callback({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

const updateListOrder = async (
  boardId,
  sourceIndex,
  destinationIndex,
  listId,
  callback
) => {
  try {
    // Validate the parent board of the lists
    const board = await Board.findById(boardId);
    let validate = board.lists.filter((list) => list.id === listId);

    if (!validate)
      return callback({ message: "List or board informations are wrong" });

    // Change list order
    board.lists.splice(sourceIndex, 1);
    board.lists.splice(destinationIndex, 0, listId);
    await board.save();

    return callback(false, { message: "Success" });
  } catch (error) {
    return callback({
      message: "Something went wrong",
      details: error.message,
    });
  }
};

const updateListTitle = async (listId, boardId, user, title, callback) => {
  try {
    // Get board to check the parent of list is this board
    const board = await Board.findById(boardId);
    const list = await List.findById(listId.toString());
    // Validate the parent of the list
    const validate = board.lists.filter((list) => list.id === listId);
    if (!validate)
      return callback({ message: "List or board informations are wrong" });

    // Validate whether the owner of the board is the user who sent the request.
    if (!user.boards.filter((board) => board === boardId))
      return callback({
        message:
          "You cannot delete a list that does not hosted by your boards",
      });

    // Change title of list
    list.title = title;
    await list.save();

    return callback(false, { message: "Success" });
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
  deleteById,
  updateCardOrder,
  updateListOrder,
  updateListTitle,
};
