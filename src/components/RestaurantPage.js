// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { MENU_API } from "../constants";
// import { IMAGE_URL } from "../constants";
// // import {useState} from "react";

// import FoodDataCard from "./FoodDataCard";
// import Shimmer from "./Shimmer";

// const RestaurantMenu = () => {
//   const [resInfo, setResInfo] = useState(null);
//   const { resId } = useParams();
//   const [isImageZoomed, setImageZoomed] = useState(false);

//   useEffect(() => {
//     const fetchDataAndSetResInfo = async () => {
//       try {
//         const data = await fetch(MENU_API + resId);
//         const json = await data.json();
//         console.log(json); // Log the entire JSON data to the console
//         setResInfo(json.data);
//       } catch (error) {
//         console.error("Error fetching menu data:", error);
//       }
//     };

//     fetchDataAndSetResInfo();
//   }, [resId]);

//   if (resInfo === null) {
//     return <div><Shimmer /></div>;
//   }

//   const {
//     name,
//     cuisines = [],
//     costForTwoMessage,
//     city,
//     cloudinaryImageId,
//     areaName,
//     isOpen,
//     avgRatingString,
//   } = resInfo?.cards[0]?.card?.card?.info || {};

//   const allItems = resInfo?.cards?.[resInfo?.cards.length - 1]?.groupedCard?.cardGroupMap?.REGULAR;



//   return (
//     <div style={{ minHeight: "100vh", background: "rgba(255, 255, 0, 0.1)" }}>
//       <div className="container">
//         <div className="container pt-4">
//           <div className="row">
//             <div className="col-9">
//               <div className="card">
//                 <div className="card-body">
//                   <h1 className="card-title display-4 fw-bold text-primary">{name}</h1>
//                   <p className="card-text fs-4 fw-bold text-danger">Cuisines: {cuisines.join(", ")}</p>
//                   {/* <p className="card-text fs-5 fw-bold text-secondary">Cost for Two: {costForTwoMessage}</p> */}
//                   <p className="card-text fs-5 fw-bold text-secondary">{city}-{areaName}</p>
//                   <p className="card-text fs-5 fw-bold text-secondary">
//                     Rating: {avgRatingString} stars
//                   </p>
//                   <p className="card-text fs-5 fw-bold ">
//                     Status: {isOpen ? <span className="text-success">Open Now</span> : <span className="text-danger">Closed</span>}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="col-3 my-auto mx-auto ">
//               <div className="card rounded">
//                 <div className="card-img-container">
//                   <img
//                     className={`card-img-top rounded img-fluid ${isImageZoomed ? 'zoom-on-hover' : ''}`}
//                     src={`${IMAGE_URL}${cloudinaryImageId}`}
//                     alt={name}
//                     onMouseOver={() => setImageZoomed(true)}
//                     onMouseOut={() => setImageZoomed(false)}
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "path_to_alternate_image_or_text.png";
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <h1 className="menu-header mt-4 fs-1 px-4">MENU</h1>
//         {allItems?.cards.slice(1, allItems.cards.length - 2).map((cardList, index) => {
//           return (
//             <div key={cardList?.card?.card?.id} className="mt-4">
//               {index > 0 && (
//                 <div className="row">
//                   <div className="col-12 text-center">
//                     <i className="fas fa-divide"></i>
//                   </div>
//                 </div>
//               )}
//               <h2 className="fw-bold fs-3 text-primary">{cardList?.card?.card?.title}</h2>
//               <div className="row">
//                 {cardList?.card?.card?.categories ? (
//                   cardList?.card?.card?.categories.map((category) => (
//                     <div key={category?.card?.id} className="mt-4">
//                       <h3 className="fw-bold fs-4">{category?.card?.card?.title}</h3>
//                       <div className="row">
//                         {category?.itemCards.map((item) => (
//                           <div className="col-lg-4 col-md-6 col-sm-12 mb-3" key={item?.card?.info?.id}>
//                             <div>
//                               <FoodDataCard
//                                 foodItem={item?.card?.info}
//                                 url={`${IMAGE_URL}${item?.card?.info?.imageId}`}
//                               />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   cardList?.card?.card?.itemCards.map((item) => (
//                     <div className="col-lg-4 col-md-6  mb-4 col-sm-12" key={item?.card?.info?.id}>
//                       <div>
//                         <FoodDataCard
//                           foodItem={item?.card?.info}
//                           url={`${IMAGE_URL}${item?.card?.info?.imageId}`}
//                         />
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           );
//         })}
//         {allItems.cards.length > 0 ? (
//           <div className="menu-category">
//             <div className="row">
//               {/* Render menu categories here */}
//             </div>
//           </div>
//         ) : (
//           <div className="no-menu-items mt-4">No menu items available.</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RestaurantMenu;