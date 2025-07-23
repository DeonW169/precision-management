import { createSlice } from '@reduxjs/toolkit';
import { CardState } from './card/cardTypes';
import * as reducers from './card/cardReducers';

const initialState: CardState = {
    cardId: '',
    listId: '',
    title: '',
    labels: [],
    members: [],
    watchers: [],
    activities: [],
    checklists: [],
    owner: '',
    description: '',
    date: {
        startDate: null,
        dueDate: null,
        dueTime: null,
        completed: false,
    },
    attachments: [],
    cover: {
        color: null,
        isSizeOne: null,
    },
    colors: [
        { bg: '#61bd4f', hbg: '#519839' },
        { bg: '#f2d600', hbg: '#d9b51c' },
        { bg: '#ff9f1a', hbg: '#cd8313' },
        { bg: '#eb5a46', hbg: '#b04632' },
        { bg: '#c377e0', hbg: '#89609e' },
        { bg: '#0079bf', hbg: '#055a8c' },
        { bg: '#344563', hbg: '#172b4d' },
        { bg: '#ff78cb', hbg: '#c75bad' },
    ],
    pending: false,
    boardId: ''
};

const cardsSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        ...reducers,
        reset: () => initialState,

    },
});

export const {
    reset,
    setPending,
    setCard,
    updateTitle,
    updateDescription,
    updateDescriptionOfCard,
    addComment,
    updateComment,
    deleteComment,
    addMember,
    deleteMember,
    createLabel,
    updateLabel,
    deleteLabel,
    updateLabelSelection,
    updateCreatedLabelId,
    createChecklist,
    updateCreatedChecklist,
    deleteChecklist,
    addChecklistItem,
    updateAddedChecklistItemId,
    setChecklistItemCompleted,
    setChecklistItemText,
    deleteChecklistItem,
    updateStartDueDates,
    updateDateCompleted,
    addAttachment,
    updateAddedAttachmentId,
    deleteAttachment,
    updateAttachment,
    updateCover,
} = cardsSlice.actions;

export default cardsSlice.reducer;
