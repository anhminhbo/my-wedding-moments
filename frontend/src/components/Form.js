import React, {useEffect, useState} from 'react'
import '../style/form.css'

const Form = ({ id, title, fields, handleClose, handleSubmit }) => {
    const [formData, setFormData] = useState({});
  
    // Function to handle form field changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    // Function to handle form submission
    const processSubmit = (e, handleSubmit) => {
      e.preventDefault();
      // Do something with the submitted data
      handleSubmit(formData);
    };

    return (
      <form style={{visibility: "hidden", opacity: "0"}} id={id} className="form-outer" onSubmit={(e) => processSubmit(e, handleSubmit)}>
      <div className="form">
        <div className="form-header">
            <h1 class="form-title">
                {title}
            </h1>
            <svg className="bi bi-x form-close-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16"
                onClick={() => handleClose(id)}
            >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path>
            </svg>
        </div>
        <div className="form-input">
            {fields.map((field) => (
                <>
                    <label htmlFor={field.name}>{field.label}</label>
                    <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={fields.defaultValue}
                    onChange={handleChange}
                    required={field.required}
                    key={field.name}
                    defaultValue={fields.defaultValue}
                    />
                </>
            ))}
            <input type="submit" value="Submit" />
        </div>
      </div>
      </form>
    );
  };

export default Form