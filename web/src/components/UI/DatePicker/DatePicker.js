import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import "./DatePicker.css";

export const DatePicker = ({ date, onChange, placeholder }) => (
  <ReactDatePicker
    className="form-control"
    selected={date}
    placeholder={placeholder}
    onChange={(date) => onChange(date)}
    dateFormat="MMMM d, yyyy h:mm aa"
    locale="en-GB"
  />
);
