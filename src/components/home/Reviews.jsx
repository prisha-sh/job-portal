import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const Reviews = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Sample review data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Senior Software Engineer",
      company: "Google",
      reviewerImage: "https://images.unsplash.com/photo-1494790108755-2616b90d978e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      review: "Thanks to this amazing platform, I landed my dream job at Netflix! The process was smooth and I found the perfect opportunity that matched my skills."
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Product Manager",
      company: "Google",
      reviewerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
      review: "Incredible service! Within weeks, I secured a Product Manager role at Google. The platform's job matching algorithm is simply outstanding."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Cloud Solutions Architect",
      company: "Flipkart",
      reviewerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      companyLogo: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",
      review: "From application to offer letter, everything was seamless. Now I'm living my dream as a Cloud Architect at Amazon!"
    },
    {
      id: 4,
      name: "Raj Patel",
      position: "Full Stack Developer",
      company: "Flipkart",
      reviewerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      companyLogo: "https://logos-world.net/wp-content/uploads/2020/11/Flipkart-Logo.png",
      review: "This platform connected me with Flipkart's hiring team directly. Best career decision I ever made - thank you for making it possible!"
    },
    {
      id: 5,
      name: "Lisa Wang",
      position: "Data Scientist",
      company: "Microsoft",
      reviewerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      review: "Outstanding platform! I got my dream Data Scientist role at Microsoft faster than I ever imagined. Highly recommend to everyone!"
    },
    {
      id: 6,
      name: "David Kim",
      position: "UX Designer",
      company: "Adobe",
      reviewerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      companyLogo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_Logo.png",
      review: "From struggling to find opportunities to landing a UX Designer role at Adobe - this platform truly transformed my career journey!"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Move one card at a time, but always show 3 cards
        return (prevIndex + 1) % reviews.length;
      });
    }, 4000); // Change every 4 seconds

    return () => clearInterval(timer);
  }, [reviews.length]);

  // Get the 3 cards to display based on current index
  const getVisibleCards = () => {
    const cards = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % reviews.length;
      cards.push(reviews[index]);
    }
    return cards;
  };

  const visibleCards = getVisibleCards();

  return (
    <div className="py-16 px-4" style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #2d5a87 100%)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Reviews
          </h2>
          <div className="flex justify-center items-center space-x-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-xl" />
            ))}
          </div>
          <p className="text-blue-200 text-lg">
            See what our successful candidates are saying
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(0%)`, // We're managing visible cards, not transforming
            }}
          >
            <div className="flex space-x-6 w-full justify-center">
              {visibleCards.map((review, index) => (
                <div
                  key={`${review.id}-${currentIndex}-${index}`}
                  className="flex-none w-80 bg-white rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-3xl"
                  style={{
                    animation: `slideInFromRight 0.8s ease-out ${index * 0.1}s both`
                  }}
                >
                  {/* Card Header with Company Logo */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 relative">
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full p-2 shadow-lg">
                      <img
                        src={review.companyLogo}
                        alt={`${review.company} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/48x48/4F46E5/white?text=${review.company.charAt(0)}`;
                        }}
                      />
                    </div>
                    <div className="flex items-center space-x-4">
                      <img
                        src={review.reviewerImage}
                        alt={review.name}
                        className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80";
                        }}
                      />
                      <div>
                        <h3 className="text-white font-bold text-lg">{review.name}</h3>
                        <p className="text-blue-100 text-sm font-medium">{review.position}</p>
                        <p className="text-blue-200 text-xs">at {review.company}</p>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400 text-sm" />
                      ))}
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm italic">
                      "{review.review}"
                    </p>
                  </div>

                  {/* Success Badge */}
                  <div className="px-6 pb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      ✅ Dream Job Achieved
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-white shadow-lg'
                  : 'bg-blue-300 hover:bg-blue-200'
              }`}
            />
          ))}
        </div>

       
       
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
};

export default Reviews;