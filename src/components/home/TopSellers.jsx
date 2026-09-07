import { useEffect, useState } from "react"; 
import "react-loading-skeleton/dist/skeleton.css";
import TopSeller from "./TopSeller"; 

const TopSellers = () => {
  const [sellers, setSellers] = useState([]); 

  useEffect(() => {

const fetchTopSellers = async () => {
try {
const response = await fetch("https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers");

const data = await response.json();
setSellers(data); 
} catch (error) {
  console.error("Error fetching sellers:", error);
} finally { 
} 
}; 

fetchTopSellers();

}, []); 

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2 data-aos="fade-up">Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
             {sellers.map((seller, index)=> ( 
           <TopSeller
            key={seller.id}
            authorImage={seller.authorImage}
            authorName={seller.authorName}
            authorId={seller.authorId}
           price={seller.price}
          /> 
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
