import '../css/signin.css';
import React, { useState } from 'react';
import API from '../services/api';
import Header from './Header';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert';

const Signup = () => {
    const [Ho, setHo] = useState('');
    const [Ten, setTen] = useState('');
    const [Email, setEmail] = useState('');
    const [SDT, setSDT] = useState('');
    const [DiaChi, setDiaChi] = useState('');
    const [Password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    

    const handleSubmit = (event) => {
        event.preventDefault();


        const data = { Ho, Ten, DiaChi, SDT, Email, Password };

        API.post('/account/sign-up', data)
            .then((response) => {
                if (response.data.success) {
                    Swal({
                        title: "Sign up success!",
                        text: response.data.message,
                        icon: "success",
                        dangerMode: true,
                    })
                      .then(() => {
                        // Chuyển hướng đến trang đăng nhập
                        window.location.href = '/signin';
                    });

                } else {
                    setErrorMessage(response.data.message);
                }
            })
            .catch((error) => {
                // Xử lý lỗi ở đây
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Đã có lỗi xảy ra trong quá trình đăng kí!');
                }
            });
    };

    return (
        <div class="form-account">
            <Header />
            <div class="form">
                <div class="account-container" >
                    <h1 class="h1-account">TẠO TÀI KHOẢN</h1>
                    <p class="subtitle-container"></p>
                </div>
                <div class="profile" >
                    <div class="profile-container" >
                        
                        <div class="info-blockform">
                            <form onSubmit={handleSubmit}>
                                {errorMessage && <div class="error">{errorMessage}</div>}

                                <div  >
                                    <label class="label-account" htmlFor="ho">Họ</label>
                                   <input class="input-account" type="text" placeholder="Nhập họ" id="ho" value={Ho} onChange={(e) => setHo(e.target.value)} required />
                                    
                                </div>
                                <div  >
                                    <label class="label-account" htmlFor="ten">Tên</label>
                                   <input class="input-account" type="text" placeholder="Nhập tên" id="ten" value={Ten} onChange={(e) => setTen(e.target.value)} required />
                                    
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="address">Địa chỉ</label>
                                    <input class="input-account" type="text" id="address" placeholder="Nhập địa chỉ"  value={DiaChi} onChange={(e) => setDiaChi(e.target.value)} required />
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="phone">Số điện thoại</label>
                                    <input class="input-account" type="number" id="phone" placeholder="Nhập số điện thoại"  value={SDT} onChange={(e) => setSDT(e.target.value)} required />
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="email">Email</label>
                                    <input class="input-account" type="email" placeholder="Nhập email" id="email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>
                                <div>
                                    <label class="label-account" htmlFor="password">Mật khẩu</label>
                                    <input class="input-account" type="password" id="password"  placeholder="Nhập mật khẩu"  value={Password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                                <div class="signinup-now">
                                    <label class="label-acc">Bạn đã có tài khoản? </label><Link to="/signin" class="link-signinup-now">Đăng nhập</Link>
                                </div>
                                <div class="btn-access">
                                    <button class="btn-account" type="submit">TẠO TÀI KHOẢN</button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Signup;
