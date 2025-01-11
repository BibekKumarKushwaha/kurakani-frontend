import React from 'react';
import chatIcon from '../assets/logo.png'; // Replace with your assets
import registerIcon from '../assets/man.jpg'; // Replace with your assets
import searchIcon from '../assets/woman.jpg'; // Replace with your assets
import groupIcon from '../assets/group.jpg';
import backgroundImage from '../assets/background.png'; // Replace with your assets

const HowItWorks = () => {
    return (
      <div className="how-it-works-page">
        {/* Background Layer */}
        <div className="background-layer"></div>
  
        {/* Header */}
        <header className="how-it-works-header">
          <h1>How Kurakani Works</h1>
          <p>Your ultimate guide to using the Kurakani Chat App</p>
        </header>
  
        {/* Steps Section */}
        <section className="steps-section">
          <h2>Step-by-Step Process</h2>
          <div className="steps-container">
            {/* Step 1 */}
            <div className="step">
              <img src={registerIcon} alt="Register" />
              <h3>Register</h3>
              <p>Create an account using your email and username. Your username is unique and cannot be changed.</p>
            </div>
            {/* Step 2 */}
            <div className="step">
              <img src={chatIcon} alt="Login and Chat" />
              <h3>Login and Chat</h3>
              <p>Log in to Kurakani to access your chat dashboard. Start conversations instantly with your friends.</p>
            </div>
            {/* Step 3 */}
            <div className="step">
              <img src={searchIcon} alt="Search Users" />
              <h3>Search and Connect</h3>
              <p>Use the search feature to find users. Send them friend requests and start chatting when they accept.</p>
            </div>
            {/* Step 4 */}
            <div className="step">
              <img src={groupIcon} alt="Manage Groups" />
              <h3>Create and Manage Groups</h3>
              <p>Start a group chat, add members, and manage your group. Only the group creator can edit settings.</p>
            </div>
          </div>
        </section>
  
        {/* Features Section */}
        <section className="features-section">
          <h2>Features</h2>
          <div className="features-container">
            <div className="feature">
              <h3>Live Chat</h3>
              <p>Communicate in real-time with typing indicators (3-dot animation) and instant message delivery.</p>
            </div>
            <div className="feature">
              <h3>File Sharing</h3>
              <p>Send images, videos, audio files, and documents using the attachment button during chats.</p>
            </div>
            <div className="feature">
              <h3>Emojis</h3>
              <p>Express yourself with a wide variety of emojis in your messages.</p>
            </div>
            <div className="feature">
              <h3>Profile Customization</h3>
              <p>Edit your profile to update your avatar, name, bio, and phone number. Username is fixed.</p>
            </div>
          </div>
        </section>
  
        {/* FAQ Section */}
        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq-item">
              <h3>How do I register?</h3>
              <p>Click the Register button on the homepage, fill in the required details, and you're ready to go!</p>
            </div>
            <div className="faq-item">
              <h3>How do I send a friend request?</h3>
              <p>Use the search bar, find the user you want to connect with, and click 'Send Request.'</p>
            </div>
            <div className="faq-item">
              <h3>Can I change my username?</h3>
              <p>No, your username is fixed and cannot be changed after registration.</p>
            </div>
            <div className="faq-item">
              <h3>What types of files can I share?</h3>
              <p>You can share images, videos, audio files, and documents up to 20MB in size.</p>
            </div>
          </div>
        </section>
  
        {/* CSS Styling */}
        <style>{`
          .how-it-works-page {
            font-family: Arial, sans-serif;
            color: white;
            position: relative;
            padding: 20px;
            min-height: 100vh;
            background: url(${backgroundImage}) no-repeat center center fixed;
            background-size: cover;
          }
  
          .background-layer {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6); /* Dark overlay */
            z-index: 0;
          }
  
          .how-it-works-header {
            text-align: center;
            margin-bottom: 40px;
            position: relative;
            z-index: 1;
          }
  
          .steps-section, .features-section, .faq-section {
            margin-bottom: 40px;
            position: relative;
            z-index: 1;
          }
  
          .steps-container, .features-container, .faq-container {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            justify-content: center;
          }
  
          .step, .feature, .faq-item {
            background: rgba(255, 255, 255, 0.9);
            color: #333;
            border: 1px solid #ddd;
            border-radius: 10px;
            padding: 20px;
            text-align: center;
            width: 250px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
  
          .step img {
            width: 80px;
            height: 80px;
            margin-bottom: 15px;
            border-radius: 50%;
          }
  
          h2 {
            text-align: center;
            margin-bottom: 20px;
            color: #f3f4f6;
          }
  
          h3 {
            margin-bottom: 10px;
            color: #0f172a;
          }
        `}</style>
      </div>
    );
  };
  
  export default HowItWorks;