// src/components/Button.jsx
import { Link } from "react-router-dom";

const Button = ({ text, to }) => {
  return (
    <Link to={to}>
      <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition">
        {text}
      </button>
    </Link>
  );
};

export default Button;
