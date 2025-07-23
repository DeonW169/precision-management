import { PayloadAction } from '@reduxjs/toolkit';
import { Activity, Member, Label, Attachment, Cover } from './cardTypes';

export const setPending = (state: any, action: PayloadAction<boolean>) => {
    state.pending = action.payload;
};

export const setCard = (state: any, action: PayloadAction<any>) => {
    state.cardId = action.payload._id;
    state.title = action.payload.title;
    state.labels = action.payload.labels;
    state.members = action.payload.members;
    state.watchers = action.payload.watchers;
    state.activities = action.payload.activities;
    state.owner = action.payload.owner;
    state.listTitle = action.payload.listTitle;
    state.listId = action.payload.listId;
    state.boardId = action.payload.boardId;
    state.description = action.payload.description;
    state.checklists = action.payload.checklists;
    state.date = action.payload.date;
    state.attachments = action.payload.attachments;
    state.cover = action.payload.cover;
};

export const updateTitle = (state: any, action: PayloadAction<string>) => {
    state.title = action.payload;
};

export const updateDescription = (state: any, action: PayloadAction<string>) => {
    state.description = action.payload;
};

export const updateDescriptionOfCard = (state: any, action: PayloadAction<{ listId: string; cardId: string; description: string }>) => {
    state.description = action.payload;
};

export const addComment = (state: any, action: PayloadAction<Activity[]>) => {
    state.activities = action.payload;
};

export const updateComment = (state: any, action: PayloadAction<{ commentId: string; text: string }>) => {
    const { commentId, text } = action.payload;
    state.activities = state.activities.map((activity: any) =>
        activity._id === commentId ? { ...activity, text } : activity
    );
};

export const deleteComment = (state: any, action: PayloadAction<string>) => {
    state.activities = state.activities.filter((act: any) => act._id !== action.payload);
};

export const addMember = (state: any, action: PayloadAction<Member>) => {
    state.members.unshift(action.payload);
};

export const deleteMember = (state: any, action: PayloadAction<{ memberId: string }>) => {
    state.members = state.members.filter((m: any) => m.user !== action.payload.memberId);
};

export const createLabel = (state: any, action: PayloadAction<Label>) => {
    state.labels.unshift({ ...action.payload, selected: true });
};

export const updateLabel = (state: any, action: PayloadAction<Omit<Label, 'selected'> & { labelId: string }>) => {
    const { labelId, text, color, backColor } = action.payload;
    state.labels = state.labels.map((label: any) =>
        label._id === labelId ? { ...label, text, color, backColor } : label
    );
};

export const deleteLabel = (state: any, action: PayloadAction<string>) => {
    state.labels = state.labels.filter((l: any) => l._id !== action.payload);
};

export const updateLabelSelection = (state: any, action: PayloadAction<{ labelId: string; selected: boolean }>) => {
    state.labels = state.labels.map((label: any) =>
        label._id === action.payload.labelId ? { ...label, selected: action.payload.selected } : label
    );
};

export const updateCreatedLabelId = (state: any, action: PayloadAction<string>) => {
    state.labels = state.labels.map((label: any) =>
        label._id === 'notUpdated' ? { ...label, _id: action.payload } : label
    );
};

export const createChecklist = (state: any, action: PayloadAction<{ _id: string; title: string }>) => {
    state.checklists.push({ ...action.payload, items: [] });
};

export const updateCreatedChecklist = (state: any, action: PayloadAction<string>) => {
    state.checklists = state.checklists.map((checklist: any) =>
        checklist._id === 'notUpdated' ? { ...checklist, _id: action.payload } : checklist
    );
};

export const deleteChecklist = (state: any, action: PayloadAction<string>) => {
    state.checklists = state.checklists.filter((list: any) => list._id !== action.payload);
};

export const addChecklistItem = (state: any, action: PayloadAction<{ checklistId: string; _id: string; text: string }>) => {
    state.checklists = state.checklists.map((list: any) =>
        list._id === action.payload.checklistId
            ? { ...list, items: [...list.items, { _id: action.payload._id, text: action.payload.text, completed: false }] }
            : list
    );
};

export const updateAddedChecklistItemId = (state: any, action: PayloadAction<{ checklistId: string; checklistItemId: string }>) => {
    state.checklists = state.checklists.map((list: any) => {
        if (list._id === action.payload.checklistId && list.items.length > 0) {
            list.items[list.items.length - 1]._id = action.payload.checklistItemId;
        }
        return list;
    });
};

export const setChecklistItemCompleted = (state: any, action: PayloadAction<{ checklistId: string; checklistItemId: string; completed: boolean }>) => {
    state.checklists = state.checklists.map((list: any) =>
        list._id === action.payload.checklistId
            ? {
                ...list,
                items: list.items.map((item: any) =>
                    item._id === action.payload.checklistItemId ? { ...item, completed: action.payload.completed } : item
                ),
            }
            : list
    );
};

export const setChecklistItemText = (state: any, action: PayloadAction<{ checklistId: string; checklistItemId: string; text: string }>) => {
    state.checklists = state.checklists.map((list: any) =>
        list._id === action.payload.checklistId
            ? {
                ...list,
                items: list.items.map((item: any) =>
                    item._id === action.payload.checklistItemId ? { ...item, text: action.payload.text } : item
                ),
            }
            : list
    );
};

export const deleteChecklistItem = (state: any, action: PayloadAction<{ checklistId: string; checklistItemId: string }>) => {
    state.checklists = state.checklists.map((list: any) =>
        list._id === action.payload.checklistId
            ? {
                ...list,
                items: list.items.filter((item: any) => item._id !== action.payload.checklistItemId),
            }
            : list
    );
};

export const updateStartDueDates = (state: any, action: PayloadAction<{ startDate: string | null; dueDate: string | null; dueTime: string | null }>) => {
    const { startDate, dueDate, dueTime } = action.payload;
    state.date.startDate = startDate;
    state.date.dueDate = dueDate;
    state.date.dueTime = dueTime;
    if (dueDate === null) state.date.completed = false;
};

export const updateDateCompleted = (state: any, action: PayloadAction<boolean>) => {
    state.date.completed = action.payload;
};

export const addAttachment = (state: any, action: PayloadAction<Attachment>) => {
    state.attachments.push(action.payload);
};

export const updateAddedAttachmentId = (state: any, action: PayloadAction<string>) => {
    state.attachments = state.attachments.map((a: any) =>
        a._id === 'notUpdated' ? { ...a, _id: action.payload } : a
    );
};

export const deleteAttachment = (state: any, action: PayloadAction<string>) => {
    state.attachments = state.attachments.filter((a: any) => a._id !== action.payload);
};

export const updateAttachment = (state: any, action: PayloadAction<{ attachmentId: string; link: string; name: string }>) => {
    state.attachments = state.attachments.map((a: any) =>
        a._id === action.payload.attachmentId ? { ...a, link: action.payload.link, name: action.payload.name } : a
    );
};

export const updateCover = (state: any, action: PayloadAction<Cover>) => {
    state.cover = action.payload;
};