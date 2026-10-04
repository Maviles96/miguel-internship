import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";
import Slider from "react-slick";

const Countdown = ({ deadline }) => {
  const [timeLeft, setTimeLeft] = useState('');
   
  useEffect(() => {
    const targetDate = new Date(deadline).getTime();
    
    const formatTime = (seconds) => {
      let hoursLeft = Math.floor(seconds / 3600);
      let minutesLeft = Math.floor((seconds % 3600) / 60);
      let secondsLeft = seconds % 60;
  
      minutesLeft = minutesLeft.toString().padStart(2, '0');
      secondsLeft = secondsLeft.toString().padStart(2, '0');
      
      return `${hoursLeft}h ${minutesLeft}m ${secondsLeft}s`;
    };
    const countDown = setInterval(() => {
      const now = Date.now();
      const secondsLeft = Math.floor((targetDate - now) / 1000);

      if (secondsLeft <= 0) {
        clearInterval(countDown);
        setTimeLeft("Expired");
        console.log('done!');
        return;
      }
      setTimeLeft(formatTime(secondsLeft));
    }, 1000);
    return () => clearInterval(countDown);
    
  }, [deadline]); 

    return (
    <div className="de_countdown">
      {timeLeft}
    </div>
  );  
};




const NewItems = () => {
  const [items, setItems] = useState([]);
  
  
  

  useEffect(() => {
    const fetchNewItems = async () => {
      const response = await fetch(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems",
      );

      const data = await response.json();

      console.log(Object.keys(data[0]));
      console.log(data[0].expiryDate); 
      setItems(data);
    };

    fetchNewItems();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up">New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          
             <Slider {...sliderSettings}>
             {items.map((item, index) => (
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${item.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <img className="lazy" src={item.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <Countdown
                deadline= {item.expiryDate} />
                 
                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4 data-aos="fade-left">Share</h4>
                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="/" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="/">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                 <Link to={`/item/${item.nftId}`}>
                    <img
                      src={item.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to={`/item/${item.nftId}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <div className="nft__item_price">{item.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{item.likes}</span>
                  </div>
                </div>
              </div>
             ))}
             </Slider>
        </div>
      </div>
    </section>
  );
};

export default NewItems; 