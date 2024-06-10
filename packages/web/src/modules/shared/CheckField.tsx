import * as React from "react";
import { FieldProps } from "formik";

export const CheckField: React.FC<
    FieldProps<any> & {
        label?: string;    }
> = ({
    field: { onChange, ...field },
    form,
    label,
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