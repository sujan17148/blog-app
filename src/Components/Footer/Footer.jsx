import React from 'react';
import { FaTwitter, FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

function Footer(){
  return (
    <footer className="footer border-t border-secondary text-secondary bg-primary dark:bg-dark-primary" >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Blog Space</h3>
            <p className="mb-6 leading-relaxed ">
              Your creative writing platform. Share your thoughts, connect with readers, and build your audience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className=" hover:text-accent">
                <FaTwitter className="w-5 h-5" />
              </a>
              <a href="#" className=" hover:text-accent">
                <FaGithub className="w-5 h-5" />
              </a>
              <a href="#" className=" hover:text-accent">
                <FaLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className=" hover:text-accent">
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-light-text">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className=" hover:text-accent">Features</a></li>
              <li><a href="#" className=" hover:text-accent">Pricing</a></li>
              <li><a href="#" className=" hover:text-accent">Templates</a></li>
              <li><a href="#" className=" hover:text-accent">Analytics</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4 text-light-text" >Resources</h4>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-accent">Blog</a></li>
              <li><a href="#" className="hover:text-accent">Help Center</a></li>
              <li><a href="#" className="hover:text-accent">Community</a></li>
              <li><a href="#" className="hover:text-accent">Writing Guide</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#64748B' }}>Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className=" hover:text-accent" >About</a></li>
              <li><a href="#" className=" hover:text-accent" >Careers</a></li>
              <li><a href="#" className=" hover:text-accent" >Contact</a></li>
              <li><a href="#" className=" hover:text-accent" >Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 " style={{ borderTop: '1px solid #64748B20' }}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-2" style={{ color: '#64748B' }}>Stay Updated</h4>
              <p className="text-light-text">Get the latest writing tips and platform updates.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white outline-none dark:bg-dark-primary rounded-lg text-light-text transition-all"
              />
              <button 
                className="px-6 py-2 text-white font-medium rounded-lg transition-all whitespace-nowrap bg-accent hover:bg-[#5b21b6]"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8" style={{ borderTop: '1px solid #64748B20' }}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm" style={{ color: '#64748B' }}>
              © 2025 Blog Space. All rights reserved.
            </p>
            <div className="flex items-center gap-1 text-sm" style={{ color: '#64748B' }}>
              <span>Made with</span>
              <FaHeart className="w-4 h-4 text-red-500" />
              <span>for writers</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;