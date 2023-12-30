import React from 'react';
import '../Notepad/Notepad.css';

const Notepad = () => {
  return (
    <div className="notepadContainer">
      <h2>Requirements</h2>
      <hr></hr>
      <ul>
        <li>
            Name: This field would accept only alphabets.
        </li>
        <li>
            Email: This field would only validate for a proper email format (example@example.com).
        </li>
        <li>
            Password: This field would only validate for a strong password (minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number). 
        </li>
        <li>
            It would display an error if any of the field is empty or does not meet the criteria.
        </li>
        <li>
            On successfull submission would display a success message.
        </li>
      </ul>
    </div>
  );
};

export default Notepad;