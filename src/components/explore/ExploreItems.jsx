import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";

const ExploreItems = () => {
   const [explore, setExplore] = useState([]);
   const [visibleCount, setVisibleCount] = useState(8);
   const ITEMS_PER_PAGE = 4;

function filterItems(filter) {
  const sortedItems = [...explore];

  if (filter === "price_low_to_high") {
    sortedItems.sort((a, b) => a.price - b.price);
  }

  if (filter === "price_high_to_low") {
    sortedItems.sort((a, b) => b.price - a.price);
  }

  setExplore(sortedItems);
} 

   const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
  };

useEffect(() => {

 const fetchExploreItems = async () => {
  
 const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/explore");
 const data = await response.json();

  console.log(data);
  
  setExplore(data);
  
  };
  
  fetchExploreItems();
  }, []);

  // Slider Settings
    const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
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
    }


  
  function ProfileCard({ isLoading, data }) {
    if( isLoading ) {
      return (
        <div className="card">
        <Skeleton circle width={50} height={50} />
        <h2><Skeleton width={150} /></h2>
        <p><Skeleton count={3} /></p>
        </div>
      );
    };

    return (
  <div className="card">
<img src={data.authorImage} alt={data.authorName} style={{width: 50, height: 50, borderRadius: '50%'}} />
<h2>{data.authorName}</h2>
<p>{data.price} ETH</p>
</div>
);
} 

  const visibleItems = explore.slice(0, visibleCount);

  return (
    <>
      <div>
        <select id="filter-items" defaultValue=""
        onChange={(event) => filterItems (event.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
       {visibleItems.map((item, index) => (
        <div
          key={index}
          className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
          style={{ display: "block", backgroundSize: "cover" }}
        >
          <div className="nft__item">
            <div className="author_list_pp">
              <Link
                to="/author"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
              >
                <img className="lazy" src={AuthorImage} alt="" />
                <i className="fa fa-check"></i>
              </Link>
            </div>
            <div className="de_countdown">5h 30m 32s</div>

            <div className="nft__item_wrap">
              <div className="nft__item_extra">
                <div className="nft__item_buttons">
                  <button>Buy Now</button>
                  <div className="nft__item_share">
                    <h4>Share</h4>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-facebook fa-lg"></i>
                    </a>
                    <a href="" target="_blank" rel="noreferrer">
                      <i className="fa fa-twitter fa-lg"></i>
                    </a>
                    <a href="">
                      <i className="fa fa-envelope fa-lg"></i>
                    </a>
                  </div>
                </div>
              </div>
              <Link to="/item-details">
                <img src={nftImage} className="lazy nft__item_preview" alt="" />
              </Link>
            </div>
            <div className="nft__item_info">
              <Link to="/item-details">
                <h4>Pinky Ocean</h4>
              </Link>
              <div className="nft__item_price">{item.price} ETH</div>
              <div className="nft__item_like">
                <i className="fa fa-heart"></i>
                <span>69</span>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="col-md-12 text-center">
         <button onClick={handleLoadMore} style={{ padding: '10px 20px', cursor: 'pointer'}}>
   Load More 
    </button>
      </div>
    </>
  );
};

export default ExploreItems;
