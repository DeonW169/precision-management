import axios from 'axios';
import { openAlert } from '../redux/slices/alertSlice';
import { setLoading, successCreatingCard, deleteCard } from '../redux/slices/listSlice';
import { AppDispatch } from '../redux/store';

const baseUrl = 'http://localhost:3001/card';

export const createCard = async (
    title: string,
    listId: string,
    boardId: string,
    dispatch: AppDispatch
): Promise<void> => {
    dispatch(setLoading(true));
    try {
        const updatedList = await axios.post(`${baseUrl}/create`, {
            title,
            listId,
            boardId,
        });

        dispatch(successCreatingCard({ listId, updatedList: updatedList.data }));
        dispatch(setLoading(false));
    } catch (error: any) {
        dispatch(setLoading(false));
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage || error.message,
                severity: 'error',
            })
        );
    }
};

export const cardDelete = async (
    listId: string,
    boardId: string,
    cardId: string,
    dispatch: AppDispatch
): Promise<void> => {
    try {
        dispatch(deleteCard({ listId, cardId }));
        await axios.delete(`${baseUrl}/${boardId}/${listId}/${cardId}/delete-card`);
    } catch (error: any) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage || error.message,
                severity: 'error',
            })
        );
    }
};
