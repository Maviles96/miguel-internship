import React from "react";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
Aos.init();

const TopSeller = ({ authorId, authorImage, authorName, price }) => {
  return (
    <li data-aos="fade-in" data-aos-duration="400">
      <div className="author_list_pp">
        <Link to={`/author/${authorId}`}>
          <img className="lazy pp-author" src={authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      <div className="author_list_info">
        <Link to={`/author/${authorId}`}>{authorName}</Link>
        <span>{price} ETH</span>
      </div>
    </li>
  );
};

export default TopSeller;