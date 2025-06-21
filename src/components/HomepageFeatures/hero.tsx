import React from "react";
import TypingEffect from "./typing-effect";
import "../../css/Hero.css";

const Hero: React.FC = () => {
  const heroTexts = [
    "Hi, I’m Nawa Mumbwe.",
    "I build modern web applications.",
    "Welcome to my blog!",
  ];

  return (
    <section className="hero-section">
      <div aria-hidden="true" className="hero-overlay" />

      <div className="hero-content">
        <TypingEffect
          texts={heroTexts}
          typingSpeed={120}
          deletingSpeed={60}
          pauseDelay={1800}
        />

        <p className="hero-description">
          Sharing insights, tutorials, and stories about coding, technology, and
          software craftsmanship.
        </p>

        <a href="blog" className="hero-button">
          Explore Blog
        </a>
      </div>
    </section>
  );
};

export default Hero;
