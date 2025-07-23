export interface Member {
    _id: string;
    user: string;
    name: string;
    color: string;
    [key: string]: any;
}

export interface Label {
    text: string;
    color: string;
    backColor: string;
    selected: boolean;
}

export interface CardDate {
    startDate?: string;
    dueDate?: string;
    dueTime?: string;
}

export interface Watcher {
    user: string;
    name: string;
}

export interface Card {
    _id: string;
    title: string;
    description?: string;
    labels: Label[];
    members: Member[];
    watchers: Watcher[];
    date: CardDate;
    listId: string;
}

export interface List {
    _id: string;
    title: string;
    boardId: string;
    cards: Card[];
    position: number;
    [key: string]: any;
}

export interface Board {
    _id: string;
    title: string;
    owner: string;
    members: Member[];
    lists: List[];
    background: string;
}

export interface BoardState {
    boards?: Board[];
    currentBoard?: Board | null;
    isLoading?: boolean;
    error?: string;
    id: string;
    _id?: string;
    title?: string;
    backgroundImageLink?: string;
    isImage?: boolean;
    lists: List[];
    members: Member[];
    activity: Activity[];
    description: string;
    activityLoading?: boolean;
}

export interface Activity {
    _id?: string;
    text?: string;
    createdAt?: string;
    [key: string]: any;
}