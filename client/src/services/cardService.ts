import axios from 'axios';
import { AppDispatch } from '../redux/store';
import { openAlert } from '../redux/slices/alertSlice';
import {
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
} from '../redux/slices/cardSlice';
import {
    setCardTitle,
    updateDescriptionOfCard,
    deleteMemberOfCard,
    updateMemberOfCard,
    createLabelForCard,
    updateLabelOfCard,
    deleteLabelOfCard,
    updateLabelSelectionOfCard,
    createChecklistForCard,
    deleteChecklistOfCard,
    addChecklistItemForCard,
    setChecklistItemCompletedOfCard,
    setChecklistItemTextOfCard,
    deleteChecklistItemOfCard,
    updateStartDueDatesOfCard,
    updateDateCompletedOfCard,
    addAttachmentForCard,
    deleteAttachmentOfCard,
    updateCoverOfCard,
} from '../redux/slices/listSlice';

const baseUrl = 'http://localhost:3001/card';
let submitCall: Promise<any> = Promise.resolve();

export const getCard = async (
    cardId: string,
    listId: string,
    boardId: string,
    dispatch: AppDispatch
) => {
    dispatch(setPending(true));
    try {
        let response: any;
        submitCall = submitCall.then(() =>
            axios.get(`${baseUrl}/${boardId}/${listId}/${cardId}`).then((res) => {
                response = res;
            })
        );
        await submitCall;

        const card = JSON.parse(JSON.stringify(response.data));
        dispatch(setCard(card));
        dispatch(setPending(false));
    } catch (error: any) {
        dispatch(setPending(false));
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ?? error.message,
                severity: 'error',
            })
        );
    }
};

export const titleUpdate = async (
    cardId: string,
    listId: string,
    boardId: string,
    title: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(setCardTitle({ listId, cardId, title }));
        dispatch(updateTitle(title));

        submitCall = submitCall.then(() =>
            axios.put(`${baseUrl}/${boardId}/${listId}/${cardId}`, { title })
        );
        await submitCall;
    } catch (error: any) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ?? error.message,
                severity: 'error',
            })
        );
    }
};

export const descriptionUpdate = async (
    cardId: string,
    listId: string,
    boardId: string,
    description: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(updateDescription(description));
        dispatch(updateDescriptionOfCard({ listId, cardId, description }));

        submitCall = submitCall.then(() =>
            axios.put(`${baseUrl}/${boardId}/${listId}/${cardId}`, { description })
        );
        await submitCall;
    } catch (error: any) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ?? error.message,
                severity: 'error',
            })
        );
    }
};

export const comment = async (
    cardId: string,
    listId: string,
    boardId: string,
    text: string,
    userName: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(setPending(true));

        let response: any;
        submitCall = submitCall.then(() =>
            axios
                .post(`${baseUrl}/${boardId}/${listId}/${cardId}/add-comment`, { text })
                .then((res) => {
                    response = res;
                })
        );
        await submitCall;

        dispatch(addComment(response.data));
        dispatch(setPending(false));
    } catch (error: any) {
        dispatch(setPending(false));
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ?? error.message,
                severity: 'error',
            })
        );
    }
};

export const commentUpdate = async (
    cardId: string,
    listId: string,
    boardId: string,
    text: string,
    commentId: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(updateComment({ commentId, text }));

        submitCall = submitCall.then(() =>
            axios.put(`${baseUrl}/${boardId}/${listId}/${cardId}/${commentId}`, { text })
        );
        await submitCall;
    } catch (error: any) {
        dispatch(
            openAlert({
                message: error?.response?.data?.errMessage ?? error.message,
                severity: 'error',
            })
        );
    }
};

