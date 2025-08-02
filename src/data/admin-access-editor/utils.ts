/**
 * Internal dependencies.
 */
import { IItem } from '@/interfaces/admin-access-editor';

export const prepareItemForSubmit = (item: IItem) => {
    const data = {
        ...item,
    };

    return data;
};
