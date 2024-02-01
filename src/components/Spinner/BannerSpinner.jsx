import React from "react";

export default function BannerSpinner() {
  return (
    <div className="text-center mb-50 mt-6 placeholder col-12 bg-primary">
      <div className="single-slider slider-height-1 bg-purple">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
              <div className="slider-content slider-animated-1">
                <h3 className="animated"> </h3>
                <h1 className="animated"> </h1>
                <div className="slider-btn btn-hover"></div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6 col-md-6 col-12 col-sm-6">
              <div className="slider-single-img slider-animated-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
