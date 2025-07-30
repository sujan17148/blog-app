import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-20 bg-white dark:bg-slate-900">
      <div className="max-w-5xl mx-auto bg-white dark:bg-dark-primary rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center" style={{ color: '#64748B' }}>About Blog Space</h1>

        <p className="text-lg text-accent">
          Welcome to <span className="font-semibold text-accent">Blog Space</span>, your creative writing platform where thoughts transform into stories, ideas become conversations, and writers connect with readers who truly care about authentic content.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-accent">Our Mission</h2>
          <p className="text-base text-light-text">
            At Blog Space, our mission is to democratize storytelling and give every writer a voice that matters. We believe that great content deserves a beautiful home — offering powerful tools, elegant design, and a supportive community for writers at every stage of their journey.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-accent">Why Choose Blog Space?</h2>
          <ul className="list-disc pl-6 space-y-2 text-light-text">
            <li>Clean, distraction-free writing environment with powerful editing tools</li>
            <li>Beautiful, responsive themes that make your content shine</li>
            <li>Built-in audience engagement features and analytics</li>
            <li>SEO-optimized platform to help your content reach more readers</li>
            <li>Supportive community of writers and readers who value quality content</li>
            <li>Easy content management with drafts, scheduling, and organization tools</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-accent" >Our Vision</h2>
          <p className="text-base text-accent">
            We envision a world where quality writing thrives, where authentic voices are heard, and where the art of storytelling continues to connect people across boundaries. Blog Space aims to be the go-to platform for writers who want to focus on what they do best — creating amazing content.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-accent">For Writers, By Writers</h2>
          <p className="text-base text-light-text">
            Blog Space was created by writers who understand the challenges of finding the right platform. We know you need tools that work seamlessly, designs that complement your words, and features that help you grow your audience organically.
          </p>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold mb-2 text-accent">Start Your Writing Journey</h3>
          <p className="mb-4 text-light-text" >
            Whether you're a seasoned blogger, an aspiring writer, or someone with stories to tell — Blog Space is here to help you share your voice with the world.
          </p>
          <Link to="/create">
            <button 
              className="text-white font-semibold px-6 py-2 rounded hover:scale-105 transition duration-300 bg-accent hover:bg-[#5b21b6]"
            >
              Start Writing
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}