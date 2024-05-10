import "./CustomInput.css";

export const CustomInput = ({
  typeProp,
  nameProp,
  placeholderProp,
  handlerProp,
  onBlurHandler,
  value,
  isDisabled,
  errorText,
  disableValidation
}) => {
  return (
    <div className="custom-input-container">
      <input
        className={
          (!disableValidation && errorText === "") ? "input-design" : "input-design input-error"
        }
        type={typeProp}
        name={nameProp}
        placeholder={placeholderProp}
        value={value}
        disabled={isDisabled}
        onChange={(e) => handlerProp(e)}
        onBlurHandler={(e) => onBlurHandler(e)}
      />
      {!disableValidation && <p className="error-message">{errorText}</p>}
    </div>
  );
};
