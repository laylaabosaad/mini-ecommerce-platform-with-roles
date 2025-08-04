function Inputs({
  htmlFor,
  type,
  name,
  title,
  defaultValue,
  step,
  min,
  inputMode,
}) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={htmlFor} className="font-medium">
        {title}
      </label>
      <input
        type={type}
        name={name}
        id={htmlFor}
        defaultValue={defaultValue}
        step={step}
        min={min}
        inputMode={inputMode}
        className="border border-gray-300 rounded px-3 py-2"
        required
      />
    </div>
  );
}
export default Inputs