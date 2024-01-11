interface IFormCheckboxProps {
  label: string;
  value: boolean;
  handleChange: (value: boolean) => void;
}

const FormCheckbox: React.FC<IFormCheckboxProps> = ({
  label,
  value,
  handleChange,
}) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer justify-start gap-2">
        <input
          className="checkbox checkbox-primary"
          type="checkbox"
          checked={value}
          onChange={() => handleChange(!value)}
        />
        <span className="label-text">{label}</span>
      </label>
    </div>
  );
};

export default FormCheckbox;
