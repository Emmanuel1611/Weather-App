import React from 'react';
import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const { darkMode } = useContext(WeatherContext);

  return (
    <footer
      className={`py-4 px-6 ${
        darkMode ? 'bg-slate-900' : 'bg-primary-light'
      } text-white`}
    >
      <div className="container mx-auto text-center">
        <p>© {new Date().getFullYear()} WeatherSphere </p>
        <p className="text-sm opacity-80 mt-1">Data provided by WeatherApi</p>

        <nav aria-label="Social media links" className="flex justify-center space-x-4 mt-4">
          <a
            href="https://github.com/Emmanuel1611"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Visit Emmanuel Muhindo's GitHub profile"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/in/emmanuel-muhindo-a1a367220/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Visit Emmanuel Muhindo's LinkedIn profile"
          >
            <FaLinkedin size={24} />
          </a>
        </nav>

        <p className="text-gray-400 mt-6">
          Made with ❤ by Emmanuel Muhindo
        </p>
      </div>
    </footer>
  );
};

export default Footer;