import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

import Header from './Header';
import Footer from './Footer';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert';

import '../css/order.css';
const VerifyPass = () => {
    const navigate = useNavigate(); // initialize navigate
    const [customer, setCustomer] = useState('');

    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            if (!token) {
                setCustomer(null);
                Swal({
                    title: 'Please Login',
                    text: '',
                    icon: 'error',
                    dangerMode: true,
                }).then(() => {
                    window.location.href = '/signin';
                });

                return;
            }
        }
        fetchData();
    }, [navigate]);

    const handleCheck = async (event) => {
        event.preventDefault();
        const passwordInput = document.getElementById('password');
        const password = passwordInput.value;
        const MaKH = localStorage.MaKH;

        console.log(MaKH);
        console.log(password);

        try {
            const response = await API.post('/taikhoan/checkmatkhautrung', {
                MaKH: MaKH,
                Password: password,
            });
            if (response.data.success) {
                Swal({
                    title: 'Password verification successful!',
                    text: '',
                    icon: 'success',
                    dangerMode: true,
                }).then(() => {
                    window.location.href = '/account/changepassword';
                });
            } else {
                Swal({
                    title: 'Password verification failed!',
                    text: response.data.message,
                    icon: 'error',
                    dangerMode: true,
                });
            }
        } catch (error) {
            Swal({
                title: 'Error',
                text: 'An error occurred while verifying the password!',
                icon: 'error',
                dangerMode: true,
            });
        }
    };

    const getCookie = (name) => {
        const cookieValue = document.cookie.match(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`);
        return cookieValue ? cookieValue.pop() : '';
    };
    const removeCookie = (name) => {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    };
    const handleLogout = () => {
        // Xóa token trong cookie
        removeCookie('token');

        // Tải lại trang
        window.location.reload();
    };
    return (
        <div class="form_watchlist">
            <Header />
            <div id="user_container">
                <div class="container pIHdXn">
                    <div class="AmWkJQ">
                        <div class="kul4+s">
                            <div class="miwGmI">
                                {customer && <div class="mC1Llc">{customer.name}</div>}
                                <div>
                                    <Link to="/account/profile" class="_78QHr1">
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 12 12"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48"
                                                fill="#9B9B9B"
                                                fill-rule="evenodd"
                                            ></path>
                                        </svg>
                                        Sửa hồ sơ
                                    </Link>
                                </div>
                            </div>

                            <div class="rhmIbk">
                                <div class="stardust-dropdown">
                                    <div class="stardust-dropdown__item-header">
                                        <Link to="/account/profile" class="+1U02e">
                                            <div class="bfikuD">
                                                <img src="https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4" />
                                            </div>
                                            <div class="DlL0zX">
                                                <span class="adF7Xs">Tài Khoản</span>
                                            </div>
                                        </Link>
                                    </div>
                                    <div class="stardust-dropdown__item-body">
                                        <div class="Yu7gVR">
                                            <Link to="/account/profile" class="FEE-3D">
                                                <span class="qyt-aY">Hồ Sơ</span>
                                            </Link>

                                            <Link to="/order" class="FEE-3D">
                                                <span class="qyt-aY">Đơn hàng</span>
                                            </Link>
                                            <Link to="/account/verify" class="FEE-3D" style={{ color: '#C09E57' }}>
                                                <span class="qyt-aY">Đổi mật khẩu</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="xMDeox">
                        <div class="profile-container">
                            <h2 class="h2-profile">Xác nhận mật khẩu</h2>
                            <div class="info-blockform">
                                <div>
                                    <label class="label-account" htmlFor="name">
                                        Mật khẩu cũ
                                    </label>
                                    <input
                                        class="input-account"
                                        type="password"
                                        placeholder="Nhập mật khẩu cũ"
                                        id="password"
                                        required
                                    />
                                </div>

                                <div class="btn-access">
                                    <button
                                        class="button button-dark js_make_appointment_btn js_ma_watch_button"
                                        onClick={handleCheck}
                                    >
                                        Kiểm tra
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default VerifyPass;