export const commentDelete = async (
    cardId: string,
    listId: string,
    boardId: string,
    commentId: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(deleteComment(commentId));

        submitCall = submitCall.then(() =>
            axios.delete(`${baseUrl}/${boardId}/${listId}/${cardId}/${commentId}`)
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const memberAdd = async (
    cardId: string,
    listId: string,
    boardId: string,
    memberId: string,
    memberName: string,
    memberColor: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(addMember({ memberId, memberName, memberColor }));
        dispatch(updateMemberOfCard({ listId, cardId, memberId, memberName, memberColor }));

        submitCall = submitCall.then(() =>
            axios.post(`${baseUrl}/${boardId}/${listId}/${cardId}/add-member`, { memberId })
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const memberDelete = async (
    cardId: string,
    listId: string,
    boardId: string,
    memberId: string,
    memberName: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(deleteMember({ memberId }));
        dispatch(deleteMemberOfCard({ listId, cardId, memberId }));

        submitCall = submitCall.then(() =>
            axios.delete(`${baseUrl}/${boardId}/${listId}/${cardId}/${memberId}/delete-member`)
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const labelCreate = async (
    cardId: string,
    listId: string,
    boardId: string,
    text: string,
    color: string,
    backColor: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(createLabel({ _id: 'notUpdated', text, color, backColor, selected: true }));

        let response: any;
        submitCall = submitCall.then(() =>
            axios
                .post(`${baseUrl}/${boardId}/${listId}/${cardId}/create-label`, { text, color, backColor })
                .then((res) => {
                    response = res;
                })
        );
        await submitCall;

        dispatch(updateCreatedLabelId(response.data.labelId));
        dispatch(
            createLabelForCard({
                listId,
                cardId,
                _id: response.data.labelId,
                text,
                color,
                backColor,
                selected: true,
            })
        );
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const labelUpdate = async (
    cardId: string,
    listId: string,
    boardId: string,
    labelId: string,
    label: { text: string; color: string; backColor: string },
    dispatch: AppDispatch
) => {
    try {
        dispatch(updateLabel({ labelId, text: label.text, color: label.color, backColor: label.backColor }));
        dispatch(
            updateLabelOfCard({
                listId,
                cardId,
                labelId,
                text: label.text,
                color: label.color,
                backColor: label.backColor,
            })
        );

        submitCall = submitCall.then(() =>
            axios.put(`${baseUrl}/${boardId}/${listId}/${cardId}/${labelId}/update-label`, label)
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const labelDelete = async (
    cardId: string,
    listId: string,
    boardId: string,
    labelId: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(deleteLabel(labelId));
        dispatch(deleteLabelOfCard({ listId, cardId, labelId }));

        submitCall = submitCall.then(() =>
            axios.delete(`${baseUrl}/${boardId}/${listId}/${cardId}/${labelId}/delete-label`)
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const labelUpdateSelection = async (
    cardId: string,
    listId: string,
    boardId: string,
    labelId: string,
    selected: boolean,
    dispatch: AppDispatch
) => {
    try {
        dispatch(updateLabelSelection({ labelId, selected }));
        dispatch(updateLabelSelectionOfCard({ listId, cardId, labelId, selected }));

        submitCall = submitCall.then(() =>
            axios.put(`${baseUrl}/${boardId}/${listId}/${cardId}/${labelId}/update-label-selection`, { selected })
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const checklistCreate = async (
    cardId: string,
    listId: string,
    boardId: string,
    title: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(createChecklist({ _id: 'notUpdated', title }));

        let response: any;
        submitCall = submitCall.then(() =>
            axios
                .post(`${baseUrl}/${boardId}/${listId}/${cardId}/create-checklist`, { title })
                .then((res) => {
                    response = res;
                })
        );
        await submitCall;

        dispatch(updateCreatedChecklist(response.data.checklistId));
        dispatch(createChecklistForCard({ listId, cardId, _id: response.data.checklistId, title }));
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const checklistDelete = async (
    cardId: string,
    listId: string,
    boardId: string,
    checklistId: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(deleteChecklist(checklistId));
        dispatch(deleteChecklistOfCard({ listId, cardId, checklistId }));

        submitCall = submitCall.then(() =>
            axios.delete(`${baseUrl}/${boardId}/${listId}/${cardId}/${checklistId}/delete-checklist`)
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const checklistItemAdd = async (
    cardId: string,
    listId: string,
    boardId: string,
    checklistId: string,
    text: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(addChecklistItem({ checklistId, _id: 'notUpdated', text }));

        let response: any;
        submitCall = submitCall.then(() =>
            axios
                .post(`${baseUrl}/${boardId}/${listId}/${cardId}/${checklistId}/add-checklist-item`, { text })
                .then((res) => {
                    response = res;
                })
        );
        await submitCall;

        dispatch(updateAddedChecklistItemId({ checklistId, checklistItemId: response.data.checklistItemId }));
        dispatch(
            addChecklistItemForCard({
                listId,
                cardId,
                checklistId,
                _id: response.data.checklistItemId,
                text,
            })
        );
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const checklistItemCompletedSet = async (
    cardId: string,
    listId: string,
    boardId: string,
    checklistId: string,
    checklistItemId: string,
    completed: boolean,
    dispatch: AppDispatch
) => {
    try {
        dispatch(setChecklistItemCompleted({ checklistId, checklistItemId, completed }));
        dispatch(setChecklistItemCompletedOfCard({ listId, cardId, checklistId, checklistItemId, completed }));

        submitCall = submitCall.then(() =>
            axios.put(
                `${baseUrl}/${boardId}/${listId}/${cardId}/${checklistId}/${checklistItemId}/set-checklist-item-completed`,
                { completed }
            )
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const checklistItemTextSet = async (
    cardId: string,
    listId: string,
    boardId: string,
    checklistId: string,
    checklistItemId: string,
    text: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(setChecklistItemText({ checklistId, checklistItemId, text }));
        dispatch(setChecklistItemTextOfCard({ listId, cardId, checklistId, checklistItemId, text }));

        submitCall = submitCall.then(() =>
            axios.put(
                `${baseUrl}/${boardId}/${listId}/${cardId}/${checklistId}/${checklistItemId}/set-checklist-item-text`,
                { text }
            )
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const checklistItemDelete = async (
    cardId: string,
    listId: string,
    boardId: string,
    checklistId: string,
    checklistItemId: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(deleteChecklistItem({ checklistId, checklistItemId }));
        dispatch(deleteChecklistItemOfCard({ listId, cardId, checklistId, checklistItemId }));

        submitCall = submitCall.then(() =>
            axios.delete(
                `${baseUrl}/${boardId}/${listId}/${cardId}/${checklistId}/${checklistItemId}/delete-checklist-item`
            )
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};
export const startDueDatesUpdate = async (
    cardId: string,
    listId: string,
    boardId: string,
    startDate: string | null,
    dueDate: string | null,
    dueTime: string | null,
    dispatch: AppDispatch
) => {
    try {
        dispatch(updateStartDueDates({ startDate, dueDate, dueTime }));
        dispatch(updateStartDueDatesOfCard({ listId, cardId, startDate, dueDate, dueTime }));

        submitCall = submitCall.then(() =>
            axios.put(`${baseUrl}/${boardId}/${listId}/${cardId}/update-dates`, {
                startDate,
                dueDate,
                dueTime,
            })
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const dateCompletedUpdate = async (
    cardId: string,
    listId: string,
    boardId: string,
    completed: boolean,
    dispatch: AppDispatch
) => {
    try {
        dispatch(updateDateCompleted(completed));
        dispatch(updateDateCompletedOfCard({ listId, cardId, completed }));

        submitCall = submitCall.then(() =>
            axios.put(`${baseUrl}/${boardId}/${listId}/${cardId}/update-date-completed`, { completed })
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const attachmentAdd = async (
    cardId: string,
    listId: string,
    boardId: string,
    link: string,
    name: string,
    dispatch: AppDispatch
) => {
    try {
        const now = new Date().toISOString();
        dispatch(addAttachment({ link, name, _id: 'notUpdated', date: now }));

        let response: any;
        submitCall = submitCall.then(() =>
            axios
                .post(`${baseUrl}/${boardId}/${listId}/${cardId}/add-attachment`, { link, name })
                .then((res) => {
                    response = res;
                })
        );
        await submitCall;

        dispatch(updateAddedAttachmentId(response.data.attachmentId));
        dispatch(
            addAttachmentForCard({
                listId,
                cardId,
                link,
                name,
                _id: response.data.attachmentId,
                date: now,
            })
        );
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const attachmentDelete = async (
    cardId: string,
    listId: string,
    boardId: string,
    attachmentId: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(deleteAttachment(attachmentId));
        dispatch(deleteAttachmentOfCard({ listId, cardId, attachmentId }));

        submitCall = submitCall.then(() =>
            axios.delete(`${baseUrl}/${boardId}/${listId}/${cardId}/${attachmentId}/delete-attachment`)
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const attachmentUpdate = async (
    cardId: string,
    listId: string,
    boardId: string,
    attachmentId: string,
    link: string,
    name: string,
    dispatch: AppDispatch
) => {
    try {
        dispatch(updateAttachment({ attachmentId, link, name }));

        submitCall = submitCall.then(() =>
            axios.put(`${baseUrl}/${boardId}/${listId}/${cardId}/${attachmentId}/update-attachment`, {
                link,
                name,
            })
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};

export const coverUpdate = async (
    cardId: string,
    listId: string,
    boardId: string,
    color: string,
    isSizeOne: boolean,
    dispatch: AppDispatch
) => {
    try {
        dispatch(updateCover({ color, isSizeOne }));
        dispatch(updateCoverOfCard({ listId, cardId, color, isSizeOne }));

        submitCall = submitCall.then(() =>
            axios.put(`${baseUrl}/${boardId}/${listId}/${cardId}/update-cover`, {
                color,
                isSizeOne,
            })
        );
        await submitCall;
    } catch (error: any) {
        dispatch(openAlert({ message: error?.response?.data?.errMessage ?? error.message, severity: 'error' }));
    }
};