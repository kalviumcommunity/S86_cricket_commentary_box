const CommentaryCard = ({ commentator, text, style }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 m-4 text-black w-full max-w-md">
        <h2 className="font-bold text-lg mb-2">{commentator}</h2>
        <p className="italic text-sm text-gray-600 mb-2">Style: {style}</p>
        <p>{text}</p>
      </div>
    );
  };
  
  export default CommentaryCard;
  