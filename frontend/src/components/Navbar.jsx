const Navbar = () => {
  return (
    <nav className="w-full px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md border-b border-cyan-500">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-extrabold tracking-wide text-cyan-400">Cricket Commentary Box</h1>
        <ul className="flex gap-6 text-lg font-medium">
          <li className="hover:text-green-400 transition cursor-pointer">Home</li>
          <li className="hover:text-green-400 transition cursor-pointer">About</li>
          <li className="hover:text-green-400 transition cursor-pointer">Contact</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
