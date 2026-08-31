import { useEffect, useState } from "react"; 
import Skeleton from 'react-loading-skeleton';
import "react-loading-skeleton/dist/skeleton.css";


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
