import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import "../../StyleComponents/allVendors.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
const API_BASE_URL = "https://backend-nodejs-suby.onrender.com";

const AllVendors = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [activeCategory, setActiveCategory] = useState("all");
  const [scrollPosition, setScrollPosition] = useState(0);

  const getAllVendors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vendor/all-vendors`);
      setVendors(response.data.vendors.slice(0, 20));
    } catch (error) {
      setError("Error fetching vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllVendors();
  }, []);
  

  const handleScroll =(direction)=>{
    const gallery = document.getElementById("chainGallery");
    const scrollAmount = 500;

    if(direction === "left"){
        gallery.scrollTo({
            left: gallery.scrollLeft -scrollAmount,
            behavior: "smooth"
        })
    }else if( direction === "right"){
        gallery.scrollTo({
            left: gallery.scrollLeft + scrollAmount,
            behavior: "smooth"
        })
    }

}
  const filterHandler = (region, category) => {
    setSelectedRegion(region);
    setActiveCategory(category);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
     
      {vendors.length === 0 ? (
        <p>No vendors available</p>
      ) : (
        <>
        <div className="btnSection">
        <button onClick={()=>handleScroll("left") } className='btnIcons'>
      <FaArrowLeft/>
         </button>
        <button onClick={()=>handleScroll("right")} className='btnIcons'>
        <FaArrowRight/>
        </button>
      </div>
        <div className="vendor-card"  id="chainGallery" onScroll={(e)=>setScrollPosition(e.target.scrollf)}>
          {vendors.map((vendor) => (
            <div key={vendor._id} className="vendor-box">
              {vendor.firm.map((foodDetails) => (
                <div key={foodDetails._id}>
                  <img
                    src={`${API_BASE_URL}/uploads/${foodDetails.image}`}
                    alt="Food item"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        </>
      )}

      <div>
        {/* <h3>Restaurant Food</h3> */}
        <div className="filterButtons">
          <button
            onClick={() => filterHandler("All", "all")}
            className={activeCategory === "all" ? "activeButton" : ""}
          >
            All
          </button>
          <button
            onClick={() => filterHandler("South-Indian", "south-indian")}
            className={activeCategory === "south-indian" ? "activeButton" : ""}
          >
            South-Indian
          </button>
          <button
            onClick={() => filterHandler("North-Indian", "north-indian")}
            className={activeCategory === "north-indian" ? "activeButton" : ""}
          >
            North-Indian
          </button>
          <button
            onClick={() => filterHandler("Chinese", "chinese")}
            className={activeCategory === "chinese" ? "activeButton" : ""}
          >
            Chinese
          </button>
          <button
            onClick={() => filterHandler("Bakery", "bakery")}
            className={activeCategory === "bakery" ? "activeButton" : ""}
          >
            Bakery
          </button>
        </div>
        <div className="food-card">
          {vendors.map((vendor) => (
            vendor.firm.some((foodDetails) => 
              selectedRegion === "All" || 
              foodDetails.region.includes(selectedRegion.toLowerCase())
            ) && (
              <div key={vendor._id} className="food-box">
                {vendor.firm.map((foodDetails) => {
                  if (
                    selectedRegion === "All" ||
                    foodDetails.region.includes(selectedRegion.toLowerCase())
                  ) {
                    return (
                      <div
                        key={foodDetails._id}
                        onClick={() => navigate(`/product/${foodDetails._id}`)}
                        className="food-item"
                      >
                        <img
                          src={`${API_BASE_URL}/uploads/${foodDetails.image}`}
                          alt="Food item"
                        />
                        <div className="food-offer">{foodDetails.offer}</div>
                        <div className="firm-data">
                          <p>{foodDetails.firmName}</p>
                          <p>{foodDetails.region.join(", ")}</p>
                          <p>{foodDetails.area}</p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllVendors;
