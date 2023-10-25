import React, { useState } from 'react';
import '../style/reset.css';
import '../style/register.css';
import { ReactComponent as Banner } from '../img/register/4486335.svg';
import lazlogo from '../img/register/lazlogonotext.png';

const Register = () => {
  const [passwordType, setPasswordType] = useState('password');

  const togglePass = () => {
    setPasswordType(prevType => (prevType === 'password' ? 'text' : 'password'));
  };
  return (
    <div id="main_index">
        <div class="container">
            <div class="contents">
                <div class="images">
                    <div class="logo">
                        <a href="#">
                        <img src={lazlogo} alt="lazlogo"/></a>
                        <h3 class="category">
                            <a href="/customer/register" id="customer"><span>Customer</span></a>
                            |
                            <a href="/vendor/register" id="vendor">Vendor</a>
                            |
                            <a href="/shipper/register" id="shipper">
                                Shipper
                            </a>
                        </h3>
                    </div>
                    <div>
                        <Banner />
                    </div>
                </div>

                <form action="#" method="post" id="profile-form" enctype="multipart/form-data">
                    <div class="form_title">
                        <h2>Create an account</h2>
                    </div>
                    <div class="contact_form">
                        <div class="input_box input username">
                            <label>Username </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder=""
                                pattern="^[a-zA-Z0-9]{8,15}$"
                                autofocus
                                title="contains only letters (lower and upper case) and digits, has a length from 8 to 15 characters"
                                required
                            />
                        </div>

                        <div class="input_box input name">
                            <label>Full name </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder=""
                                title="Please enter your name, minimum 5 charaters long"
                                required
                            />
                        </div>

                        <div class="input_box input email">
                            <label>Email address </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                pattern=".{5,}"
                                title="enter your email address"
                                placeholder=""
                                required
                            />
                        </div>

                        <div class="input_box input address">
                            <label>Address </label>
                            <input
                                type="text"
                                name="address"
                                id="address"
                                placeholder=""
                                pattern=".{5,}"
                                title="Please enter your address, minimum 5 charaters long"
                                required
                            />
                        </div>

                        <div class="input_box input password">
                            <label>Set password </label>
                            <div class="password">
                                <input
                                    id="password"
                                    type={passwordType}
                                    name="password"
                                    placeholder=""
                                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,20}"
                                    title="Must contain at least one number, uppercase, lowercase letter, one special charater (!@#$%^&*), and length from 8 to 20 charaters"
                                    required
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" id="togglePassword" className={passwordType === 'password' ? "bi bi-eye-slash-fill" : "bi bi-eye"} viewBox="0 0 16 16" onClick={togglePass}>
                                    {passwordType === 'password' ? (
                                        <>
                                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z"/>
                                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z"/>
                                        </>
                                        ) : (
                                        <>
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                                        </>
                                    )}
                                </svg>
                            </div>
                        </div>

                        <div class="input_box terms">
                            <div class="checkbox_option">
                                <div className='term-of-use'>
                                    <input
                                        type="checkbox"
                                        class="checkbox"
                                        name="terms"
                                        id="terms"
                                        title="Check this box if you agree to out terms and conditions"
                                        required
                                    />
                                    I have read and agree to the <a className='inline-link'>terms and conditions</a>
                                </div>
                            </div>
                        </div>

                        <input
                            type="submit"
                            id="submit"
                            className='btn1'
                            value="Register"
                            title="register account"
                        />

                        <p id="login">
                            Already have an account? <a href="/login" className='inline-link'>Login</a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register