
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import groupImage from '../assets/group.jpg';
// import man from '../assets/man.jpg';
// import woman from '../assets/woman.jpg';

// const LandingPage = () => {
//   const navigate = useNavigate();

//   return (
//     <div className="landing-page">
//       {/* Header Section */}
//       <header className="header">
//         <div className="logo">KURAKANI</div>
//         <nav className="nav">
//           <a href="#">About</a>
//           <button className="login-btn" onClick={() => navigate('/login')}>Log In</button>
//         </nav>
//       </header>

//       {/* Hero Section */}
//       <section className="hero">
//         <div className="hero-content">
//           <div className="images-wrapper">
//             <img src={man} alt="Smiling Man" className="image-man" />
//             <img src={woman} alt="Smiling Woman" className="image-woman" />
//           </div>
//           <div className="text-container">
//             <h1>Have your best chat</h1>
//             <p>Fast, easy & unlimited conference Chat services</p>
//             <button className="try-btn" onClick={() => navigate('/login')}>Try it Free</button>
//           </div>
//         </div>
//       </section>

//       {/* Business Section */}
//       <section className="business">
//         <div className="business-image">
//           <img src={groupImage} alt="Group Discussion" />
//         </div>
//         <div className="business-content">
//           <h2>Perfect Solution for Small Businesses</h2>
//           <p>9,876 businesses use ChatApp and they rate it as 5-stars</p>
//           <button className="try-btn" onClick={() => navigate('/login')}>Try it Free</button>
//         </div>
//       </section>

//       <style>{`
//         .landing-page {
//           font-family: Arial, sans-serif;
//           color: #ffffff;
//           background-color: #0f172a;
//           margin: 0;
//           padding: 0;
//         }

//         .header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 20px 50px;
//           background-color: #0f172a;
//         }

//         .logo {
//           font-size: 24px;
//           font-weight: bold;
//           color: #ffffff;
//         }

//         .nav a {
//           margin: 0 15px;
//           color: #ffffff;
//           text-decoration: none;
//         }

//         .nav .login-btn {
//           background-color: #f97316;
//           border: none;
//           padding: 10px 20px;
//           color: #ffffff;
//           border-radius: 5px;
//           cursor: pointer;
//         }

//         .hero {
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           padding: 50px;
//           flex-direction: column;
//         }

//         .hero-content {
//           display: flex;
//           flex-direction: row;
//           justify-content: center;
//           align-items: center;
//           gap: 50px;
//         }

//         .images-wrapper {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 20px;
//         }

//         .image-man {
//           width: 250px;
//           height: auto;
//           border-radius: 10px;
//         }

//         .image-woman {
//           width: 250px;
//           height: auto;
//           border-radius: 10px;
//         }

//         .text-container {
//           text-align: center;
//           max-width: 450px;
//         }

//         .text-container h1 {
//           font-size: 48px;
//           margin-bottom: 20px;
//         }

//         .text-container p {
//           font-size: 18px;
//           margin-bottom: 20px;
//         }

//         .text-container .try-btn {
//           background-color: #f97316;
//           border: none;
//           padding: 15px 30px;
//           color: #ffffff;
//           border-radius: 5px;
//           cursor: pointer;
//         }

//         .business {
//           display: flex;
//           flex-wrap: wrap;
//           align-items: center;
//           justify-content: space-between;
//           padding: 50px;
//           background-color: #ffffff;
//           color: #0f172a;
//         }

//         .business-image img {
//           border-radius: 10px;
//           width: 100%;
//           max-width: 500px;
//           height: auto;
//         }

//         .business-content {
//           max-width: 45%;
//           margin-left: 20px;
//         }

//         .business-content h2 {
//           font-size: 36px;
//           margin-bottom: 20px;
//         }

//         .business-content p {
//           font-size: 16px;
//           margin-bottom: 20px;
//         }

//         .business-content .try-btn {
//           background-color: #0f172a;
//           border: none;
//           padding: 15px 30px;
//           color: #ffffff;
//           border-radius: 5px;
//           cursor: pointer;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default LandingPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import groupImage from '../assets/group.jpg';
import man from '../assets/man.jpg';
import woman from '../assets/woman.jpg';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Header Section */}
      <header className="header">
        <div className="logo">KURAKANI</div>
        <nav className="nav">
          <a onClick={() => navigate('/how-it-works')} style={{ cursor: 'pointer' }}>How It Works</a>
          <button className="login-btn" onClick={() => navigate('/login')}>Log In</button>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="images-wrapper">
            <img src={man} alt="Smiling Man" className="image-man" />
            <img src={woman} alt="Smiling Woman" className="image-woman" />
          </div>
          <div className="text-container">
            <h1>Have your best chat</h1>
            <p>Fast, easy & unlimited conference Chat services</p>
            <button className="try-btn" onClick={() => navigate('/login')}>Try it Free</button>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section className="business">
        <div className="business-image">
          <img src={groupImage} alt="Group Discussion" />
        </div>
        <div className="business-content">
          <h2>Perfect Solution for Small Businesses</h2>
          <p>9,876 businesses use ChatApp and they rate it as 5-stars</p>
          <button className="try-btn" onClick={() => navigate('/login')}>Try it Free</button>
        </div>
      </section>

      <style>{`
        .landing-page {
          font-family: Arial, sans-serif;
          color: #ffffff;
          background-color: #0f172a;
          margin: 0;
          padding: 0;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 50px;
          background-color: #0f172a;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          color: #ffffff;
        }

        .nav a {
          margin: 0 15px;
          color: #ffffff;
          text-decoration: none;
        }

        .nav a:hover {
          text-decoration: underline;
        }

        .nav .login-btn {
          background-color: #f97316;
          border: none;
          padding: 10px 20px;
          color: #ffffff;
          border-radius: 5px;
          cursor: pointer;
        }

        .hero {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px;
          flex-direction: column;
        }

        .hero-content {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          gap: 50px;
        }

        .images-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
        }

        .image-man {
          width: 250px;
          height: auto;
          border-radius: 10px;
        }

        .image-woman {
          width: 250px;
          height: auto;
          border-radius: 10px;
        }

        .text-container {
          text-align: center;
          max-width: 450px;
        }

        .text-container h1 {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .text-container p {
          font-size: 18px;
          margin-bottom: 20px;
        }

        .text-container .try-btn {
          background-color: #f97316;
          border: none;
          padding: 15px 30px;
          color: #ffffff;
          border-radius: 5px;
          cursor: pointer;
        }

        .business {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          padding: 50px;
          background-color: #ffffff;
          color: #0f172a;
        }

        .business-image img {
          border-radius: 10px;
          width: 100%;
          max-width: 500px;
          height: auto;
        }

        .business-content {
          max-width: 45%;
          margin-left: 20px;
        }

        .business-content h2 {
          font-size: 36px;
          margin-bottom: 20px;
        }

        .business-content p {
          font-size: 16px;
          margin-bottom: 20px;
        }

        .business-content .try-btn {
          background-color: #0f172a;
          border: none;
          padding: 15px 30px;
          color: #ffffff;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
