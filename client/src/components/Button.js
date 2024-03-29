import React from "react";

export default function Button({ children, onClick, type }) {
  return (
    <button
      onClick={onClick}
      type={type}
      className="bg-gold text-dark-purple font-bold py-2 m-4 text-lg px-4 rounded active:bg-dark-purple active:text-gold active:border active:border-gold transition-all duration-200   "
    >
      {children}
    </button>
  );
}
