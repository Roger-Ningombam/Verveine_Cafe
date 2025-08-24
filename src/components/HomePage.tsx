import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Coffee, Star, MapPin, Clock, Wifi, Music, Heart, Award, Users, Sparkles, Play, ChevronDown, ArrowRight, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import imgLeonardoKinoXlASerenePhotoOfACoffeFromALittleAbove31 from "figma:asset/30630759da41dd0ca249bf945ffd1a2f4a1fd8b9.png";
import imgCoffeeImage11 from "figma:asset/138df887ba4cf2dd3894acd7719ba8d7f30db0df.png";
import imgCafeImg21 from "figma:asset/a9d08adb5c73522949234dcc2b39aa42358199a6.png";
import imgCafeImg31 from "figma:asset/7e51513e9c29824963b2c1e2575453197a065fd2.png";
import imgCafeImg41 from "figma:asset/7e4444eed2d3d5c094d38f9dfb065739445c84c9.png";
import imgCafeImg51 from "../asset/3ec8022ad39e851d2133959da19ee32d5a461090.png";
import { CartItem, User } from '../App';
import type { Page } from '../App';
import { useMediaQuery } from '../hooks/useMediaQuery'; 

interface HomePageProps {
  onNavigate: (page: Page, productId?: string) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  user: User | null;
}

