import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';
import urlImg from '../services/urlImg';
import Header from './Header';
import Footer from './Footer';
import '../css/watchlist.css';
import '../css/cart.css';
import '../css/watchdetail.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Swal from 'sweetalert';
import Cookies from 'js-cookie';

const Cart = () => {
    const [items, setItems] = useState([]);
    const navigate = useNavigate();
    const [dienthoai, setdienthoai] = useState([]);

    useEffect(() => {
        const cartItems = Cookies.get('cartItems'); // Lấy dữ liệu từ cookie
        if (cartItems) {
            const parsedItems = JSON.parse(cartItems); // Phân tích JSON
            setItems(parsedItems);

            const fetchItemDetails = async () => {
                const itemsWithDetails = await Promise.all(
                    parsedItems.map(async (item) => {
                        try {
                            const response = await API.get(`/dienthoai/get-dienthoai-by-madt/${item.watchId}`);
                            return { ...item, details: response.data.data };
                        } catch (error) {
                            console.error(`Error fetching details for item with watchId ${item.watchId}:`, error);
                            return null;
                        }
                    }),
                );
                //console.log(itemsWithDetails);
                setdienthoai(itemsWithDetails);
            };

            fetchItemDetails();
        }
    }, []);

    const handleRemove = (index) => {
        const existingItems = [...items];
        existingItems.splice(index, 1); // Xóa phần tử tại index
        setItems(existingItems);

        const itemsJSON = JSON.stringify(existingItems);
        Cookies.set('cartItems', itemsJSON);
    };

    const handleRemoveAll = () => {
        const updatedItems = [...items];
        updatedItems.splice(0, updatedItems.length);
        setItems(updatedItems);

        const itemsJSON = JSON.stringify(updatedItems);
        Cookies.set('cartItems', itemsJSON);
    };

    const handleCreateOrder = async () => {
        const token = localStorage.getItem('token');

        if (token == null) {
            navigate('/signin');
        }

        try {
            for (let i = 0; i < dienthoai.length; i++) {
                const item = dienthoai[i];
                const MaDT = item.details.MaDT;
                const Gia = item.price * 1.1;
                const quantity = item.quantity;
                const MaKH = localStorage.getItem('MaKH');
                console.log(MaKH);
                const response = await API.post(
                    '/phieudat/them-phieudat',
                    {
                        MaKH: MaKH,
                        MaDT: MaDT,
                        DonGia: Gia,
                        SoLuong: quantity,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    },
                );
            }
            handleRemoveAll();
            navigate('/order');
        } catch (error) {
            navigate('/signin');
        }
    };

    const subTotal = dienthoai.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    const tax = subTotal * 0.1;

    const total = subTotal + tax;

    return (
        <div class="form_watchlist">
            <Header />
            <div id="watchlist_container">
                <div id="maincontent" class="page-main contents">
                    <div class="main main-s">
                        {items.length > 0 ? (
                            <>
                                <div class="sec bd-t-gry-1">
                                    <div class="sec-inr pt-none">
                                        <form id="form-validate" class="form form-cart">
                                            <div id="shopping-cart-table" class="cart items data table table-wrapper">
                                                <div class="dataItem mybag-dataItem">
                                                    {dienthoai.map((item, index) => (
                                                        <div key={item.details.MaDT} class="dataItem-inr dataItem-2col">
                                                            <div class="dataItem-img">
                                                                <img
                                                                    class="product-image-photo"
                                                                    src={urlImg + item.details.HinhAnh}
                                                                    alt={item.details.TenDT}
                                                                    loading="lazy"
                                                                    width="110"
                                                                    height="160"
                                                                    //alt=" "
                                                                />
                                                            </div>
                                                            <div class="dataItem-txt">
                                                                <div class="col title">
                                                                    <div class="dataItem-header dataItem-header-2col">
                                                                        <div class="dataItem-header-col cart_productname_wrapper">
                                                                            <h2 class="dataItem-title">
                                                                                <span class="is-category casio_us">
                                                                                    {item.details.TenDT}
                                                                                </span>
                                                                                <span class="is-model"></span>
                                                                                <button
                                                                                    onClick={() => handleRemove(index)}
                                                                                >
                                                                                    <CloseOutlinedIcon />
                                                                                </button>
                                                                            </h2>
                                                                            <div class="dataItem-header-col cart_price_wrapper">
                                                                                <p class="ta-r-pc is-price">
                                                                                    <span
                                                                                        class="price-excluding-tax"
                                                                                        data-label="Excl. Tax"
                                                                                    >
                                                                                        <span class="cart-price">
                                                                                            <span class="price">
                                                                                                ${item.price}{' '}
                                                                                            </span>
                                                                                        </span>{' '}
                                                                                    </span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="dataItem-txt w-100-sp qty_delete_container">
                                                                    <div class="col">
                                                                        <div class="dataItem-header dataItem-header-2col">
                                                                            <div class="dataItem-header-col clear-both">
                                                                                <div class="dataItem-amount is-amount-with-ui qty_wrapper"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div class="col dataItem-option"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div class="sec-inr pt-none">
                                    <div class="dataItem dataItem-accounting bd-t-gry-1">
                                        <div class="dataItem-inr dataItem-accounting-inr dataItem-2col">
                                            <h2 class="title-2">Thanh Toán</h2>
                                            <div class="dataItem-txt w-100-sp">
                                                <div class="col"></div>{' '}
                                                <div class="col">
                                                    <div
                                                        id="bottom-cart-totals"
                                                        class="cart-totals"
                                                        data-bind="scope:'block-totals'"
                                                    >
                                                        <div class="table-wrapper" data-bind="blockLoader: isLoading">
                                                            <table class="dataItem-table dataItem-table-price dataItem-table-price-s dataItem-table-total">
                                                                <tbody>
                                                                    <tr class="totals sub">
                                                                        <th class="dataItem-th" scope="row">
                                                                            <span>Giá mặt hàng:</span>
                                                                            <span class="order-summary-tooltip">
                                                                                <button aria-label="Cart subtotal tooltip">
                                                                                    <i class="fa fa-question-circle"></i>
                                                                                </button>
                                                                                <span
                                                                                    class="tooltip-content"
                                                                                    role="tooltip"
                                                                                ></span>
                                                                            </span>
                                                                        </th>
                                                                        <td class="dataItem-td">
                                                                            <span
                                                                                class="price"
                                                                                data-th="Cart Subtotal:"
                                                                            >
                                                                                {' '}
                                                                                ${subTotal.toFixed(2)}
                                                                            </span>
                                                                        </td>
                                                                    </tr>

                                                                    <tr class="totals-tax">
                                                                        <th
                                                                            class="dataItem-th mark"
                                                                            colspan="1"
                                                                            scope="row"
                                                                        >
                                                                            <span>VAT:</span>
                                                                        </th>
                                                                        <td class="dataItem-td amount" data-th="Tax">
                                                                            <span class="price">${tax.toFixed(2)}</span>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div
                                                    class="col col-total"
                                                    id="bottom-cart-grand-totals"
                                                    data-bind="scope:'bottom-grand-total'"
                                                >
                                                    <div class="col col-total">
                                                        <table class="dataItem-table dataItem-table-price dataItem-table-total">
                                                            <tbody>
                                                                <tr>
                                                                    <th class="dataItem-th thanhtien">Thành tiền:</th>
                                                                    <td class="dataItem-td" data-th="Total Amount">
                                                                        <span data-bind="text: getValue()">
                                                                            {' '}
                                                                            ${total.toFixed(2)}
                                                                        </span>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pd_hero__cta">
                                    <div class="pd_hero__make_appointment">
                                        <button
                                            type="button"
                                            class="button button-dark pd_hero__make_appointment_btn js_make_appointment_btn js_ma_watch_button"
                                            onClick={handleCreateOrder}
                                        >
                                            MUA NGAY
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="sec bd-t-gry-1">
                                <div className="sec-inr pt-none">
                                    <div className="cart-empty">
                                        <h1>Giỏ hàng của bạn đang trống</h1>
                                    </div>
                                    <div class="pd_hero__cta">
                                        <div class="pd_hero__make_appointment">
                                            <Link
                                                to={`/watchlist`}
                                                type="button"
                                                class="button button-dark pd_hero__make_appointment_btn js_make_appointment_btn js_ma_watch_button"
                                            >
                                                SẮM ĐIỆN THOẠI NGAY
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
