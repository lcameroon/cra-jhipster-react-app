import './ValidatedForm.css';

import { IonInput, IonCheckbox, IonSelect, IonSelectOption, IonTextarea, IonItem } from '@ionic/react';
import { isEmpty } from 'lodash';
import React, { ReactElement, useEffect, FormEventHandler } from 'react';
import {
  DefaultValues,
  FieldError,
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormRegister,
  UseFormSetValue,
  ValidationMode,
} from 'react-hook-form';

export interface ValidatedFormProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: DefaultValues<FieldValues>;
  mode?: keyof ValidationMode;
  className?: string;
  [key: string]: any;
}

export interface SelectOption {
  label: string;
  id: string;
}

// This types should come from Ionfron, so this is a temporary workaround.
type TextFieldType = 'email' | 'password' | 'tel' | 'text' | 'url';
type TEXT_FIELD_INPUTMODE = 'email' | 'text' | 'tel' | 'url' | 'numeric' | 'decimal';

/**
 * A wrapper for simple validated forms using Reactstrap Form and React-hook-form.
 * The validated fields/inputs must be direct children of the form.
 * This components injects methods and values from react-hook-form's `useForm` hook into the ValidatedField/ValidatedInput components
 * For complex use cases or for nested children, use Reactstrap form elements
 * or ValidatedField or ValidatedInput and pass methods and values from react-hook-form's `useForm` hook
 * directly as props
 *
 * @param ValidatedFormProps
 * @returns JSX.Element
 */
export const ValidatedForm = ({
  defaultValues,
  children,
  onSubmit,
  mode,
  ...rest
}: ValidatedFormProps): JSX.Element => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm({ mode: mode || 'onTouched', defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} {...rest}>
      {React.Children.map(children as any, (child: ReactElement) => {
        const type = child?.type as any;
        const isValidated = type && child?.props?.name && ['ValidatedField'].includes(type.displayName);

        if (isValidated) {
          const childName = child.props.name;
          const elem = {
            ...child.props,
            register: child.props.register || register,
            error: child.props.error || errors[childName],
            isTouched: typeof child.props.isTouched === 'undefined' ? touchedFields[childName] : child.props.isTouched,
            isDirty: typeof child.props.isDirty === 'undefined' ? dirtyFields[childName] : child.props.isDirty,
            key: childName,
            setValue: typeof child.props.setValue === 'undefined' ? setValue : child.props.setValue,
          };
          return React.createElement(type, { ...elem });
        }
        return child;
      })}
    </form>
  );
};

ValidatedForm.displayName = 'ValidatedForm';

export interface ValidatedFieldProps extends React.HTMLProps<HTMLInputElement> {
  // label for the field
  label?: string;
  // field is checkbox.
  check?: boolean;
  // field is textarea.
  textarea?: boolean;
  rows?: number;
  // css class for the input element
  inputClass?: string;

  options?: SelectOption[];
  // name of the component, also used for validation
  name: string;
  // register function from react-hook-form
  register?: UseFormRegister<FieldValues>;
  // error object from react-hook-form for the field, errors[fieldsName]
  error?: FieldError;
  errorText?: FieldError;
  // isTouched from react-hook-form for the field, touchedFields[fieldsName]
  isTouched?: boolean;
  // isDirty from react-hook-form for the field, dirtyFields[fieldsName]
  isDirty?: boolean;
  // validation rules for react-hook-form register function
  validate?: RegisterOptions;
  // value for the input element
  value?: any;
  // default value for the Input component, not needed if defaultValues for ValidatedForm is set
  defaultValue?: string | number | string[];

  // set value function from react-hook-forms
  setValue?: UseFormSetValue<{
    [x: string]: any;
  }>;
  onBlur?: React.FocusEventHandler<HTMLElement>;
  onChange?: ((e: Event) => unknown) & FormEventHandler<HTMLElement>;
  type?: TextFieldType;
  inputMode?: TEXT_FIELD_INPUTMODE;
}

/**
 * A utility wrapper over Reactstrap FormGroup + Label + ValidatedInput
 * that uses react-hook-form data to show error message and error/validated styles.
 * This component can be used with ValidatedForm
 *
 * @param ValidatedFieldProps
 * @returns JSX.Element
 */
export const ValidatedField = ({
  name,
  id,
  disabled,
  className,
  inputClass,
  check,
  textarea,
  rows,
  options,
  register,
  label,
  placeholder,
  onChange,
  onBlur,
  type,
  inputMode,
  validate,
  setValue,
  error,
  isTouched,
  isDirty,
  hidden,
  required,
  readOnly,
  ...attributes
}: ValidatedFieldProps): JSX.Element => {
  let InputElement;

  if (check) {
    InputElement = IonCheckbox;
  } else if (options) {
    InputElement = IonSelect;
  } else if (textarea) {
    InputElement = IonTextarea;
  } else {
    InputElement = IonInput;
  }

  const isTextField = !check && !options;

  const selectOptions = options?.map((option) => (
    <IonSelectOption value={option.id} key={option.id}>
      {option.label}
    </IonSelectOption>
  ));

  const renderInputElement = () => {
    if (!register) {
      return (
        <InputElement
          name={name}
          id={id || name}
          label={label}
          className={inputClass}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
          inputMode={inputMode}
          required={required}
          readOnly={readOnly}
        >
          {check && label}
          {options && selectOptions}
        </InputElement>
      );
    }

    className = className || '';
    className = isTouched ? `${className} is-touched` : className;
    className = isDirty ? `${className} is-dirty` : className;
    className = !!error ? `${className} is-invalid` : className;
    className = isTouched && !error ? `${className} is-valid` : className;

    const { name: registeredName, onBlur: onBlurValidate, onChange: onChangeValidate, ref } = register(name, validate);

    return (
      <InputElement
        mode="md"
        name={registeredName}
        id={id || name}
        ref={ref}
        label={label}
        type={type}
        inputMode={inputMode}
        placeholder={placeholder}
        fill="outline"
        className={inputClass}
        required={required}
        readOnly={readOnly}
        onIonChange={(e) => {
          void onChangeValidate(e);
          onChange && onChange(e);
          check && setValue && setValue(name, !!e.target?.checked);
        }}
        onBlur={(e) => {
          void onBlurValidate(e);
          onBlur && onBlur(e);
        }}
        valid={isTouched && !error}
        invalid={!!error}
        errorText={error?.message}
        {...(isTextField ? { labelPlacement: 'floating' } : {})}
        {...(check ? { labelPlacement: 'end' } : {})}
        {...(textarea && rows ? { rows } : {})}
      >
        {check && label}
        {options && selectOptions}
      </InputElement>
    );
  };

  return (
    <div className={`ion-padding-bottom ${className || ''}`} hidden={hidden}>
      {renderInputElement()}
    </div>
  );
};

ValidatedField.displayName = 'ValidatedField';

const EMAIL_REGEXP =
  /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

export function isEmail(value) {
  if (isEmpty(value)) return true;

  return EMAIL_REGEXP.test(value);
}
