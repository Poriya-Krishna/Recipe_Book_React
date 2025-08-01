import React from 'react';
import "../customInput/Input.scss";
import { useField } from "formik";

/**
 * Custom Input with floating label and error handling
 */
const Input = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  return (
    <div className='input-container'>
      <input
        id={props.name}
        type={props.type || "text"}
        autoComplete='off'
        aria-label={label}
        {...field}
        {...props}
        className={hasError ? "input-error" : ""}
      />
      <label
        htmlFor={props.name}
        className={!field.value ? 'label' : 'hide-label'}
      >
        {label}
      </label>
      {hasError && <div className='error'>{meta.error}</div>}
    </div>
  );
};

export default Input;
