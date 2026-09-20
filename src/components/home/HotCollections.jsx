import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HotCollections = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

 

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await fetch(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch collections");
        }
        const data = await response.json();
        const collectionItems = Array.isArray(data) ? data : data.value;

        if (!Array.isArray(collectionItems)) {
          throw new Error("Invalid collections response");
        }

        setCollections(collectionItems);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  // Slider Settings
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

  if (loading) {
  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          {new Array(4).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <Skeleton height={250} />
              <Skeleton circle width={50} height={50} />
              <Skeleton width="70%" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
  if (error) return <div>Error: {error}</div>;
  if (collections.length === 0) return null;

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <Slider {...sliderSettings}>
            {collections.map((item) => (
              <div className="px-2" key={item.id || item.code}>
                <div className="nft_coll">
                  <div className="nft_wrap">
                    <Link to={`/item/${item.nftId}`}>
                      <img
                        src={item.nftImage || nftImage}
                        className="lazy img-fluid"
                        alt={item.title}
                      />
                    </Link>
                  </div>
                  <div className="nft_coll_pp">
                    <Link to="/explore">
                      <img
                        className="lazy pp-coll"
                        src={item.authorImage || AuthorImage}
                        alt={item.authorName}
                      />
                    </Link>
                    <i className="fa fa-check"></i>
                  </div>
                  <div className="nft_coll_info">
                    <Link to="/explore">
                      <h4>{item.title}</h4>
                    </Link>
                    <span>ERC-{item.code}</span>
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

export default HotCollections;