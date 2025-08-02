/**
 * External dependencies
 */
import { __ } from '@wordpress/i18n';
import { useParams, useNavigate } from 'react-router-dom';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';

/**
 * Internal dependencies
 */
import MenuLoading from '@/components/preloader/MenuLoading';
import { useSelect, useDispatch } from '@wordpress/data';
import adminColumnEditorStore from '@/data/admin-column-editor';
import { IColumn } from '@/interfaces/admin-column-editor';
import { defaultForm } from '@/data/admin-column-editor/default-state';
import SelectGroup from '@/components/select-group';
import Button from '@/components/button';
import Columns from './Columns';
import Form from './Form';

/**
 * ColumnEditor Component.
 *
 * Handles Columns component rendering.
 *
 * @param  props
 */
const ColumnEditor = () => {
    const { id = 'post' } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoading: boolean = useSelect(
        (select) => select(adminColumnEditorStore).getIsLoading(),
        [],
    );

    const screens = useSelect(
        (select) => select(adminColumnEditorStore).getScreens(),
        [],
    );

    const defaultColumns = useSelect(
        (select) => select(adminColumnEditorStore).getDefaultColumn(),
        [],
    );

    const editorColumns = useSelect(
        (select) => select(adminColumnEditorStore).getEditorColumn(id),
        [id],
    );

    const form = useSelect(
        (select) => select(adminColumnEditorStore).getForm(),
        [],
    );

    const handleScreenChange = (selectedId?: string) => {
        if (selectedId) {
            navigate(`/admin-column-editor/${selectedId}`);
        }
    };

    const getScreenLabelById = (id: string): string | undefined => {
        for (const screen of screens) {
            const option = screen.options.find((option) => option.value === id);
            if (option) {
                return option.label;
            }
        }
        return undefined;
    };

    const selectedColumn = useSelect(
        (select) => select(adminColumnEditorStore).getSelectedColumn(),
        [],
    );

    const handleOrderColumn = (newColumn: IColumn[]) => {
        dispatch(adminColumnEditorStore).setEditorColumns(newColumn);
    };

    const handleSelectColumn = (indexColumn: number | null) => {
        dispatch(adminColumnEditorStore).setSelectedColumn(indexColumn);
    };

    const handleOpenFormColumn = () => {
        let formData = { ...defaultForm };
        formData.label =  __('Column Name', 'essential-extensions-for-woocommerce');

        dispatch(adminColumnEditorStore).setForm(formData);
    };

    const handleCloseForm = () => {
        dispatch(adminColumnEditorStore).setForm(null);
        dispatch(adminColumnEditorStore).setSelectedColumn(null);
    };

    const handleSaveColumn = (newItem: IColumn) => {
        // Add a new main column item
        dispatch(adminColumnEditorStore).setEditorColumns([
            ...editorColumns,
            newItem as IColumn,
        ]);
        dispatch(adminColumnEditorStore).setForm(null);
    };

    const handleChangeColumn = (updatedItem: IColumn) => {
        if (selectedColumn !== null) {
			const updatedItems = [...editorColumns];
			updatedItems[selectedColumn] = updatedItem;
            dispatch(adminColumnEditorStore).setEditorColumns(updatedItems);
		}

        // Reset the editedItemIndex
        handleSelectColumn(null);
    };

    const handleHideColumn = (column: number) => {
        /* console.log(subcolumn);
		const updatedItems = [...state.items];
		updatedItems.splice(column, 1);
		dispatch({ type: 'set_items', payload: updatedItems }); */
    };

    return (
        <>
            <div className="essential-extensions-for-woocommerce-admin-column-items mx-auto">
                {isLoading ? (
                    <MenuLoading />
                ) : (
                    <>
                        <div className="mb-5 flex justify-between">
                            <div>
                                <SelectGroup
                                    groups={screens}
                                    value={id}
                                    onChange={handleScreenChange}
                                />
                            </div>
                            <div>
                                <Button
                                    text={`${__(
                                        'View',
                                        'essential-extensions-for-woocommerce',
                                    )} ${getScreenLabelById(id)}`}
                                    type="default"
                                    //onClick={() => goForm()}
                                />
                            </div>
                        </div>
                        <Columns
                            items={editorColumns}
                            onOrderChange={handleOrderColumn}
                            onSelect={handleSelectColumn}
                            onOpenForm={handleOpenFormColumn}
                            onHide={handleHideColumn}
                        />

                        {form && (
                            <Form
                                isNew
                                data={form}
                                defaultColumns={defaultColumns}
                                onSave={handleSaveColumn}
                                onClose={handleCloseForm}
                            />
                        )}

                        {!form &&
                            selectedColumn !== null &&
                            editorColumns[selectedColumn] && (
                                <Form
                                    data={editorColumns[selectedColumn]}
                                    defaultColumns={defaultColumns}
                                    onSave={handleChangeColumn}
                                    onClose={() => handleSelectColumn(null)}
                                />
                            )}
                    </>
                )}
            </div>
        </>
    );
};

export default ColumnEditor;
