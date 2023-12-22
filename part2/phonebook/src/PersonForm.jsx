import React from "react";

const PersonForm = ({
  name,
  number,
  onChangeName,
  onChangeNumber,
  onSubmit,
}) => {
  return (
    <div>
      <form>
        <div>
          name: <input value={name} onChange={onChangeName} />
        </div>
        <div>
          number: <input value={number} onChange={onChangeNumber} />
        </div>
        <div>
          <button type="button" onClick={onSubmit}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
