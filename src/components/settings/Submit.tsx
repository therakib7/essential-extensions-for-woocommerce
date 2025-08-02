/**
 * External dependencies.
 */
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelect } from '@wordpress/data';
import { scroller } from 'react-scroll';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import { prepareFormForSubmit } from '@/data/settings/utils';
import settingsStore from '@/data/settings';
import Button from '@/components/button';

export default function Submit() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const form = useSelect((select) => select(settingsStore).getForm(), []);

    const isSaving: boolean = useSelect(
        (select) => select(settingsStore).getIsSaving(),
        [],
    );

    const validate = () => {
        const errors: Record<string, string> = {};

        /* if (!form.title.length) {
            errors.title = __('Please give a order title.', 'essential-extensions-for-woocommerce');
        } */

        return errors;
    };

    const onSubmit = () => {
        //Validate
        const errors = validate();
        const fields = Object.keys(errors);
        if (fields.length > 0) {
            dispatch(settingsStore).setErrors(errors);

            scroller.scrollTo(`field-${fields[0]}`, {
                duration: 800,
                delay: 0,
                offset: -150,
                smooth: 'easeInOutQuart',
            });

            return;
        }

        // Submit
        dispatch(settingsStore)
            .saveForm(prepareFormForSubmit(form))
            .then(() => {
                toast.success(__('Settings updated successfully.', 'essential-extensions-for-woocommerce'));
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <>
            <Button
                text={__('Cancel', 'essential-extensions-for-woocommerce')}
                type="default"
                onClick={() => navigate('/')}
                buttonCustomClass="mr-3"
            />

            <Button
                text={isSaving ? __('Saving…', 'essential-extensions-for-woocommerce') : __('Save', 'essential-extensions-for-woocommerce')}
                type="primary"
                icon={faCheckCircle}
                disabled={isSaving}
                onClick={onSubmit}
            />
        </>
    );
}
