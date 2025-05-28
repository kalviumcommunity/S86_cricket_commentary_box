// src/components/Button.jsx
import { useNavigate } from "react-router-dom";

const Button = ({ text, to }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to); // Navigate to the passed "to" route
  };

  return (
    <button onClick={handleClick} className="your-button-styles">
      {text}
    </button>
  );
};

export default Button;
