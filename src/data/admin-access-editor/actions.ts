/**
 * Internal dependencies.
 */

import { IResponse } from '@/interfaces';
import { IForm, IFormData, IItem } from '@/interfaces/admin-access-editor';
import { endpoint } from './endpoint';
import { ACTION_TYPES } from './types';

const {
    SET_IS_LOADING,
    SET_IS_SAVING,
    SET_IS_DELETING,
    SET_CURRENT_PAGE,
    SET_PER_PAGE,
    GET_ITEMS,
    SET_TOTAL_ITEMS,
    SET_TOTAL_PAGES,
    GET_CURRENT_ITEM,
    GET_SELECTED_ITEMS,
    SET_FORM,
    SET_FORM_DATA,
    SET_EXPAND_MENU,
    SET_FILTER,
    SET_ERROR,
    API_ADD,
    API_UPDATE,
    API_DELETE,
    API_GET,
} = ACTION_TYPES;

const actions = {
    setFormData(form_data: IFormData) {
        return {
            type: SET_FORM_DATA,
            form_data,
        };
    },

    setForm(form: IForm) {
        return {
            type: SET_FORM,
            form,
        };
    },

    setExpandMenu(expandMenu: null | string) {
        return {
            type: SET_EXPAND_MENU,
            expandMenu,
        };
    },

    setIsLoading(isLoading: boolean) {
        return {
            type: SET_IS_LOADING,
            isLoading,
        };
    },

    setIsSaving(isSaving: boolean) {
        return {
            type: SET_IS_SAVING,
            isSaving,
        };
    },

    setIsDeleting(isDeleting: boolean) {
        return {
            type: SET_IS_DELETING,
            isDeleting,
        };
    },

    setCurrentPage(currentPage: number) {
        return {
            type: SET_CURRENT_PAGE,
            currentPage,
        };
    },

    setPerPage(perPage: number) {
        return {
            type: SET_PER_PAGE,
            perPage,
        };
    },

    setItems(items: Array<IItem>) {
        return {
            type: GET_ITEMS,
            items,
        };
    },

    setCurrentItem(currentItem: IItem) {
        return {
            type: GET_CURRENT_ITEM,
            currentItem,
        };
    },

    seSelectedItems(selectedItems: IItem) {
        return {
            type: GET_SELECTED_ITEMS,
            selectedItems,
        };
    },

    *saveItem(access_type: string, payload: IItem) {
        yield actions.setIsSaving(true);

        try {
            let response: IResponse = {};
            response = yield {
                type: API_ADD,
                access_type,
                payload,
            };

            if (response) {
                yield actions.setIsSaving(false);
            }
        } catch (error) {
            yield actions.setIsSaving(false);
        }
    },

    *updateItem(access_type: string, payload: IItem) {
        yield actions.setIsSaving(true);

        try {
            let response: IResponse = {};
            response = yield {
                type: API_UPDATE,
                access_type,
                payload,
            };

            if (response) {
                yield actions.setIsSaving(false);
            }
        } catch (error) {
            yield actions.setIsSaving(false);
        }
    },

    setTotalItems(totalItems: number) {
        return {
            type: SET_TOTAL_ITEMS,
            totalItems,
        };
    },

    setTotalPages(totalPages: number) {
        return {
            type: SET_TOTAL_PAGES,
            totalPages,
        };
    },

    apiGet(path: string) {
        return {
            type: API_GET,
            path,
        };
    },

    *deleteItems(payload: Array<number>) {
        yield actions.setIsDeleting(true);

        try {
            const responseDeleteItems: IResponse = yield {
                type: API_DELETE,
                payload,
            };

            if (responseDeleteItems?.total > 0) {
                yield actions.setFilters({});
            }

            yield actions.setIsDeleting(false);
        } catch (error) {
            yield actions.setIsDeleting(false);
        }
    },

    *setFilters(type: string, filters = {}) {
        yield actions.setIsLoading(true);
        yield actions.setFilterObject(filters);

        const queryParam = new URLSearchParams(
            filters as URLSearchParams,
        ).toString();

        const path = `${endpoint}/${type}?${queryParam}`;
        const response: IResponse = yield actions.apiGet(path);

        let totalItems = 0;
        let totalPages = 0;

        if (response.success) {
            const data = response.data;
            totalItems = data.total_items;
            totalPages = data.total_pages;

            yield actions.setItems(data.items);
            yield actions.setTotalPages(totalPages);
            yield actions.setTotalItems(totalItems);
        }

        return actions.setIsLoading(false);
    },

    setFilterObject(filters: object) {
        return {
            type: SET_FILTER,
            filters,
        };
    },

    setErrors(errors: object) {
        return {
            type: SET_ERROR,
            errors,
        };
    },
};

export default actions;
