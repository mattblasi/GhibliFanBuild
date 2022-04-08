import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import Select from 'react-select';

/**
 * Accepted Props:
 * form: 'string name / headline of form
 * fields: { name, type, required, label }
 * actions: { onSubmit(), onError() }
 */

const Form = (props) => {
  const {
    form,
    items,
    actions: { onSubmit, onError },
  } = props;
  const {
    control,
    handleSubmit,
    register,
    getValues,
    formState: { errors, isDirty, dirtyFields },
  } = useForm();

  const [values, setValues] = useState({});

  const FormLabel = ({ item: { name, label = '' } }) => (
    <label htmlFor={`${form}-${name}`}>{label ? label : name}:</label>
  );

  useEffect(() => {}, []);

  /**
   * Currently has an issue where it rerenders the entire form fields
   * each time you change the value of an input for the first time.
   * this causes a minor performance issue with rerenders. The greater
   * issue is that with the text/textarea inputs it rerenders after a
   * single character is typed.
   */

  const FormField = React.memo(({ item, field, fieldState }) => {
    const { name, type, label, options, defaultVal } = item;
    const { onChange, onBlur, ref, value } = field;
    const { error, isTouched } = fieldState;

    switch (type) {
      case 'text':
      case 'password':
      case 'email':
        return (
          <input
            key={`form-input-${name}`}
            name={name}
            id={`${form}-${name}`}
            placeholder={name}
            defaultValue={value || ''}
            type={type}
            inputRef={ref}
            onChange={(val) => onChange(val)}
            onBlur={onBlur}
          />
        );
      case 'textarea':
        return (
          <textarea
            name={name}
            id={`${form}-${name}`}
            type="text"
            value={value}
            placeholder={name}
            onChange={(val) => onChange(val)}
            onBlur={onBlur}
            inputRef={ref}
          ></textarea>
        );
      case 'select':
      case 'multiselect':
        return (
          <Select
            name={name}
            title={name}
            inputId={`${form}-${name}`}
            options={options}
            value={value}
            onBlur={onBlur}
            onChange={(val) => onChange(val)}
            isMulti={type === 'multiselect'}
            isClearable
            inputRef={ref}
          />
        );
      case 'checkbox':
        return (
          <input
            name={name}
            id={`${form}-${name}`}
            type="checkbox"
            checked={value}
            inputRef={ref}
            onChange={(val) => onChange(val)}
            onBlur={onBlur}
          />
        );
      default:
        return <div />;
    }
  });

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit, onError)}>
      {items &&
        items.map((item, index) => (
          <div
            className={`form-item form-item--${item.type}`}
            key={`form-field-${index}`}
          >
            <FormLabel item={item} />
            <Controller
              {...{
                name: item.name,
                render: (props) => <FormField {...props} item={item} />,
                rules: {},
                control: control,
              }}
            />
          </div>
        ))}
      {/* <DevTool control={control} /> */}
      <input type="submit" />
    </form>
  );
};

export default React.memo(Form);
