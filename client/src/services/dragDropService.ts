import axios from 'axios';
import { updateCardDragDrop, updateListDragDrop } from '../redux/slices/listSlice';
import { openAlert } from '../redux/slices/alertSlice';
import { AppDispatch } from '../redux/store';
import { Routes } from '../api/routes';

let submitCall: Promise<any> = Promise.resolve();

interface UpdateCardOrderProps {
    boardId: string;
    sourceId: string;
    destinationId: string;
    sourceIndex: number;
    destinationIndex: number;
    cardId: string;
    allLists: any[];
}

interface UpdateListOrderProps {
    boardId: string;
    sourceIndex: number;
    destinationIndex: number;
    listId: string;
    allLists: any[];
}

export const updateCardOrder = async (
    props: UpdateCardOrderProps,
    dispatch: AppDispatch
): Promise<void> => {
    const savedList = JSON.parse(JSON.stringify(props.allLists));
    let tempList = JSON.parse(JSON.stringify(props.allLists));
    const cardItem = props.allLists
        .find((list) => list._id === props.sourceId)
        ?.cards.find((card: any) => card._id === props.cardId);

    if (props.sourceId === props.destinationId) {
        tempList = tempList.map((list: any) => {
            if (list._id === props.sourceId) {
                list.cards.splice(props.sourceIndex, 1);
                list.cards.splice(props.destinationIndex, 0, cardItem);
            }
            return list;
        });
    } else {
        tempList = tempList.map((list: any) => {
            if (list._id === props.sourceId) list.cards.splice(props.sourceIndex, 1);
            return list;
        });

        tempList = tempList.map((list: any) => {
            if (list._id === props.destinationId) {
                const temp = Array.from(list.cards || []);
                temp.splice(props.destinationIndex, 0, cardItem);
                list.cards = temp;
            }
            return list;
        });
    }

    await dispatch(updateCardDragDrop(tempList));

    submitCall = submitCall.then(() =>
        axios.post(`${Routes.LIST}/change-card-order`, {
            boardId: props.boardId,
            sourceId: props.sourceId,
            destinationId: props.destinationId,
            destinationIndex: props.destinationIndex,
            cardId: props.cardId,
        })
    );

    try {
        await submitCall;
    } catch (error: any) {
        await dispatch(updateCardDragDrop(savedList));
        dispatch(
            openAlert({
                message: error?.response?.data?.message || error.message,
                severity: 'error',
            })
        );
    }
};

export const updateListOrder = async (
    props: UpdateListOrderProps,
    dispatch: AppDispatch
): Promise<void> => {
    const savedOrder = JSON.parse(JSON.stringify(props.allLists));
    let tempList = JSON.parse(JSON.stringify(props.allLists));
    const list = props.allLists.find((item) => item._id === props.listId);

    tempList.splice(props.sourceIndex, 1);
    tempList.splice(props.destinationIndex, 0, list);

    await dispatch(updateListDragDrop(tempList));

    submitCall = submitCall.then(() =>
        axios.post(`${Routes.LIST}/change-list-order`, {
            boardId: props.boardId,
            sourceIndex: props.sourceIndex,
            destinationIndex: props.destinationIndex,
            listId: props.listId,
        })
    );

    try {
        await submitCall;
    } catch (error: any) {
        await dispatch(updateCardDragDrop(savedOrder));
        dispatch(
            openAlert({
                message: error?.response?.data?.message || error.message,
                severity: 'error',
            })
        );
    }
};
