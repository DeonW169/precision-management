import axios from 'axios';
import {
    setLoading,
    successCreatingList,
    successDeletingList,
    successFetchingLists,
    updateListTitle,
} from '../redux/slices/listSlice';
import { openAlert } from '../redux/slices/alertSlice';
import {
    addMembers,
    setActivityLoading,
    updateActivity,
    updateBackground,
    updateDescription,
} from '../redux/slices/boardSlice';
import { AppDispatch } from '../redux/store';

const listRoute = 'http://localhost:3001/list';
const boardRoute = 'http://localhost:3001/board';

export const getLists = async (boardId: string, dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading(true));
    try {
        const res = await axios.get(`${listRoute}/${boardId}`);
        dispatch(successFetchingLists(res.data));
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 300);
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

export const activityUpdate = async (boardId: string, dispatch: AppDispatch): Promise<void> => {
    dispatch(setActivityLoading(true));
    try {
        const res = await axios.get(`${boardRoute}/${boardId}/activity`);
        dispatch(updateActivity(res.data));
        dispatch(setActivityLoading(false));
    } catch (error: any) {
        dispatch(setActivityLoading(false));
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage || error.message,
                severity: 'error',
            })
        );
    }
};

export const createList = async (title: string, boardId: string, dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading(true));
    try {
        const res = await axios.post(`${listRoute}/create`, { title, boardId });
        dispatch(successCreatingList(res.data));
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

export const DeleteList = async (listId: string, boardId: string, dispatch: AppDispatch): Promise<void> => {
    dispatch(setLoading(true));
    try {
        await axios.delete(`${listRoute}/${boardId}/${listId}`);
        dispatch(successDeletingList(listId));
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

export const listTitleUpdate = async (
    listId: string,
    boardId: string,
    title: string,
    dispatch: AppDispatch
): Promise<void> => {
    try {
        dispatch(updateListTitle({ listId, title }));
        await axios.put(`${listRoute}/${boardId}/${listId}/update-title`, { title });
    } catch (error: any) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage || error.message,
                severity: 'error',
            })
        );
    }
};

export const boardDescriptionUpdate = async (
    boardId: string,
    description: string,
    dispatch: AppDispatch
): Promise<void> => {
    try {
        dispatch(updateDescription(description));
        await axios.put(`${boardRoute}/${boardId}/update-board-description`, { description });
    } catch (error: any) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage || error.message,
                severity: 'error',
            })
        );
    }
};

export const boardBackgroundUpdate = async (
    boardId: string,
    background: string,
    isImage: boolean,
    dispatch: AppDispatch
): Promise<void> => {
    try {
        dispatch(updateBackground({ background, isImage }));
        await axios.put(`${boardRoute}/${boardId}/update-background`, { background, isImage });
    } catch (error: any) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage || error.message,
                severity: 'error',
            })
        );
    }
};

export const boardMemberAdd = async (
    boardId: string,
    members: string[], // adjust to actual member object if needed
    dispatch: AppDispatch
): Promise<void> => {
    try {
        const result = await axios.post(`${boardRoute}/${boardId}/add-member`, { members });
        dispatch(addMembers(result.data));
        dispatch(
            openAlert({
                message: 'Members are added to this board successfully',
                severity: 'success',
            })
        );
    } catch (error: any) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage || error.message,
                severity: 'error',
            })
        );
    }
};
