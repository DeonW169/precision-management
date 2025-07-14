import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Label {
    _id: string;
    text: string;
    color: string;
    backColor: string;
    selected: boolean;
}

interface Member {
    user: string;
    name: string;
    color: string;
}

interface Watcher {
    user: string;
    name: string;
}

interface ChecklistItem {
    _id: string;
    text: string;
    completed: boolean;
}

interface Checklist {
    _id: string;
    title: string;
    items: ChecklistItem[];
}

interface Activity {
    _id: string;
    text: string;
}

interface Attachment {
    _id: string;
    link: string;
    name: string;
    date: string;
}

interface Cover {
    color: string | null;
    isSizeOne: boolean | null;
}

interface DateObject {
    startDate: string | null;
    dueDate: string | null;
    dueTime: string | null;
    completed: boolean;
}

interface CardState {
    cardId: string;
    title: string;
    labels: Label[];
    members: Member[];
    watchers: Watcher[];
    activities: Activity[];
    checklists: Checklist[];
    owner: string;
    description: string;
    date: DateObject;
    attachments: Attachment[];
    cover: Cover;
    colors: { bg: string; hbg: string }[];
    pending: boolean;
    listTitle?: string;
    listId?: string;
    boardId?: string;
}

const initialState: CardState = {
    cardId: '',
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
};

const cardsSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        reset: () => initialState,
        setPending: (state: any, action: PayloadAction<boolean>) => {
            state.pending = action.payload;
        },
        setCard: (state: any, action: PayloadAction<any>) => {
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
        },
        updateTitle: (state: any, action: PayloadAction<string>) => {
            state.title = action.payload;
        },
        updateDescription: (state: any, action: PayloadAction<string>) => {
            state.description = action.payload;
        },
        addComment: (state: any, action: PayloadAction<Activity[]>) => {
            state.activities = action.payload;
        },
        updateComment: (state: any, action: PayloadAction<{ commentId: string; text: string }>) => {
            const { commentId, text } = action.payload;
            state.activities = state.activities.map((activity: any) =>
                activity._id === commentId ? { ...activity, text } : activity
            );
        },
        deleteComment: (state: any, action: PayloadAction<string>) => {
            state.activities = state.activities.filter((act: any) => act._id !== action.payload);
        },
        addMember: (state: any, action: PayloadAction<Member>) => {
            state.members.unshift(action.payload);
        },
        deleteMember: (state: any, action: PayloadAction<{ memberId: string }>) => {
            state.members = state.members.filter((m: any) => m.user !== action.payload.memberId);
        },
        createLabel: (state: any, action: PayloadAction<Label>) => {
            state.labels.unshift({ ...action.payload, selected: true });
        },
        updateLabel: (state: any, action: PayloadAction<Omit<Label, 'selected'> & { labelId: string }>) => {
            const { labelId, text, color, backColor } = action.payload;
            state.labels = state.labels.map((label: any) =>
                label._id === labelId ? { ...label, text, color, backColor } : label
            );
        },
        deleteLabel: (state: any, action: PayloadAction<string>) => {
            state.labels = state.labels.filter((l: any) => l._id !== action.payload);
        },
        updateLabelSelection: (state: any, action: PayloadAction<{ labelId: string; selected: boolean }>) => {
            state.labels = state.labels.map((label: any) =>
                label._id === action.payload.labelId ? { ...label, selected: action.payload.selected } : label
            );
        },
        updateCreatedLabelId: (state: any, action: PayloadAction<string>) => {
            state.labels = state.labels.map((label: any) =>
                label._id === 'notUpdated' ? { ...label, _id: action.payload } : label
            );
        },
        createChecklist: (state: any, action: PayloadAction<{ _id: string; title: string }>) => {
            state.checklists.push({ ...action.payload, items: [] });
        },
        updateCreatedChecklist: (state: any, action: PayloadAction<string>) => {
            state.checklists = state.checklists.map((checklist: any) =>
                checklist._id === 'notUpdated' ? { ...checklist, _id: action.payload } : checklist
            );
        },
        deleteChecklist: (state: any, action: PayloadAction<string>) => {
            state.checklists = state.checklists.filter((list: any) => list._id !== action.payload);
        },
        addChecklistItem: (state: any, action: PayloadAction<{ checklistId: string; _id: string; text: string }>) => {
            state.checklists = state.checklists.map((list: any) =>
                list._id === action.payload.checklistId
                    ? { ...list, items: [...list.items, { _id: action.payload._id, text: action.payload.text, completed: false }] }
                    : list
            );
        },
        updateAddedChecklistItemId: (state: any, action: PayloadAction<{ checklistId: string; checklistItemId: string }>) => {
            state.checklists = state.checklists.map((list: any) => {
                if (list._id === action.payload.checklistId && list.items.length > 0) {
                    list.items[list.items.length - 1]._id = action.payload.checklistItemId;
                }
                return list;
            });
        },
        setChecklistItemCompleted: (state: any, action: PayloadAction<{ checklistId: string; checklistItemId: string; completed: boolean }>) => {
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
        },
        setChecklistItemText: (state: any, action: PayloadAction<{ checklistId: string; checklistItemId: string; text: string }>) => {
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
        },
        deleteChecklistItem: (state: any, action: PayloadAction<{ checklistId: string; checklistItemId: string }>) => {
            state.checklists = state.checklists.map((list: any) =>
                list._id === action.payload.checklistId
                    ? {
                        ...list,
                        items: list.items.filter((item: any) => item._id !== action.payload.checklistItemId),
                    }
                    : list
            );
        },
        updateStartDueDates: (state: any, action: PayloadAction<{ startDate: string | null; dueDate: string | null; dueTime: string | null }>) => {
            const { startDate, dueDate, dueTime } = action.payload;
            state.date.startDate = startDate;
            state.date.dueDate = dueDate;
            state.date.dueTime = dueTime;
            if (dueDate === null) state.date.completed = false;
        },
        updateDateCompleted: (state: any, action: PayloadAction<boolean>) => {
            state.date.completed = action.payload;
        },
        addAttachment: (state: any, action: PayloadAction<Attachment>) => {
            state.attachments.push(action.payload);
        },
        updateAddedAttachmentId: (state: any, action: PayloadAction<string>) => {
            state.attachments = state.attachments.map((a: any) =>
                a._id === 'notUpdated' ? { ...a, _id: action.payload } : a
            );
        },
        deleteAttachment: (state: any, action: PayloadAction<string>) => {
            state.attachments = state.attachments.filter((a: any) => a._id !== action.payload);
        },
        updateAttachment: (state: any, action: PayloadAction<{ attachmentId: string; link: string; name: string }>) => {
            state.attachments = state.attachments.map((a: any) =>
                a._id === action.payload.attachmentId ? { ...a, link: action.payload.link, name: action.payload.name } : a
            );
        },
        updateCover: (state: any, action: PayloadAction<Cover>) => {
            state.cover = action.payload;
        },
    },
});

export const {
    reset,
    setPending,
    setCard,
    updateTitle,
    updateDescription,
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
