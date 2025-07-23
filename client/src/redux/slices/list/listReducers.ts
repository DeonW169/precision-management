import { PayloadAction } from '@reduxjs/toolkit';
import { List, ListState } from './listTypes';

export const setLoading = (state: any, action: PayloadAction<boolean>) => {
    state.loadingListService = action.payload;
};

export const successCreatingList = (state: any, action: PayloadAction<List>) => {
    state.allLists.push(action.payload);
};

export const successFetchingLists = (state: any, action: PayloadAction<List[]>) => {
    state.allLists = action.payload;
};

export const successDeletingList = (state: any, action: PayloadAction<string>) => {
    state.allLists = state.allLists.filter((list: any) => list._id !== action.payload);
};

export const deleteCard = (state: any, action: PayloadAction<{ listId: string; cardId: string }>) => {
    const { listId, cardId } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.filter((card: any) => card._id !== cardId);
        }
        return list;
    });
};

export const successCreatingCard = (state: any, action: PayloadAction<{ listId: string; updatedList: List }>) => {
    state.allLists = state.allLists.map((list: any) =>
        list._id === action.payload.listId ? action.payload.updatedList : list
    );
};

export const updateCardDragDrop = (state: any, action: PayloadAction<List[]>) => {
    state.allLists = action.payload;
};

export const updateListDragDrop = (state: any, action: PayloadAction<List[]>) => {
    state.allLists = action.payload;
};

export const setCardTitle = (state: any, action: PayloadAction<{ listId: string; cardId: string; title: string }>) => {
    const { listId, cardId, title } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) card.title = title;
                return card;
            });
        }
        return list;
    });
};

export const updateListTitle = (state: any, action: PayloadAction<{ listId: string; title: string }>) => {
    state.allLists = state.allLists.map((list: any) =>
        list._id === action.payload.listId ? { ...list, title: action.payload.title } : list
    );
};

export const updateMemberOfCard = (state: any, action: PayloadAction<{ listId: string; cardId: string; memberId: string; memberName: string; memberColor: string }>) => {
    const { listId, cardId, memberId, memberName, memberColor } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.members.unshift({ user: memberId, name: memberName, color: memberColor });
                }
                return card;
            });
        }
        return list;
    });
};

export const deleteMemberOfCard = (state: any, action: PayloadAction<{ listId: string; cardId: string; memberId: string }>) => {
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === action.payload.listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === action.payload.cardId) {
                    card.members = card.members.filter((member: any) => member.user !== action.payload.memberId);
                }
                return card;
            });
        }
        return list;
    });
};

export const updateDescriptionOfCard = (state: any, action: PayloadAction<{ listId: string; cardId: string; description: string }>) => {
    const { listId, cardId, description } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) =>
                card._id === cardId ? { ...card, description } : card
            );
        }
        return list;
    });
};

export const updateLabelSelectionOfCard = (state: any, action: PayloadAction<{ listId: string; cardId: string; labelId: string; selected: boolean }>) => {
    const { listId, cardId, labelId, selected } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.labels = card.labels.map((label: any) =>
                        label._id === labelId ? { ...label, selected } : label
                    );
                }
                return card;
            });
        }
        return list;
    });
};

export const updateLabelOfCard = (state: any, action: PayloadAction<{ listId: string; cardId: string; labelId: string; text: string; color: string; backColor: string }>) => {
    const { listId, cardId, labelId, text, color, backColor } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.labels = card.labels.map((label: any) =>
                        label._id === labelId ? { ...label, text, color, backColor } : label
                    );
                }
                return card;
            });
        }
        return list;
    });
};

export const createLabelForCard = (state: any, action: PayloadAction<{ listId: string; cardId: string; _id: string; text: string; color: string; backColor: string }>) => {
    const { listId, cardId, _id, text, color, backColor } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.labels.unshift({ _id, text, color, backColor, selected: true });
                }
                return card;
            });
        }
        return list;
    });
};

export const deleteLabelOfCard = (state: any, action: PayloadAction<{ listId: string; cardId: string; labelId: string }>) => {
    const { listId, cardId, labelId } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.labels = card.labels.filter((label: any) => label._id !== labelId);
                }
                return card;
            });
        }
        return list;
    });
};

export const createChecklistForCard = (state: any, action: PayloadAction<{ listId: string; cardId: string; _id: string; title: string }>) => {
    const { listId, cardId, _id, title } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.checklists.push({ _id, title, items: [] });
                }
                return card;
            });
        }
        return list;
    });
};

