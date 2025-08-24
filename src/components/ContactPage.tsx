import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Coffee, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { Page } from '../App';

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "Mon-Sun: 6AM - 10PM"],
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["hello@verveinecafe.com", "We reply within 24 hours"],
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: MapPin,
      title: "Location",
      details: ["123 Coffee Street", "Downtown, City 12345"],
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["Mon-Fri: 6AM - 9PM", "Sat-Sun: 7AM - 10PM"],
      color: "from-amber-500 to-orange-500"
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form or show success message
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge className="mb-6 bg-white/20 text-white border-white/30 text-lg px-4 py-2">
              Get in Touch
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              We'd Love to 
              <span className="text-amber-200"> Hear from You</span>
            </h1>
            <p className="text-xl lg:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Whether you have questions, feedback, or just want to say hello, 
              we're here to make your coffee experience exceptional.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-800">Contact Information</Badge>
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Multiple Ways to Connect</h2>
            <p className="text-xl text-amber-700">Choose the method that works best for you</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
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
                      className={`inline-block p-6 bg-gradient-to-r ${info.color} rounded-full mb-6 group-hover:shadow-lg`}
                    >
                      <info.icon className="h-8 w-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-bold text-amber-900 mb-4">{info.title}</h3>
                    <div className="space-y-2">
                      {info.details.map((detail, i) => (
                        <p key={i} className={`text-amber-700 ${i === 0 ? 'font-medium' : 'text-sm'}`}>
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-amber-100 text-amber-800">Send us a Message</Badge>
              <h2 className="text-4xl font-bold text-amber-900 mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-amber-700 mb-8 text-lg">
                Fill out the form below and we'll get back to you as soon as possible. 
                We value every message and strive to respond within 24 hours.
              </p>

              <Card className="bg-white border-amber-200 shadow-lg">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-amber-900 font-medium">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="mt-2 border-amber-300 focus:border-amber-500"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="email" className="text-amber-900 font-medium">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="mt-2 border-amber-300 focus:border-amber-500"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject" className="text-amber-900 font-medium">Subject</Label>
                      <Select value={formData.subject} onValueChange={(value) => handleInputChange('subject', value)}>
                        <SelectTrigger className="mt-2 border-amber-300 focus:border-amber-500">
                          <SelectValue placeholder="What's this about?" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">General Inquiry</SelectItem>
                          <SelectItem value="feedback">Feedback</SelectItem>
                          <SelectItem value="catering">Catering Services</SelectItem>
                          <SelectItem value="events">Private Events</SelectItem>
                          <SelectItem value="careers">Career Opportunities</SelectItem>
                          <SelectItem value="support">Customer Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-amber-900 font-medium">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                        className="mt-2 border-amber-300 focus:border-amber-500 min-h-[120px]"
                        placeholder="Tell us more about your inquiry..."
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 text-lg"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* FAQ */}
              <Card className="bg-white border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-amber-600" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium text-amber-900 mb-2">What are your hours?</h4>
                    <p className="text-amber-700 text-sm">Monday-Friday: 6AM-9PM, Weekends: 7AM-10PM</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-900 mb-2">Do you offer catering?</h4>
                    <p className="text-amber-700 text-sm">Yes! We provide catering for events of all sizes. Contact us for details.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-amber-900 mb-2">Can I reserve a table?</h4>
                    <p className="text-amber-700 text-sm">We operate on a first-come, first-served basis, but we accept reservations for groups of 6+.</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-r from-amber-100 to-orange-100 border-amber-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button
                      onClick={() => onNavigate('menu')}
                      variant="outline"
                      className="w-full justify-start border-amber-300 text-amber-700 hover:bg-amber-200"
                    >
                      <Coffee className="mr-2 h-4 w-4" />
                      View Our Menu
                    </Button>
                    <Button
                      onClick={() => onNavigate('locations')}
                      variant="outline"
                      className="w-full justify-start border-amber-300 text-amber-700 hover:bg-amber-200"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      Find Our Location
                    </Button>
                    <Button
                      onClick={() => onNavigate('events')}
                      variant="outline"
                      className="w-full justify-start border-amber-300 text-amber-700 hover:bg-amber-200"
                    >
                      <Star className="mr-2 h-4 w-4" />
                      Upcoming Events
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="bg-white border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-amber-600" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-amber-700">Monday - Friday</span>
                      <span className="text-amber-900 font-medium">6:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Saturday</span>
                      <span className="text-amber-900 font-medium">7:00 AM - 10:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Sunday</span>
                      <span className="text-amber-900 font-medium">7:00 AM - 10:00 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section Placeholder */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge className="mb-4 bg-amber-100 text-amber-800">Visit Us</Badge>
            <h2 className="text-4xl font-bold text-amber-900 mb-4">Find Our Location</h2>
            <p className="text-xl text-amber-700">Located in the heart of downtown</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg p-12 text-center border border-amber-200"
          >
            <MapPin className="h-16 w-16 text-amber-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-amber-900 mb-2">Interactive Map Coming Soon</h3>
            <p className="text-amber-700 mb-6">
              We're working on integrating an interactive map to help you find us easily.
            </p>
            <div className="text-amber-800">
              <p className="font-medium">123 Coffee Street</p>
              <p>Downtown, City 12345</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}