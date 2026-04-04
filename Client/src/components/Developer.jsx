import React from 'react'

const Developer = () => {
  return (
    <div>
    <div className="bg-emerald-100 py-16 px-4 md:px-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-700 text-center mb-12">
          Meet the Developer
        </h2>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          
          {/* Developer Image */}
          <div className="flex-1">
            <img 
              src="https://avatars.githubusercontent.com/u/151234567?v=4" 
              alt="Developer" 
              className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-full shadow-2xl mx-auto"
            />
          </div>

          {/* Developer Info */}
          <div className="flex-1 flex flex-col gap-6">
            <h3 className="text-2xl md:text-3xl font-bold text-emerald-700">
              Shivam Singh
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed">
              Shivam is a passionate full-stack developer and the creator of Bhumi 🌱. With a deep interest in agriculture technology, he designed this platform to help farmers leverage modern tools for smarter farming. Shivam combines creativity, technical expertise, and a vision for sustainable development to build tools that make a real impact.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Outside of development, Shivam enjoys exploring rural communities, learning about traditional farming techniques, and applying modern solutions to age-old agricultural challenges.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto py-16 px-4 md:px-16 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-700 mb-6">
          Join Us in Transforming Agriculture
        </h2>
        <p className="text-gray-700 text-lg md:text-xl mb-6">
          Whether you are a farmer, enthusiast, or supporter, Bhumi invites you to be part of our mission to modernize farming, increase productivity, and promote sustainability.
        </p>
        <button className="bg-emerald-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-600 transition">
          Get Started
        </button>
      </div>
     </div>
  )
}

export default Developer
