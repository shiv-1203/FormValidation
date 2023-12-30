import React, { useState } from 'react';
import SweetAlert2 from 'react-sweetalert2';
import '../Form/FormValidation.css';
import success from '../../asserts/images/success.png';
import error from '../../asserts/images/error.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const FormValidation = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [swalProps, setSwalProps] = useState({});
    const [swalProps1, setSwalProps1] = useState({});
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [statsBool, setStatsBool] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const validateName = () => {
        const regex = /^[a-zA-Z]+$/;
        if (!formData.name.trim()) {
            return 'Name is required';
        } else if (!regex.test(formData.name)) {
            return 'Name should contain only alphabets';
        }
        return '';
    };

    const validateEmail = () => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email.trim()) {
            return 'Email is required';
        } else if (!regex.test(formData.email)) {
            return 'Invalid email format';
        }
        return '';
    };

    const validatePassword = () => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!formData.password.trim()) {
            return 'Password is required';
        } else if (!regex.test(formData.password)) {
            return 'Password should be at least 8 characters long, contain one uppercase letter, one lowercase letter, and one number';
        }
        return '';
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatsBool(true);

        const nameError = validateName();
        const emailError = validateEmail();
        const passwordError = validatePassword();

        if (nameError || emailError || passwordError) {
            setErrors({
                name: nameError,
                email: emailError,
                password: passwordError,
            });
            setSwalProps1({
                show: true,
            });
        } else {
            setSwalProps({
                show: true,
            });
            setSuccessMessage('Form submitted successfully!');
        }
    };

    const resetStatsBoolSuccess = () => {
        setStatsBool(false);
        setSuccessMessage('');
        setFormData({
            name: '',
            email: '',
            password: ''
        });

    };

    const resetStatsBoolError = () => {
        setStatsBool(false);
        setSuccessMessage('');
    };

    return (
        <div>
            <div className='NavComponent'>React Form Validation</div>
            <form className='formComponent'>
                <div className='formElement'>
                    <div className='label'>Name</div>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='formElement'>
                    <div className='label'>Email</div>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>

                <div className='formElement'>
                    <div className='label'>Password</div>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                    <span className="eye-icon" onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash/> : <FaEye />}
                    </span>
                </div>

                <div className='submit' onClick={handleSubmit}>Submit</div>
            </form>

            {statsBool && (successMessage === '' ? (
                <SweetAlert2 {...swalProps1} onConfirm={resetStatsBoolError}>
                    <div className='errorDetails'>
                        <img src={error} style={{ height: '150px', marginBottom: '20px' }} alt='error' />
                        <div style={{ marginBottom: '10px' }}>{errors.name}</div>
                        <div style={{ marginBottom: '10px' }}>{errors.email}</div>
                        <div style={{ marginBottom: '10px' }}>{errors.password}</div>
                    </div>
                </SweetAlert2>
            ) :
                (
                    <SweetAlert2 {...swalProps} onConfirm={resetStatsBoolSuccess}>
                        <div>
                            <img src={success} style={{ height: '150px', marginBottom: '20px' }} alt='success' />
                            <div style={{ fontWeight: '700', fontSize: '24px' }} >{successMessage}</div>
                        </div>
                    </SweetAlert2>
                )
            )}
        </div>
    );
};

export default FormValidation;
