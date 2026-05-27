import React, { useState, useEffect } from 'react';

const CompanyLogos = () => {
  const [visibleLogos, setVisibleLogos] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);

  // Reduced company data
  const companies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg" },
    { name: "Adobe", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png" },
    { name: "Spotify", logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
    { name: "Uber", logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" },
    { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" },
    { name: "LinkedIn", logo: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" },
    { name: "Dropbox", logo: "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg" },
    { name: "Slack", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLogos(prev => prev.length < companies.length ? [...prev, prev.length] : prev);
    }, 100);
    return () => clearInterval(timer);
  }, [companies.length]);

  return (
    <div className="py-16 px-4" style={{
      background: 'linear-gradient(135deg, #0f172a, #1e293b)'
    }}>
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-4">
          Trusted by Top Employers
        </h2>
        <p className="text-gray-400">
          Companies large and small rely on our platform to find exceptional talent
        </p>
      </div>

      {/* Circular Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-8">
        {companies.map((company, idx) => (
          <div
            key={company.name}
            className={`relative flex items-center justify-center opacity-0 transform scale-75 transition-all duration-500 ${
              visibleLogos.includes(idx) ? 'opacity-100 scale-100 translate-y-0' : 'translate-y-8'
            }`}
            style={{ animationDelay: `${idx * 0.1}s` }}
            onMouseEnter={() => setHoverIndex(idx)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div className={`w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 ${
              hoverIndex === idx ? 'scale-110 shadow-2xl' : ''
            }`}>
              <img
                src={company.logo}
                alt={company.name}
                className="max-w-12 max-h-12 object-contain filter transition-opacity duration-300"
                onError={e => e.target.src = `https://via.placeholder.com/48?text=${company.name[0]}`}
              />
            </div>
           
          </div>
        ))}
      </div>

      {/* Simple Button */}
      
    </div>
  );
};

export default CompanyLogos;
