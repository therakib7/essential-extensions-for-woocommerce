/**
 * External dependencies.
 */
import { useDispatch, useSelect } from '@wordpress/data';
import { scroller } from 'react-scroll';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import extensionsStore from '@/data/extensions';
import { prepareForSubmit } from '@/data/extensions/utils';
import Button from '@/components/button';

export default function Submit() {
    const dispatch = useDispatch();

    const extensions = useSelect((select) => select(extensionsStore).getExtensions(), []);

    const isSaving: boolean = useSelect(
        (select) => select(extensionsStore).getIsSaving(),
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
            dispatch(extensionsStore).setErrors(errors);

            scroller.scrollTo(`field-${fields[0]}`, {
                duration: 800,
                delay: 0,
                offset: -150,
                smooth: 'easeInOutQuart',
            });

            return;
        }

        // Submit
        dispatch(extensionsStore)
            .saveExtensions({ extensions: prepareForSubmit(extensions) })
            .then(() => {
                toast.success(
                    __('Extensions has been saved successfully.', 'essential-extensions-for-woocommerce'),
                );
                setTimeout(() => {
                    window.location.reload();
                }, 1500); // 1.5 seconds delay
            })
            .catch((error: any) => {
                toast.error(error.message);
            });
    };

    return (
        <>
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
