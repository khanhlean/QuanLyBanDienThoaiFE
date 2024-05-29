import '../css/signin.css';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Swal from 'sweetalert';

import API from '../services/api';
import Header from './Header';

const Signin = () => {
    const [SDT, setPhone] = useState('');
    const [Password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handlePhoneChange = (event) => {
        setPhone(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { SDT, Password };
        API.post('/taikhoan/dangnhap', data)
            .then((response) => {
                const token = response.data.token;
                const MaKH = response.data.MaKH;
                const SDT = response.data.SDT;
                const MaQuyen = response.data.MaQuyen;

                localStorage.setItem('token', token);
                localStorage.setItem('MaKH', MaKH);
                localStorage.setItem('SDT', SDT);
                localStorage.setItem('MaQuyen', MaQuyen);

                window.location.href = '/';
            })
            .catch((error) => {
                // Xử lý lỗi ở đây
                if (error.response) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage('Đã có lỗi xảy ra trong quá trình đăng nhập!');
                }
            });
    };

    return (
        <div class="form-account">
            <div class="header-color"></div>
            <Header />
            <div class="form">
                <div class="account-container">
                    <h1 class="h1-account">Đăng nhập</h1>
                    <p class="subtitle-container"></p>
                </div>
                <div class="profile">
                    <div class="mw profile-container">
                        <div class="info-blockform">
                            <form onSubmit={handleSubmit}>
                                {errorMessage && <div class="error">{errorMessage}</div>}

                                <div>
                                    <label class="label-account" htmlFor="SDT">
                                        Số điện thoại/ Email
                                    </label>
                                    <input
                                        class="input-account"
                                        type="text"
                                        placeholder="Số điện thoại/ Email"
                                        id="phone"
                                        value={SDT}
                                        onChange={handlePhoneChange}
                                        required
                                    />
                                </div>

                                <div>
                                    <label class="label-account" htmlFor="Password">
                                        Mật khẩu
                                    </label>
                                    <div className="password-input-container">
                                        <input
                                            class="input-account"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="*******"
                                            id="password"
                                            value={Password}
                                            onChange={handlePasswordChange}
                                            required
                                        />
                                        {/* Icon ẩn/hiện password */}
                                        {showPassword ? (
                                            <VisibilityOffIcon onClick={handleShowPassword} />
                                        ) : (
                                            <VisibilityIcon onClick={handleShowPassword} />
                                        )}
                                    </div>
                                </div>
                                <div class="signinup-now">
                                    <label class="label-acc">Không có tài khoản? </label>
                                    <Link to="/signup" class="link-signinup-now">
                                        Đăng ký
                                    </Link>
                                </div>
                                <div class="btn-access">
                                    <button class="btn-account" type="submit">
                                        Đăng nhập
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signin;
