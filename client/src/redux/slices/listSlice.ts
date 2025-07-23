import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListState } from './list/listTypes';
import * as reducers from './list/listReducers';

const initialState: ListState = {
    allLists: [],
    loadingListService: true,
};

const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers
});

export const {
    setLoading,
    successCreatingList,
    successFetchingLists,
    successDeletingList,
    deleteCard,
    successCreatingCard,
    updateCardDragDrop,
    updateListDragDrop,
    setCardTitle,
    updateListTitle,
    updateMemberOfCard,
    deleteMemberOfCard,
    updateDescriptionOfCard,
    updateLabelSelectionOfCard,
    updateLabelOfCard,
    createLabelForCard,
    deleteLabelOfCard,
    createChecklistForCard,
    deleteChecklistOfCard,
    addChecklistItemForCard,
    setChecklistItemCompletedOfCard,
    deleteChecklistItemOfCard,
    setChecklistItemTextOfCard,
    updateStartDueDatesOfCard,
    updateDateCompletedOfCard,
    addAttachmentForCard,
    deleteAttachmentOfCard,
    updateCoverOfCard,
} = listSlice.actions;

export default listSlice.reducer;
