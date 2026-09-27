import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css";

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
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextSlide = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex >= items.length - 4 ? 0 : prevIndex + 1
  );
};

const prevSlide = () => {
  setCurrentIndex((prevIndex) =>
    prevIndex === 0 ? Math.max(items.length - 4, 0) : prevIndex - 1
  );
};

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
          <div className="new-items__controls">
          <button type="button" onClick={prevSlide} aria-label="Previous items">
          <i className="fa fa-chevron-left"></i>
          </button>

         <button type="button" onClick={nextSlide} aria-label="Next items">
          <i className="fa fa-chevron-right"></i>
          </button>
          </div>
          {items.slice(currentIndex, currentIndex + 4).map((item, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewItems; 