export const deleteChecklistOfCard = (
    state: any,
    action: PayloadAction<{ listId: string; cardId: string; checklistId: string }>
) => {
    const { listId, cardId, checklistId } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.checklists = card.checklists.filter((checklist: any) => checklist._id !== checklistId);
                }
                return card;
            });
        }
        return list;
    });
};

export const addChecklistItemForCard = (
    state: any,
    action: PayloadAction<{ listId: string; cardId: string; checklistId: string; _id: string; text: string }>
) => {
    const { listId, cardId, checklistId, _id, text } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.checklists = card.checklists.map((checklist: any) => {
                        if (checklist._id === checklistId) {
                            checklist.items.push({ _id, text, completed: false });
                        }
                        return checklist;
                    });
                }
                return card;
            });
        }
        return list;
    });
};

export const setChecklistItemCompletedOfCard = (
    state: any,
    action: PayloadAction<{ listId: string; cardId: string; checklistId: string; checklistItemId: string; completed: boolean }>
) => {
    const { listId, cardId, checklistId, checklistItemId, completed } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.checklists = card.checklists.map((checklist: any) => {
                        if (checklist._id === checklistId) {
                            checklist.items = checklist.items.map((item: any) =>
                                item._id === checklistItemId ? { ...item, completed } : item
                            );
                        }
                        return checklist;
                    });
                }
                return card;
            });
        }
        return list;
    });
};

export const deleteChecklistItemOfCard = (
    state: any,
    action: PayloadAction<{ listId: string; cardId: string; checklistId: string; checklistItemId: string }>
) => {
    const { listId, cardId, checklistId, checklistItemId } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.checklists = card.checklists.map((checklist: any) => {
                        if (checklist._id === checklistId) {
                            checklist.items = checklist.items.filter((item: any) => item._id !== checklistItemId);
                        }
                        return checklist;
                    });
                }
                return card;
            });
        }
        return list;
    });
};

export const setChecklistItemTextOfCard = (
    state: any,
    action: PayloadAction<{ listId: string; cardId: string; checklistId: string; checklistItemId: string; text: string }>
) => {
    const { listId, cardId, checklistId, checklistItemId, text } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.checklists = card.checklists.map((checklist: any) => {
                        if (checklist._id === checklistId) {
                            checklist.items = checklist.items.map((item: any) =>
                                item._id === checklistItemId ? { ...item, text } : item
                            );
                        }
                        return checklist;
                    });
                }
                return card;
            });
        }
        return list;
    });
};

export const updateStartDueDatesOfCard = (
    state: any,
    action: PayloadAction<{ listId: string; cardId: string; startDate: string | null; dueDate: string | null; dueTime: string | null }>
) => {
    const { listId, cardId, startDate, dueDate, dueTime } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card.cardId === cardId) {
                    card.date.startDate = startDate;
                    card.date.dueDate = dueDate;
                    card.date.dueTime = dueTime;
                    if (dueDate === null) card.date.completed = false;
                }
                return card;
            });
        }
        return list;
    });
};

export const updateDateCompletedOfCard = (
    state: any,
    action: PayloadAction<{ listId: string; cardId: string; completed: boolean }>
) => {
    const { listId, cardId, completed } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.date.completed = completed;
                }
                return card;
            });
        }
        return list;
    });
};

export const addAttachmentForCard = (
    state: any,
    action: PayloadAction<{ listId: string; cardId: string; link: string; name: string; _id: string; date: string }>
) => {
    const { listId, cardId, link, name, _id, date } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.attachments.push({ link, name, _id, date });
                }
                return card;
            });
        }
        return list;
    });
};

export const deleteAttachmentOfCard = (
    state: any,
    action: PayloadAction<{ listId: string; cardId: string; attachmentId: string }>
) => {
    const { listId, cardId, attachmentId } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.attachments = card.attachments.filter((a: any) => a._id !== attachmentId);
                }
                return card;
            });
        }
        return list;
    });
};

export const updateCoverOfCard = (
    state: any,
    action: PayloadAction<{ listId: string; cardId: string; color: string; isSizeOne: boolean }>
) => {
    const { listId, cardId, color, isSizeOne } = action.payload;
    state.allLists = state.allLists.map((list: any) => {
        if (list._id === listId) {
            list.cards = list.cards.map((card: any) => {
                if (card._id === cardId) {
                    card.cover.color = color;
                    card.cover.isSizeOne = isSizeOne;
                }
                return card;
            });
        }
        return list;
    });
};