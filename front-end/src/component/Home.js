// Index.js (or wherever your index page component is)
import React from 'react';
import axios from 'axios';

const Home = () => {
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:8000/api/logout');
      // Redirect to the login page or perform any other action after logout
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Index Page</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;


// import React from 'react';
// import { Link } from 'react-router-dom'; // If using React Router for navigation
// import '../static/Home.css';


// const Home = () => {
//   return (
//     <div>
//       <header>
//         <h1>Welcome to Our E-Commerce Store</h1>
//         <nav>
//           <ul>
//             <li><Link to="/products">Shop Now</Link></li>
//             <li><Link to="/cart">View Cart</Link></li>
//             <li><Link to="/register">Register</Link></li>
//             <li><Link to="/login">Login</Link></li>
//           </ul>
//         </nav>
//       </header>
//       <main>
//         <section>
//           <h2>About Us</h2>
//           <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
//           {/* Add more content about the store */}
//         </section>
//       </main>
//       <footer>
//         <p>&copy; 2024 Our E-Commerce Store</p>
//         {/* Add additional footer content */}
//       </footer>
//     </div>
//   );
// };

// export default Home;
