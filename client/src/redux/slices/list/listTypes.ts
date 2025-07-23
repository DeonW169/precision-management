export interface Label {
    _id: string;
    text: string;
    color: string;
    backColor: string;
    selected: boolean;
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

export interface Attachment {
    _id: string;
    link: string;
    name: string;
    date: string;
}

export interface Member {
    user: string;
    name: string;
    color: string;
}

export interface Card {
    _id: string;
    title: string;
    description: string;
    labels: Label[];
    members: Member[];
    checklists: Checklist[];
    attachments: Attachment[];
    cover: {
        color: string | null;
        isSizeOne: boolean | null;
    };
    date: {
        startDate: string | null;
        dueDate: string | null;
        dueTime: string | null;
        completed: boolean;
    };
}

export interface List {
    _id: string;
    title?: string;
    cards: Card[];
}

export interface ListState {
    allLists: List[];
    loadingListService: boolean;
}