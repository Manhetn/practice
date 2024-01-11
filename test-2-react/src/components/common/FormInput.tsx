interface IFormInputProps {
  label: string;
  value: string;
  errorMessage?: string | null;
  placeholder?: string;
  handleChange: (value: string) => void;
}

const FormInput: React.FC<IFormInputProps> = ({
  label,
  value,
  placeholder = '',
  errorMessage = null,
  handleChange,
}) => {
  return (
    <label className="form-control">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className="input"
        value={value}
        onChange={(event) => handleChange(event.target.value)}
      />
      {errorMessage && (
        <span className="text-xs text-red-500 flex items-center mt-4">
          {errorMessage}
        </span>
      )}
    </label>
  );
};

export default FormInput;
