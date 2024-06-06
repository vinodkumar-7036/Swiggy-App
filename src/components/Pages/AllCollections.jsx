import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import "../../StyleComponents/allVendors.css"

const API_BASE_URL = "https://backend-nodejs-suby.onrender.com";

const AllCollections = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllVendors = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/vendor/all-vendors`);
      setVendors(response.data.vendors);
    } catch (error) {
      setError("Error fetching vendors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllVendors();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleImageError = (event) => {
    event.target.src =
      "https://www.thomascook.in/blog/wp-content/uploads/2023/09/famous-Karnataka-food-items.jpg";
  };

  return (
    <div>
      <h1>All Vendors</h1>
      {vendors.length === 0 ? (
        <p>No vendors available</p>
      ) : (
        <div className="vendor-card">
          {vendors.map((vendor) => (
            <div key={vendor.id} className="vendor-box" >
              {vendor.firm.map((foodDetails) => {
                return (
                  <div key={foodDetails.id}>
                    {/* <p>{foodDetails.firmName}</p> */}
                    <img
                      src={`${API_BASE_URL}/uploads/${foodDetails.image}`}
                      alt="Food item"
                      onError={handleImageError}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      )}
      <div>
        <h3>Restarunt food...</h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam nam provident tempore. Eaque suscipit adipisci, accusamus fugiat, dicta nostrum, beatae a numquam minima sint nam quae. Quos quisquam a facilis?
      </div>
    </div>
  );
};

export default AllCollections;
