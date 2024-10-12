import { useRef, useState } from "react"; 
import '../stylesheets/Sign.css';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Footer from "../components/Footer";

const Login = () => {
    const navigate = useNavigate();
    const [showPasssword, setShowPassword] = useState(false);
    const [isValid, setIsValid] = useState();

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
        try {
            // Simulate successful login by setting a mock token and user ID
            const mockToken = "mocked-jwt-token-for-testing"; // Replace with real token after testing
            const mockUserId = "mocked-user-id"; // Replace with actual user ID after testing

            // Set token and userId in cookies for later use
            Cookies.set('token', mockToken);
            Cookies.set('userId', mockUserId);

            // Navigate to the overview page after "successful login"
            navigate(`/overview`);
        } catch (error) {
            alert("An error occurred during login. Please try again.");
        }
    };

    const handlePasswordVisibility = () => {
        setShowPassword(!showPasssword);
    };

    return (
        <>
            <main className='auth'>
                <h1>Hey there! <br /> Welcome Back</h1>

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
                            <input type={showPasssword ? 'text' : 'password'}
                                placeholder='Enter Your Password'
                                name='password'
                                onChange={handleChange}
                                required
                            />
                            <i className='auth__icon' onClick={handlePasswordVisibility}>
                                {showPasssword ? <FaEyeSlash /> : <FaEye />}
                            </i>
                        </span>
                    </div>
                    <button type='submit' className='auth__btn'>Log in</button>
                </form>

                <p className='account-condition'>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
            </main>
            <Footer />
        </>
    );
};

export default Login;
