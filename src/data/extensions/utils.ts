/**
 * Internal dependencies.
 */
export const prepareForSubmit = (extensions: any) => {
    return extensions.map((extension: any) => ({
        id: extension.id,
        is_active: extension.is_active,
    }));
};
