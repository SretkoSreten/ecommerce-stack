import * as React from "react";
import { FieldProps } from "formik";

interface SelectFieldProps extends FieldProps<any> {
  options: any;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  field: { onChange, ...field },
  form,
  options,
  ...props
}) => {
  return (
    <div>
      <select {...field} {...props} onChange={onChange}>
        {options.map((option:any) => (
          <option key={option.id} value={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};
