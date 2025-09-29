"use client"

import { Brush, ShoppingCart, Users, Bot } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6 py-12">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">About <span className="text-yellow-400">ArtKart</span></h1>
        <p className="text-lg text-gray-300 mb-10">
          Welcome to <span className="font-semibold">ArtKart</span> – a unique platform connecting
          passionate artists with customers who value originality. 
          Here, every product is <span className="text-yellow-400">handmade</span>, 
          ensuring authenticity and creativity in every purchase.
        </p>
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        
        {/* Seller Feature */}
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <Brush className="text-yellow-400 w-10 h-10 mb-4" />
          <h2 className="text-xl font-semibold mb-2">For Sellers</h2>
          <p className="text-gray-300">
            Showcase your handmade artwork to a wide audience. Upload your creations,
            manage your listings, and grow as an independent artist.
          </p>
        </div>

        {/* Customer Feature */}
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <ShoppingCart className="text-green-400 w-10 h-10 mb-4" />
          <h2 className="text-xl font-semibold mb-2">For Customers</h2>
          <p className="text-gray-300">
            Explore and purchase original handmade art pieces. Support real artists 
            and own one-of-a-kind products that can’t be found anywhere else.
          </p>
        </div>

        {/* Handmade Only */}
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <Users className="text-blue-400 w-10 h-10 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Handmade Only</h2>
          <p className="text-gray-300">
            At ArtKart, we ensure that only <span className="font-semibold">authentic handmade</span> 
            artworks are allowed. No mass-produced or factory items – only genuine creativity.
          </p>
        </div>

        {/* Chat Assistance Bot */}
        <div className="bg-white/10 p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <Bot className="text-purple-400 w-10 h-10 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Chat Assistance Bot</h2>
          <p className="text-gray-300">
            Need help? Our AI-powered chat assistant is here to guide you 
            through your shopping or selling journey anytime.
          </p>
        </div>
      </div>

      {/* Closing Section */}
      <div className="max-w-3xl mx-auto text-center mt-16">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-gray-300">
          To build a community-driven marketplace where creativity thrives,
          customers find unique handmade treasures, and artists get the recognition they deserve.  
          <br /><br />
          Together, we make art accessible and impactful.
        </p>
      </div>
    </div>
  )
}
