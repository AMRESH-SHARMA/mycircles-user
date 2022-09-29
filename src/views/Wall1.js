import React from "react";
import Dropdown from "../components/dropdown/Dropdown";
import Collapse from "../components/dropdown/Collapse";
import Card from "../components/card/Card";
const Wall1 = () => {
  return (<>
    <div className="container mt-4 mr-4">
      <div className="row justify-content-sm-center">
        <div className="col-sm-6 ">
          <Card />
        </div>

        <div className="col-sm-5">
          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title d-flex">
                <div className="flex-grow-1">
                  <strong>Getting </strong>Started
                </div>
                <Dropdown />
              </div>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <div className="list-group">
                <a href="/" className="list-group-item list-group-item-action"><i className="bi bi-play-circle px-2"></i>Guide: Spaces</a>
                <a href="/" className="list-group-item list-group-item-action"><i className="bi bi-play-circle px-2"></i>Guide: Spaces</a>
                <a href="/" className="list-group-item list-group-item-action"><i className="bi bi-play-circle px-2"></i>Guide: Spaces</a>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title d-flex">
                <div className="flex-grow-1">
                  <strong>Latest </strong>Activities
                </div>
              </div>
              <Collapse />
            </div>
          </div>
        </div>

        {/* <div className="col-md-8">        
          <div className="card mt-3">
            <div className="card-body">
              <div className="row justify-content-md-center mx-3">
                <div className="col-md-auto">
                  <img src=".." alt="..." className="img-rounded" />
                </div>
                <div className="col">
                  HeaderSome quick example text to build on the card title and make up the bulk of the card's content
                </div>
                <div className="col-md-auto">
                  <Dropdown />
                </div>
              </div>
              <hr />
              <div className="d-flex mx-5 px-4">
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
              <div className="d-flex mx-5 px-4 py-2">
                <a href="/" className="card-link" style={{color: "#21A1B3"}}>Comment</a>
                <a href="/" className="card-link" style={{color: "#21A1B3"}}>Like</a>
              </div>
            </div>
          </div>          
        </div>

        <div className="col-md-4">
          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title d-flex">
                <div className="flex-grow-1">
                  <strong>Getting </strong>Started
                </div>
                <Dropdown />
              </div>
              <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              <div className="list-group">
                <a href="/" className="list-group-item list-group-item-action"><i className="bi bi-play-circle px-2"></i>Guide: Spaces</a>
                <a href="/" className="list-group-item list-group-item-action"><i className="bi bi-play-circle px-2"></i>Guide: Spaces</a>
                <a href="/" className="list-group-item list-group-item-action"><i className="bi bi-play-circle px-2"></i>Guide: Spaces</a>
              </div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-body">
              <div className="card-title d-flex">
                <div className="flex-grow-1">
                  <strong>Latest </strong>Activities
                </div>
              </div>
              <Collapse />
            </div>
          </div>
        </div> */}
      </div>


    </div>
  </>
  );
};

export default Wall1;