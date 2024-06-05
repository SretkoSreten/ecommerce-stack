import * as React from "react";
import { FieldProps } from "formik";

export const InputField: React.FC<
    FieldProps<any> & {
        label?: string;
        useNumberComponent?: boolean;
    }
> = ({
    field: { onChange, ...field },
    form,
    label,
    useNumberComponent = false,
    ...props
}) => {
        return (
            <div>
                <input
                    {...field}
                    {...props}
                    onChange={onChange}
                />
            </div>
        );
    };