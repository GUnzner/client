import { FormRow, FormRowSelect, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
//import { Form } from "react-router-dom";

const AddTicket = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    category,
    title,
    text,
    urgency,
    categoryOptions,
    urgencyOptions,
    handleChange,
    clearValues,
    createTicket,
  } = useAppContext();

  const handleTicketInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({ name, value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !title || !urgency) {
      displayAlert();
      return;
    }
    if (isEditing) {
      return;
    }
    createTicket();
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit ticket" : "Add ticket"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRowSelect
            name="category"
            value={category}
            handleChange={handleTicketInput}
            list={categoryOptions}
          ></FormRowSelect>
          <FormRow
            type="text"
            name="title"
            value={title}
            handleChange={handleTicketInput}
          ></FormRow>
          <FormRow
            type="text"
            name="text"
            value={text}
            handleChange={handleTicketInput}
          ></FormRow>
          <FormRowSelect
            name="urgency"
            value={urgency}
            handleChange={handleTicketInput}
            list={urgencyOptions}
          ></FormRowSelect>

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
            <button
              className="btn btn-block clear-btn"
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddTicket;
