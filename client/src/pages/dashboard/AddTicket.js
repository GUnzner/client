import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { Form } from "react-router-dom";

const AddTicket = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    category,
    title,
    text,
    urgency,
    status,
    statusOptions,
  } = useAppContext();

  const handleTicketInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!category || !title || !urgency) {
      displayAlert();
      return;
    }
  };

  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "Edit ticket" : "Add ticket"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              value={category}
              onChange={handleTicketInput}
              className="form-select"
            >
              {category.map((itemValue, index) => {
                return (
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>
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
          <div className="form-row">
            <label htmlFor="urgency" className="form-label">
              Urgency
            </label>
            <select
              name="urgency"
              value={urgency}
              onChange={handleTicketInput}
              className="form-select"
            >
              {urgency.map((itemValue, index) => {
                return (
                  <option key={index} value={itemValue}>
                    {itemValue}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddTicket;
