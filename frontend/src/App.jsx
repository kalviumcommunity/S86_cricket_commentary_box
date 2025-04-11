import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AddCommentary from "./pages/AddCommentary";
import CommentaryPage from "./pages/CommentaryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add-commentary" element={<AddCommentary />} />
        <Route path="/commentary" element={<CommentaryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
