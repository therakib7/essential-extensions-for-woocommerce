/**
 * External dependencies.
 */
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelect } from '@wordpress/data';
import { scroller } from 'react-scroll';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import store from '@/data/admin-access-editor';
import Button from '@/components/button';
import { IForm } from '@/interfaces/admin-access-editor';

export default function Submit() {
    const navigate = useNavigate();
    const { type, id } = useParams();

    const dispatch = useDispatch();

    const form: IForm = useSelect((select) => select(store).getForm(), []);

    const isSaving: boolean = useSelect(
        (select) => select(store).getIsSaving(),
        [],
    );

    const validate = () => {
        const errors: Record<string, string> = {};

        if (!form.id) {
            if (type === 'users') {
                errors.id = __('Please Select User', 'essential-extensions-for-woocommerce');
            } else {
                errors.id = __('Please Select Role.', 'essential-extensions-for-woocommerce');
            }
        }

        return errors;
    };

    const onSubmit = () => {
        //Validate
        const errors = validate();
        const fields = Object.keys(errors);
        if (fields.length > 0) {
            dispatch(store).setErrors(errors);

            scroller.scrollTo(`field-${fields[0]}`, {
                duration: 800,
                delay: 0,
                offset: -150,
                smooth: 'easeInOutQuart',
            });

            return;
        }

        // Submit
        if ( !id ) {
            dispatch(store)
            .saveItem(type, form)
            .then(() => {
                toast.success(
                    __('Admin Access has been saved successfully.', 'essential-extensions-for-woocommerce'),
                );
                navigate(`/admin-access-editor/${type}`);
            })
            .catch((error: any) => {
                toast.error(error.message);
            });
        } else {
            dispatch(store)
            .updateItem(type, form)
            .then(() => {
                toast.success(
                    __('Admin Access has been updated successfully.', 'essential-extensions-for-woocommerce'),
                );
                navigate(`/admin-access-editor/${type}`);
            })
            .catch((error: any) => {
                toast.error(error.message);
            });
        }
    };

    let submitTitle = '';
    if ( !id ) {
        submitTitle = isSaving ? __('Saving…', 'essential-extensions-for-woocommerce') : __('Save', 'essential-extensions-for-woocommerce');
    } else {
        submitTitle = isSaving ? __('Updating…', 'essential-extensions-for-woocommerce') : __('Update', 'essential-extensions-for-woocommerce');
    }

    return (
        <>
            <Button
                text={__('Cancel', 'essential-extensions-for-woocommerce')}
                type="default"
                onClick={() => navigate(`/admin-access-editor/${type}`)}
                buttonCustomClass="mr-3"
            />

            <Button
                text={submitTitle}
                type="primary"
                icon={faCheckCircle}
                disabled={isSaving}
                onClick={onSubmit}
            />
        </>
    );
}