export default function HomePage({ onNavigate, addToCart, user }: HomePageProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, -150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Regular Customer",
      content: "The best coffee experience in the city! The atmosphere is perfect for both work and relaxation.",
      rating: 5,
      avatar: "👩‍💼"
    },
    {
      name: "Mike Chen",
      role: "Coffee Enthusiast",
      content: "Their single-origin beans are exceptional. You can taste the quality in every sip.",
      rating: 5,
      avatar: "👨‍💻"
    },
    {
      name: "Emma Davis",
      role: "Local Artist",
      content: "This place has become my creative sanctuary. Great coffee, amazing vibes!",
      rating: 5,
      avatar: "👩‍🎨"
    }
  ];

  const features = [
    { icon: Wifi, title: "Free WiFi", description: "High-speed internet for remote work" },
    { icon: Music, title: "Live Music", description: "Acoustic sessions every weekend" },
    { icon: Award, title: "Award Winning", description: "Best Café 2024 - City Awards" },
    { icon: Users, title: "Community", description: "Meet like-minded coffee lovers" }
  ];

  const specialOffers = [
    {
      title: "Morning Special",
      description: "Buy 2 coffees, get 1 pastry free",
      time: "6AM - 10AM",
      color: "from-orange-400 to-amber-500"
    },
    {
      title: "Student Discount",
      description: "20% off with valid student ID",
      time: "All day",
      color: "from-blue-400 to-indigo-500"
    },
    {
      title: "Loyalty Rewards",
      description: "Earn points with every purchase",
      time: "Always",
      color: "from-purple-400 to-pink-500"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const quickOrderItems = [
    { id: 'espresso-large', name: 'Espresso', price: 7.00, image: imgCafeImg21 },
    { id: 'cappuccino-medium', name: 'Cappuccino', price: 6.00, image: imgCafeImg31 },
    { id: 'americano-large', name: 'Americano', price: 7.00, image: imgCafeImg41 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f2efea] to-white">

    {/* Hero Section with Parallax */}
      <motion.section 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative h-screen flex items-start pt-32 lg:grid lg:place-items-center lg:pt-0"
        >
        {/* Background with enhanced styling */}
        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(211,191,169,0.98)] via-[rgba(211,191,169,0.95)] to-[rgba(180,132,108,0.9)]" />
        
        {/* Floating particles animation */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-amber-300/30 rounded-full"
              initial={{ x: Math.random() * window.innerWidth, y: window.innerHeight + 20 }}
              animate={{ 
                y: -20,
                x: Math.random() * window.innerWidth,
                scale: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                delay: Math.random() * 10
              }}
            />
          ))}
        </div>
        

        <div className="relative z-10 container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Badge className="mb-4 bg-amber-100 text-amber-800 border-amber-200">
                ✨ Welcome to Verveine Café
              </Badge>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-4xl lg:text-6xl font-bold text-amber-900 leading-tight"
            >
              Let the warmth of our coffee match the 
              <span className="text-amber-600"> morning sun</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="text-xl text-amber-800 leading-relaxed"
            >
              A perfect, soul-warming start to your day in our tranquil sanctuary of exceptional coffee and peaceful moments.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                onClick={() => onNavigate('menu')}
                className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Coffee className="mr-2 h-5 w-5" />
                Explore Our Menu
              </Button>
              
              <Button
                onClick={() => onNavigate('tour')}
                variant="outline"
                className="border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg rounded-full"
              >
                <Play className="mr-2 h-5 w-5" />
                Virtual Tour
              </Button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="flex items-center space-x-8 pt-6"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-900">5000+</div>
                <div className="text-sm text-amber-700">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-900">4.9</div>
                <div className="text-sm text-amber-700">Star Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-900">24/7</div>
                <div className="text-sm text-amber-700">Online Ordering</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Enhanced Coffee Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              className="relative"
            >
              <div 
                className="w-full h-[500px] rounded-3xl shadow-2xl bg-cover bg-center"
                style={{ backgroundImage: `url('${imgLeonardoKinoXlASerenePhotoOfACoffeFromALittleAbove31}')` }}
              />
              
              {/* Floating elements around the image */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg"
              >
                <Coffee className="h-8 w-8 text-amber-600" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-amber-100 rounded-full p-3 shadow-lg"
              >
                <Heart className="h-6 w-6 text-red-500" />
              </motion.div>

              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -left-8 w-16 h-16 border-4 border-amber-300 border-dashed rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center text-amber-800"
          >
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronDown className="h-6 w-6" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Enhanced Features Section */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50 mt-64 lg:mt-0">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{duration: 0.8,}}
            viewport={{ 
            once: true, 
            amount: isMobile ? 1.0 : 0.5 
          }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-800">Why Choose Us</Badge>
            <h2 className="text-4xl font-bold text-amber-900 mb-4">More Than Just Coffee</h2>
            <p className="text-xl text-amber-700 max-w-2xl mx-auto">
              Experience the perfect blend of exceptional coffee, welcoming atmosphere, and community spirit
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center group"
              >
                <Card className="p-8 bg-white/80 backdrop-blur-sm border-amber-200 hover:shadow-xl transition-all">
                  <CardContent className="p-0">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="inline-block p-4 bg-amber-100 rounded-full mb-6 group-hover:bg-amber-200"
                    >
                      <feature.icon className="h-8 w-8 text-amber-600" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-amber-900 mb-3">{feature.title}</h3>
                    <p className="text-amber-700">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Order Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-800">Quick Order</Badge>
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Popular Choices</h2>
            <p className="text-xl text-amber-700">Skip the wait, order ahead!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {quickOrderItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="overflow-hidden bg-gradient-to-br from-white to-amber-50 border-amber-200 hover:shadow-xl transition-all">
                  <div 
                    className="h-48 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                    style={{ backgroundImage: `url('${item.image}')` }}
                  />
                  <CardContent className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold text-amber-900">{item.name}</h3>
                      <span className="text-2xl font-bold text-amber-600">${item.price}</span>
                    </div>
                    <Button
                      onClick={() => addToCart({
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        size: 'Large',
                        image: item.image
                      })}
                      className="w-full bg-amber-600 hover:bg-amber-700 group-hover:scale-105 transition-transform"
                    >
                      <Coffee className="mr-2 h-4 w-4" />
                      Quick Add
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Atmosphere Section */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('${imgCoffeeImage11}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30">Our Atmosphere</Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              An open invitation to pause, breathe, and find your peace
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto leading-relaxed">
              Amidst the profound tranquility of our surroundings, discover a sanctuary where time slows down and every moment becomes meaningful.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => onNavigate('about')}
                className="bg-white text-amber-900 hover:bg-amber-50 px-8 py-4 text-lg rounded-full"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Learn Our Story
              </Button>
              <Button
                onClick={() => onNavigate('events')}
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Upcoming Events
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-800">Special Offers</Badge>
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Limited Time Deals</h2>
            <p className="text-xl text-amber-700">Don't miss out on these amazing offers!</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {specialOffers.map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className={`p-6 bg-gradient-to-br ${offer.color} text-white border-0 hover:shadow-xl transition-all`}>
                  <CardContent className="p-0">
                    <div className="flex items-center justify-between mb-4">
                      <Sparkles className="h-8 w-8" />
                      <Badge className="bg-white/20 text-white border-white/30">
                        {offer.time}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{offer.title}</h3>
                    <p className="text-lg mb-6 opacity-90">{offer.description}</p>
                    <Button
                      onClick={() => onNavigate('menu')}
                      className="w-full bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <ArrowRight className="mr-2 h-4 w-4" />
                      Order Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-800">Testimonials</Badge>
            <h2 className="text-4xl font-bold text-amber-900 mb-4">What Our Customers Say</h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Card className="p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <CardContent className="p-0">
                  <div className="text-6xl mb-4">{testimonials[currentTestimonial].avatar}</div>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-xl text-amber-800 mb-6 italic leading-relaxed">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <div>
                    <h4 className="text-lg font-bold text-amber-900">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-amber-700">{testimonials[currentTestimonial].role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? 'bg-amber-600' : 'bg-amber-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Your Coffee Journey?
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Join thousands of coffee lovers who've made Verveine Café their daily ritual
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => onNavigate('menu')}
                className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              >
                <Coffee className="mr-2 h-5 w-5" />
                Order Online Now
              </Button>
              <Button
                onClick={() => onNavigate('locations')}
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Find Us
              </Button>
            </div>

            {user && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-8 p-4 bg-white/10 rounded-lg max-w-md mx-auto"
              >
                <p className="text-lg">Welcome back, {user.name}!</p>
                <p className="text-amber-200">You have {user.loyaltyPoints} loyalty points</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}