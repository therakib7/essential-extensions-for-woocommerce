/**
 * Internal dependencies.
 */
import { ACTION_TYPES } from './types';
import { defaultState } from './default-state';

const { SET_IS_LOADING, SET_IS_SAVING, SET_ADDONS, SET_FORM, SET_ERROR } =
    ACTION_TYPES;

const reducer = (state = defaultState, action: any) => {
    switch (action.type) {
        case SET_FORM:
            return {
                ...state,
                form: action.form,
            };

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading,
            };

        case SET_IS_SAVING:
            return {
                ...state,
                isSaving: action.isSaving,
            };

        case SET_ADDONS:
            return {
                ...state,
                extensions: action.extensions,
            };

        case SET_ERROR:
            return {
                ...state,
                errors: action.errors,
            };
    }

    return state;
};

export default reducer;
