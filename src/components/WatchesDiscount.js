import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api';
import Header from './Header';
import '../css/home.css';
import urlImg from '../services/urlImg';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Watchesdiscount = () => {
    const [discountPhones, setdiscountPhones] = useState([]);
    const [hoverIndex, setHoverIndex] = useState(-1);

    useEffect(() => {
        async function fetchData() {
            const response = await API.get('/khuyenmai/get-dt-khuyenmai');
            setdiscountPhones(response.data);
        }
        fetchData();
    }, []);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (hoverIndex >= 0 && hoverIndex < discountPhones.length) {
    //             const newWatches = [...discountPhones];
    //             //const brandWatches = newWatches[hoverIndex].watches;
    //             //const firstWatch = brandWatches.shift();
    //             //brandWatches.push(firstWatch);
    //             setdiscountPhones(newWatches);
    //         }
    //     }, 2000);

    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, [hoverIndex, discountPhones]);

    const handleHover = (brandIndex, watchIndex) => {
        if (watchIndex === 0) {
            setHoverIndex(brandIndex);
        } else {
            setHoverIndex(-1);
        }
    };

    const settings2 = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: Math.min(3, discountPhones.length),
        slidesToScroll: Math.min(3, discountPhones.length),
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    return (
        <div id="new-watch-showcase">
            <h2 className="title-list-watch cl-black">KHUYẾN MÃI</h2>
            <div className="slider-wrapper-wl">
                <Slider {...settings2} className="watches">
                    {discountPhones.map((item) => (
                        <div key={item.MaDT}>
                            <div className="brandwatches">
                                <Link to={`/watch/${item.MaDT}`} className="watches-link">
                                    <div
                                        key={item.MaDT}
                                        className="watchlatest"
                                        //onMouseEnter={() => handleHover(brandIndex, watchIndex)}
                                        onMouseLeave={() => setHoverIndex(-1)}
                                    >
                                        <img src={urlImg + item.HinhAnh} alt={item.TenDT} />

                                        {/* <h3 className="watch-latest-title">{brand.name}</h3> */}
                                    </div>
                                </Link>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Watchesdiscount;
