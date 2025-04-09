const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="mt-6 px-8 py-3 bg-green-500 text-gray-900 font-semibold rounded-xl shadow-lg hover:bg-green-400 transition-all duration-300 hover:shadow-[0_0_10px_2px_rgba(50,205,50,0.8)]"
    >
      {text}
    </button>
  );
};

export default Button;
