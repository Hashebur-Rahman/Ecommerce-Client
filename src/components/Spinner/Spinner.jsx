import React from "react";

export default function Spinner() {
  return (
    <div className="text-center mt-6">
      <div className="loader">
        <img
          src={`${process.env.PUBLIC_URL}/shohojdokan-productloader.png`}
          alt="Loading..."
        />
      </div>
    </div>
  );
}
