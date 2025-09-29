"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Image from 'next/image';
import {
  Palette,
  ArrowRight,
  ShoppingBag,
  Store,
  Heart,
  Star,
  Camera,
  Brush,
  Sparkles,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"
import React from "react"

export default function HomePage() {
  // Header functions
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSignUp = () => {
    window.location.href = "/sign-up"
  }

  const handleSignIn = () => {
    window.location.href = "/sign-in"
  }

  // Hero section functions
  const handleShopArt = () => {
    window.location.href = "/signup?type=customer"
  }

  const handleSellArt = () => {
    window.location.href = "/signin?type=seller"
  }

  // Features section functions
  const handleArtworkClick = () => {
    window.location.href = "/signup?type=customer"
  }

  const handleSellClick = () => {
    window.location.href = "/signin?type=seller"
  }

  // Featured artworks data
  const featuredArtworks = [
    {
      id: 1,
      title: "Abstract Dreams",
      artist: "Sarah Chen",
      price: 299,
      originalPrice: 399,
      discount: 25,
      image: "/abstract-colorful-painting-with-flowing-shapes.jpg",
      rating: 4.8,
      likes: 124,
    },
    {
      id: 2,
      title: "Urban Landscape",
      artist: "Marcus Rodriguez",
      price: 450,
      originalPrice: 550,
      discount: 18,
      image: "/placeholder-qh0bg.png",
      rating: 4.9,
      likes: 89,
    },
    {
      id: 3,
      title: "Nature's Harmony",
      artist: "Emma Thompson",
      price: 199,
      originalPrice: 249,
      discount: 20,
      image: "/placeholder-c0h2k.png",
      rating: 4.7,
      likes: 156,
    },
    {
      id: 4,
      title: "Digital Fusion",
      artist: "Alex Kim",
      price: 350,
      originalPrice: 420,
      discount: 17,
      image: "/placeholder-cri8x.png",
      rating: 4.6,
      likes: 203,
    },
    {
      id: 5,
      title: "Portrait Study",
      artist: "Isabella Garcia",
      price: 275,
      originalPrice: 325,
      discount: 15,
      image: "/placeholder-wpej8.png",
      rating: 4.9,
      likes: 167,
    },
    {
      id: 6,
      title: "Ocean Waves",
      artist: "David Park",
      price: 380,
      originalPrice: 450,
      discount: 16,
      image: "/placeholder-9i8ws.png",
      rating: 4.8,
      likes: 142,
    },
  ]

  // Selling features data
  const sellingFeatures = [
    {
      icon: <Palette className="h-8 w-8 text-primary" />,
      title: "Showcase Your Art",
      description: "Create a beautiful portfolio to display your artwork to thousands of potential buyers.",
    },
    {
      icon: <Camera className="h-8 w-8 text-primary" />,
      title: "Professional Tools",
      description: "Access high-quality image upload tools and portfolio management features.",
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: "Marketing Support",
      description: "Get featured in our curated collections and promotional campaigns.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950/20 to-black relative">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(168,85,247,0.05)_50%,transparent_75%)] pointer-events-none"></div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-purple-800/30 bg-black/90 backdrop-blur-xl supports-[backdrop-filter]:bg-black/70">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Palette className="h-8 w-8 text-amber-400" />
            <span className="text-2xl font-bold text-white">ArtKart</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-300 hover:text-amber-400 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-300 hover:text-amber-400 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-gray-300 hover:text-amber-400 transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={handleSignIn} className="text-gray-300 hover:text-white hover:bg-gray-800">
              Sign In
            </Button>
            <Button onClick={handleSignUp} className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section
          id="home"
          className="relative py-20 lg:py-32 bg-gradient-to-r from-slate-950/95 via-purple-950/30 to-gray-950/95"
        >
          <div className="container mx-auto px-4">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-balance mb-6 text-white">
                Discover Unique Art from
                <span className="text-amber-400"> Talented Artists</span>
              </h1>
              <p className="text-xl text-gray-300 text-pretty mb-8 max-w-2xl mx-auto">
                Connect with artists worldwide. Buy original artwork or showcase your creative masterpieces to art
                lovers everywhere.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  onClick={handleShopArt}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-black font-semibold"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop Art
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleSellArt}
                  className="w-full sm:w-auto border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white bg-transparent"
                >
                  <Store className="mr-2 h-5 w-5" />
                  Sell Your Art
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gradient-to-b from-gray-950 via-purple-950/20 to-slate-950 relative">
          {/* Subtle animated background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.1),transparent_70%)] pointer-events-none"></div>

          <div className="container mx-auto px-4">
            {/* Featured Artworks */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Featured Artworks</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Discover amazing pieces from our talented community of artists
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {featuredArtworks.map((artwork) => (
                <Card
                  key={artwork.id}
                  className="group cursor-pointer hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 hover:-translate-y-1 bg-gray-800/50 border-gray-700 backdrop-blur-sm"
                  onClick={handleArtworkClick}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={artwork.image || "/placeholder.svg"}
                        alt={artwork.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {artwork.discount > 0 && (
                        <Badge className="absolute top-3 left-3 bg-amber-500 text-black font-semibold">
                          -{artwork.discount}%
                        </Badge>
                      )}
                      <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/70 rounded-full px-2 py-1">
                        <Heart className="h-4 w-4 text-amber-400" />
                        <span className="text-white text-sm">{artwork.likes}</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 text-white">{artwork.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">by {artwork.artist}</p>

                      <div className="flex items-center mb-3">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="ml-1 text-sm font-medium text-gray-300">{artwork.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl font-bold text-amber-400">${artwork.price}</span>
                          {artwork.originalPrice > artwork.price && (
                            <span className="text-sm text-gray-500 line-through">${artwork.originalPrice}</span>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white bg-transparent"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Selling Features */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Start Selling Your Art</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Join thousands of artists who are already earning from their creativity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {sellingFeatures.map((feature, index) => (
                <Card
                  key={index}
                  className="text-center p-6 hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 cursor-pointer bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:bg-gray-800/70"
                  onClick={handleSellClick}
                >
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      {React.cloneElement(feature.icon, { className: "h-8 w-8 text-amber-400" })}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                onClick={handleSellClick}
                className="bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              >
                <Brush className="mr-2 h-5 w-5" />
                Start Selling Today
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-gradient-to-t from-black via-purple-950/20 to-gray-950 py-16 border-t border-purple-800/30 relative"
      >
        {/* Footer background accent */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.05),transparent_60%)] pointer-events-none"></div>

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Palette className="h-8 w-8 text-amber-400" />
                <span className="text-2xl font-bold text-white">ArtKart</span>
              </div>
              <p className="text-gray-400">
                Connecting artists and art lovers worldwide. Discover, buy, and sell unique artwork.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-amber-400 transition-colors">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-gray-400 hover:text-amber-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/signup" className="text-gray-400 hover:text-amber-400 transition-colors">
                    Sign Up
                  </a>
                </li>
                <li>
                  <a href="/signin" className="text-gray-400 hover:text-amber-400 transition-colors">
                    Sign In
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-amber-400" />
                  <span className="text-gray-400">hello@artkart.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-amber-400" />
                  <span className="text-gray-400">+91 950-83-1</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-amber-400" />
                  <span className="text-gray-400">India, In</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
              <p className="text-gray-400 text-sm">Subscribe to get the latest art collections and artist features.</p>
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                />
                <Button className="bg-amber-500 hover:bg-amber-600 text-black font-semibold">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 ArtKart. All rights reserved. Made with ❤️ for artists and art lovers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
