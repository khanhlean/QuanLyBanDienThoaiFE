import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import urlImg from '../services/urlImg';

import Header from './Header';
import Footer from './Footer';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import LogoutIcon from '@mui/icons-material/Logout';
import Swal from 'sweetalert';

import '../css/order.css';
const Profile = () => {
    const navigate = useNavigate(); // initialize navigate
    const [customer, setCustomer] = useState('');
    useEffect(() => {
        async function fetchData() {
            const token = localStorage.getItem('token');
            if (token == null) {
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

    const handleProfileUpdate = async () => {
        const token = localStorage.getItem('token');
        const MaKH = localStorage.getItem('MaKH');
        if (!token) {
            //setCustomer(null)
        }
        try {
            // const customerData = { ...customer };
            // delete customerData.password;

            const response = await API.post(
                '/khachhang/update-thongtin-ngdung',
                {
                    MaKH: MaKH,
                    Ho: customer.Ho,
                    Ten: customer.Ten,
                    DiaChi: customer.DiaChi,
                    SDT: customer.SDT,
                    Email: customer.Email,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                },
            );

            Swal({
                title: response.data.message,
                text: '',
                icon: 'success',
                dangerMode: false,
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            setCustomer(null);
            Swal({
                title: error.message,
                text: '',
                icon: 'error',
                dangerMode: true,
            }).then(() => {
                window.location.reload();
            });
        }
    };

    return (
        <div class="form_watchlist">
            <Header />
            <div id="user_container">
                <div class="container pIHdXn">
                    <div class="AmWkJQ">
                        <div class="kul4+s">
                            <div class="miwGmI">
                                {customer && <div class="mC1Llc">{customer.Ten}</div>}
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
                                            <Link to="/account/profile" class="FEE-3D" style={{ color: '#C09E57' }}>
                                                <span class="qyt-aY">Hồ Sơ</span>
                                            </Link>

                                            <Link to="/order" class="FEE-3D">
                                                <span class="qyt-aY">Đơn hàng</span>
                                            </Link>
                                            <Link to="/account/verify" class="FEE-3D">
                                                <span class="qyt-aY">Đổi mật khẩu</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* <div class="stardust-dropdown">
                                    <div class="stardust-dropdown__item-header">
                                        <a class="+1U02e" onClick={handleLogout}>
                                            <div class="bfikuD">
                                                <LogoutIcon />
                                            </div>
                                            <div class="DlL0zX">
                                                <span class="adF7Xs">Đăng Xuất</span>
                                            </div>
                                        </a>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    <div class="xMDeox">
                        <div class="profile-container">
                            <h2 class="h2-profile">THÔNG TIN CHUNG</h2>
                            <div class="info-blockform">
                                <div>
                                    <label class="label-account" htmlFor="name">
                                        Họ
                                    </label>
                                    <input
                                        class="input-account"
                                        type="text"
                                        placeholder="Nhập Họ"
                                        id="name"
                                        value={customer?.Ho}
                                        onChange={(e) => setCustomer({ ...customer, Ho: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="name">
                                        Tên
                                    </label>
                                    <input
                                        class="input-account"
                                        type="text"
                                        placeholder="Nhập Tên"
                                        id="name"
                                        value={customer?.Ten}
                                        onChange={(e) => setCustomer({ ...customer, Ten: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="address">
                                        Địa Chỉ
                                    </label>
                                    <input
                                        class="input-account"
                                        type="text"
                                        id="address"
                                        placeholder="Nhập Địa Chỉ"
                                        value={customer?.DiaChi}
                                        onChange={(e) => setCustomer({ ...customer, DiaChi: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="phone">
                                        Số Điện Thoại
                                    </label>
                                    <input
                                        class="input-account"
                                        type="number"
                                        id="phone"
                                        placeholder="Nhập Số Điện Thoại"
                                        value={customer?.SDT}
                                        onChange={(e) => setCustomer({ ...customer, SDT: e.target.value })}
                                        required
                                    />
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="email">
                                        Email
                                    </label>
                                    <input
                                        class="input-account"
                                        type="email"
                                        placeholder="Nhập Email"
                                        id="email"
                                        value={customer?.Email}
                                        onChange={(e) => setCustomer({ ...customer, Email: e.target.value })}
                                        required
                                    />
                                </div>
                                <div class="btn-access">
                                    <button
                                        class="button button-dark js_make_appointment_btn js_ma_watch_button"
                                        onClick={handleProfileUpdate}
                                    >
                                        Lưu
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

export default Profile;
