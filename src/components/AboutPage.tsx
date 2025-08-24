import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Coffee, Users, Award, Heart, Leaf, Globe, Star, ArrowRight, Play, MapPin, Clock, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import imgCafeImg51 from "figma:asset/3ec8022ad39e851d2133959da19ee32d5a461090.png";
import imgCoffeeImage11 from "figma:asset/138df887ba4cf2dd3894acd7719ba8d7f30db0df.png";
import type { Page } from '../App';

interface AboutPageProps {
  onNavigate: (page: Page) => void;
}

export default function AboutPage({ onNavigate }: AboutPageProps) {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 1000], [0, -200]);

  const values = [
    {
      icon: Coffee,
      title: "Quality First",
      description: "We source only the finest beans and use traditional brewing methods",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Users,
      title: "Community",
      description: "Building connections over exceptional coffee experiences",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Leaf,
      title: "Sustainability",
      description: "Committed to ethical sourcing and environmental responsibility",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Heart,
      title: "Passion",
      description: "Every cup is crafted with love and dedication to perfection",
      color: "from-red-500 to-pink-500"
    }
  ];

  const timeline = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Kenji discovers his passion for coffee in the misty hills of Coorg",
      image: "☁️"
    },
    {
      year: "2019",
      title: "First Steps",
      description: "Opens a small roastery with a focus on single-origin beans",
      image: "🌱"
    },
    {
      year: "2020",
      title: "Community Growth",
      description: "Local coffee enthusiasts begin gathering for cupping sessions",
      image: "👥"
    },
    {
      year: "2021",
      title: "Expansion",
      description: "Silver Mist Roasters becomes a recognized local brand",
      image: "🏆"
    },
    {
      year: "2022",
      title: "Verveine Café",
      description: "Opens the first café location, creating a peaceful sanctuary",
      image: "☕"
    },
    {
      year: "2024",
      title: "Award Recognition",
      description: "Wins 'Best Café 2024' at the City Awards",
      image: "🥇"
    }
  ];

  const team = [
    {
      name: "Kenji Nakamura",
      role: "Founder & Head Roaster",
      avatar: "👨‍🍳",
      bio: "From corporate life to coffee passion, Kenji brings decades of dedication to every bean.",
      specialty: "Single-origin roasting"
    },
    {
      name: "Maria Santos",
      role: "Head Barista",
      avatar: "👩‍🎨",
      bio: "Award-winning latte artist with a passion for creating memorable coffee experiences.",
      specialty: "Latte art & espresso"
    },
    {
      name: "Alex Chen",
      role: "Café Manager",
      avatar: "👨‍💼",
      bio: "Ensuring every visit to Verveine is perfect, from ambiance to service.",
      specialty: "Operations & hospitality"
    },
    {
      name: "Sophie Williams",
      role: "Sustainability Coordinator",
      avatar: "👩‍🌾",
      bio: "Leading our efforts in ethical sourcing and environmental responsibility.",
      specialty: "Ethical sourcing"
    }
  ];

  const stats = [
    { label: "Happy Customers", value: 5000, suffix: "+" },
    { label: "Cups Served Daily", value: 300, suffix: "+" },
    { label: "Years of Experience", value: 6, suffix: "" },
    { label: "Award Wins", value: 12, suffix: "" }
  ];

  const certifications = [
    { name: "Fair Trade Certified", icon: "🤝" },
    { name: "Organic Certified", icon: "🌿" },
    { name: "Rainforest Alliance", icon: "🌳" },
    { name: "Carbon Neutral", icon: "🌍" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <motion.section 
        style={{ y: parallaxY }}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: `url('${imgCoffeeImage11}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30 text-lg px-4 py-2">
              Our Story
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 leading-tight">
              From Dreams to 
              <span className="text-amber-300"> Reality</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto">
              A journey that began with a single cup of coffee on a misty morning in Coorg, 
              and transformed into a sanctuary where souls connect over exceptional brews.
            </p>
            <Button
              onClick={() => onNavigate('contact')}
              className="bg-white text-amber-900 hover:bg-amber-50 px-8 py-4 text-lg rounded-full shadow-lg"
            >
              <Heart className="mr-2 h-5 w-5" />
              Join Our Story
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Discover our journey</span>
            <ArrowRight className="h-6 w-6 rotate-90" />
          </div>
        </motion.div>
      </motion.section>

      {/* Main Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-amber-100 text-amber-800">The Beginning</Badge>
              <h2 className="text-4xl font-bold text-amber-900 mb-6 leading-tight">
                Yearning for a life beyond the city
              </h2>
              <div className="prose prose-lg text-amber-700 space-y-4">
                <p>
                  Our founder Kenji found his purpose during a misty dawn in Coorg. A single cup of coffee 
                  on a quiet veranda, overlooking the hills, sparked a new passion that would change everything.
                </p>
                <p>
                  He left his old world behind to create Silver Mist Roasters, a brand dedicated to capturing 
                  the region's unique spirit. The journey wasn't easy, but every challenge only strengthened 
                  his resolve to share that perfect, peaceful moment with others.
                </p>
                <p>
                  Today, Verveine Café is the home of that vision—a place where we share that perfect, 
                  peaceful moment with you, one carefully brewed cup at a time.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <Button
                  onClick={() => onNavigate('menu')}
                  className="bg-amber-600 hover:bg-amber-700 text-white"
                >
                  <Coffee className="mr-2 h-4 w-4" />
                  Taste Our Story
                </Button>
                <Button
                  onClick={() => onNavigate('tour')}
                  variant="outline"
                  className="border-amber-300 text-amber-700 hover:bg-amber-50"
                >
                  <Play className="mr-2 h-4 w-4" />
                  Virtual Tour
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div 
                className="w-full h-96 rounded-3xl shadow-2xl bg-cover bg-center"
                style={{ backgroundImage: `url('${imgCafeImg51}')` }}
              />
              
              {/* Floating stats */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-white rounded-2xl p-6 shadow-xl"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-900">2018</div>
                  <div className="text-sm text-amber-700">Founded</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 bg-amber-100 rounded-2xl p-6 shadow-xl"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-900">5000+</div>
                  <div className="text-sm text-amber-700">Happy Customers</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-800">Our Values</Badge>
            <h2 className="text-4xl font-bold text-amber-900 mb-4">What Drives Us</h2>
            <p className="text-xl text-amber-700 max-w-2xl mx-auto">
              These core values guide every decision we make and every cup we serve
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full bg-white border-amber-200 hover:shadow-xl transition-all">
                  <CardContent className="p-8 text-center">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-block p-6 bg-gradient-to-r ${value.color} rounded-full mb-6 group-hover:shadow-lg`}
                    >
                      <value.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-amber-900 mb-4">{value.title}</h3>
                    <p className="text-amber-700 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-800">Our Journey</Badge>
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Timeline of Growth</h2>
            <p className="text-xl text-amber-700">From humble beginnings to award-winning excellence</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-amber-200" />
              
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className={`relative flex items-center mb-12 ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`bg-white border-2 border-amber-200 rounded-lg p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer ${
                        activeTimeline === index ? 'border-amber-500 bg-amber-50' : ''
                      }`}
                      onClick={() => setActiveTimeline(index)}
                    >
                      <div className="text-4xl mb-3">{event.image}</div>
                      <div className="text-2xl font-bold text-amber-600 mb-2">{event.year}</div>
                      <h3 className="text-xl font-bold text-amber-900 mb-2">{event.title}</h3>
                      <p className="text-amber-700">{event.description}</p>
                    </motion.div>
                  </div>
                  
                  {/* Timeline dot */}
                  <motion.div
                    whileHover={{ scale: 1.5 }}
                    className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-white z-10 cursor-pointer ${
                      activeTimeline === index ? 'bg-amber-500' : 'bg-amber-300'
                    }`}
                    onClick={() => setActiveTimeline(index)}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-800">Our Team</Badge>
            <h2 className="text-4xl font-bold text-amber-900 mb-4">The People Behind the Magic</h2>
            <p className="text-xl text-amber-700">Meet the passionate individuals who make every visit special</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card className="bg-white border-amber-200 hover:shadow-xl transition-all overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">{member.avatar}</div>
                    <h3 className="text-xl font-bold text-amber-900 mb-2">{member.name}</h3>
                    <p className="text-amber-600 font-medium mb-4">{member.role}</p>
                    <p className="text-amber-700 text-sm mb-4 leading-relaxed">{member.bio}</p>
                    <Badge className="bg-amber-100 text-amber-800 text-xs">
                      {member.specialty}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats & Certifications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-amber-100 text-amber-800">By the Numbers</Badge>
              <h3 className="text-3xl font-bold text-amber-900 mb-8">Our Impact</h3>
              <div className="grid grid-cols-2 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-4xl font-bold text-amber-600 mb-2">
                      {stat.value}{stat.suffix}
                    </div>
                    <div className="text-amber-700 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-green-100 text-green-800">Certifications</Badge>
              <h3 className="text-3xl font-bold text-amber-900 mb-8">Our Commitments</h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
                  >
                    <div className="text-3xl">{cert.icon}</div>
                    <div className="font-medium text-green-800">{cert.name}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
              Be Part of Our Story
            </h2>
            <p className="text-xl mb-12 max-w-2xl mx-auto">
              Every cup you enjoy, every moment you spend with us, adds a new chapter to our journey
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={() => onNavigate('locations')}
                className="bg-white text-amber-600 hover:bg-amber-50 px-8 py-4 text-lg rounded-full"
              >
                <MapPin className="mr-2 h-5 w-5" />
                Visit Us Today
              </Button>
              <Button
                onClick={() => onNavigate('contact')}
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg rounded-full"
              >
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}