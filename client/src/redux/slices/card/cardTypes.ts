export interface Label {
    _id: string;
    text: string;
    color: string;
    backColor: string;
    selected: boolean;
}

export interface Member {
    user?: string;
    name?: string;
    color?: string;
    memberId?: string;
    memberName?: string;
    memberColor?: string;
}

export interface Watcher {
    user: string;
    name: string;
}

export interface ChecklistItem {
    _id: string;
    text: string;
    completed: boolean;
}

export interface Checklist {
    _id: string;
    title: string;
    items: ChecklistItem[];
}

export interface Activity {
    _id: string;
    text: string;
}

export interface Attachment {
    _id: string;
    link: string;
    name: string;
    date: string;
}

export interface Cover {
    color: string | null;
    isSizeOne: boolean | null;
}

export interface DateObject {
    startDate: string | null;
    dueDate: string | null;
    dueTime: string | null;
    completed: boolean;
}

export interface CardState {
    cardId: string;
    listId: string;
    boardId: string;
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
    // listId?: string;
    // boardId?: string;
    selected?: boolean;
}