/**
 * External dependencies.
 */
import { twMerge } from 'tailwind-merge';

interface ILabel {
    /**
     * Input level children props.
     */
    children: React.ReactNode | string;

    /**
     * Input html for attribute.
     */
    htmlFor?: string;

    /**
     * Custom Class name.
     */
    className?: string;

    /**
     * Label tooltip (if has any)
     */
    tooltip?: string | React.ReactNode | undefined;
}

export default function Label({
    children = <></>,
    htmlFor,
    className = '',
}: ILabel) {
    return (
        <label
            className={twMerge(
                `block text-black font-semibold text-[14px] !ml-0 mb-2 ${className}`,
            )}
            htmlFor={htmlFor}
        >
            {children}
        </label>
    );
}
