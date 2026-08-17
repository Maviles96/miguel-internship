import React from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import { useEffect, useState } from "react";
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";

const TopSellers = () => {
  const [sellers, setSellers] = useState([]);
useEffect(() => {

const fetchTopSellers = async () => {

const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");

const data = await response.json();

console.log(data);

setSellers(data);

};

fetchTopSellers();

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
  };

function ProfileCard({ isLoading, data }) {
  if( isLoading ) {
    return (
    <div className="card">
      <Skeleton circle width={50} height={50} />
      <h2><Skeleton width={150} /></h2>
      <p><Skeleton count={3} /></p>
    </div>
    );
  }

return (
  <div className="card">
  <img src={data.avatar} alt={data.name} style={{ width: 50, height: 50, borderRadius: '50%'}} />
  <h2>{data.name}</h2>
  <p>{data.bio}</p>
  </div> 
);
} 


  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
             {sellers.map((seller, index)=> (
               <li key={index}>
            <ProfileCard data={seller} isLoading={!sellers.length}/>
            </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
