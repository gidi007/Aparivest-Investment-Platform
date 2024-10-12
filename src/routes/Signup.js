import { useState } from "react";
import '../stylesheets/Sign.css';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Footer from "../components/Footer";

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState();
    const [error, setError] = useState(null); // State for error messages

    // Get API URL from environment variables
    const url = process.env.REACT_APP_URL;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        e.preventDefault();
        const inputValue = e.target.value;

        if (e.target.name === 'email') {
            const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const isValidEmail = emailPattern.test(inputValue);
            setIsValid(isValidEmail);
        }

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null); // Reset error state before submission
        try {
            // Ensure URL is enclosed in backticks
            const response = await axios.post(`${url}/signup`, formData);

            if (response.status === 200) {
                alert('Sign up successful!');
                const token = response.data.token; // Adjust according to backend response
                Cookies.set('token', token);
                const userId = response.data.user.id;
                Cookies.set('userId', userId);
                navigate(`/overview`); // Ensure URL is enclosed in backticks
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response.data);
                setError(error.response.data.message || "Error during signup.");
            } else if (error.request) {
                console.error('No response from server:', error.request);
                setError("No response from server. Please try again later.");
            } else {
                console.error('Error message:', error.message);
                setError("An error occurred. Please try again.");
            }
        }
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <main className='auth'>
                <h1>Hello! <br /> Join Us Today</h1>

                <form className='auth__form' onSubmit={handleSubmit}>
                    <div className='auth__input_box'>
                        <label>Email</label>
                        <span>
                            <i className='auth__icon'><FaEnvelope /></i>
                            <input type='email'
                                name='email'
                                placeholder='Enter Your Email'
                                onChange={handleChange}
                                required
                            />
                        </span>
                    </div>
                    <br /><br />
                    <div className='auth__input_box'>
                        <label>Password</label>
                        <span>
                            <i className='auth__icon'><FaLock /></i>
                            <input type={showPassword ? 'text' : 'password'}
                                placeholder='Enter Your Password'
                                name='password'
                                onChange={handleChange}
                                required
                            />
                            <i className='auth__icon' onClick={handlePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </i>
                        </span>
                    </div>
                    <button type='submit' className='auth__btn'>Sign Up</button>
                </form>

                {/* Show error if exists */}
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <p className='account-condition'>Already have an account?  
                    <Link to={'/signin'}>Sign In</Link>
                </p>
            </main>
            <Footer />
        </>
    );
};

export default Signup;
