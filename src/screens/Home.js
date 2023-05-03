import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";


export default function Home() {
  const [search, setSearch] = useState('')
  const [foodCat, setFoodCat] = useState([])
  const [foodItem, setFoodItem] = useState([])

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    response = await response.json();
    setFoodItem(response[0])
    setFoodCat(response[1])

  }

  useEffect(() => {
    loadData()
  }, [])





  return (

    <div>

      <div><Navbar /></div>

      <div>
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id='carousel'>
            <div className="carousel-caption" id='carousel' style={{ zIndex: "10" }}>
              <div className="form-inline" justify-content-center>
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                {/* <button className="btn btn-outline-success text-white bg-success my-2 my-sm-0" type="submit">Search</button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img src="https://source.unsplash.com/random/900x700?burger" className="d-block w-100" style={{
                filter: "brightness(30%)"
              }} alt="https://source.unsplash.com/random/900x700" />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700?pastry" style={{
                filter: "brightness(30%)"
              }} className="d-block w-100" alt="https://source.unsplash.com/random/900x700" />
            </div>
            <div className="carousel-item">
              <img src="https://source.unsplash.com/random/900x700/barbeque" style={{
                filter: "brightness(30%)"
              }} className="d-block w-100" alt="https://source.unsplash.com/random/900x700" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div className="m-3">
        {
          foodCat !== []
            ? foodCat.map((data) => {
              return (<div className="row mb-3 ">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />


                {foodItem !== [] ?

                  foodItem.filter((item) =>
                    (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map(filterItems => {
                      return (
                        <div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                          <Card foodItem={filterItems} options={filterItems.options[0]}></Card>
                        </div>
                      )
                    })



                  : <div>No Data Found</div>}

              </div>
              )
            })
            : "No Data found"

        }
      </div>

      <div><Footer /></div>

    </div>

  );
}
