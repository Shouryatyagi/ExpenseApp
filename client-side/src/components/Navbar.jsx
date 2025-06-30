import '../index.css';
const Navbar = ({ username }) => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex gap-6 text-lg">
        <a href="/" className="hover:underline">Home</a>
        <a href="/expenses" className="hover:underline">My Expenses</a>
        <a href="/budget" className="hover:underline">My Budget</a>
      </div>
      <div className="text-lg font-semibold">
        {username ? `Welcome, ${username}` : 'Loading...'}
      </div>
    </nav>
  );
};

export default Navbar;
