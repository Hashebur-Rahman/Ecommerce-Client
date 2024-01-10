import React from "react";

const SizeSelector = ({ sizes, selectedSize, onSizeChange }) => {
  // Ensure that there is at least one size and the selected size is initially set
  if (sizes.length > 0 && !selectedSize) {
    onSizeChange(sizes[0]); // Set the default selected size
  }

  return (
    <div>
      {sizes.map((size) => (
        <button
          key={size}
          className={`btn ${
            selectedSize === size ? "btn-primary" : "btn-light"
          }`}
          onClick={() => onSizeChange(size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
