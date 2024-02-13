import React from "react";

export default function Spinner() {
  return (
    <div className="text-center mt-6">
      <div class="spinner-border text-info" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
