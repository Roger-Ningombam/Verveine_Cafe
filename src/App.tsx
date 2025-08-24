import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Moon, Sun, Coffee, MapPin, Calendar, BookOpen, Star, Search, Menu as MenuIcon, X, Heart, Share2 } from 'lucide-react';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import CartPage from './components/CartPage';
import AccountPage from './components/AccountPage';
import CoffeeGuidePage from './components/CoffeeGuidePage';
import EventsPage from './components/EventsPage';
import LocationsPage from './components/LocationsPage';
import ProductPage from './components/ProductPage';
import CheckoutPage from './components/CheckoutPage';
import VirtualTourPage from './components/VirtualTourPage';
import { Button } from './components/ui/button';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  customizations?: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  loyaltyPoints: number;
  favoriteItems: string[];
}

 export type Page = 'home' | 'menu' | 'about' | 'contact' | 'cart' | 'account' | 'guide' | 'events' | 'locations' | 'product' | 'checkout' | 'tour';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simulate user login
    setUser({
      id: '1',
      name: 'Coffee Lover',
      email: 'lover@verveinecafe.com',
      loyaltyPoints: 1250,
      favoriteItems: ['espresso-large', 'cappuccino-medium']
    });
  }, []);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => 
        cartItem.id === item.id && 
        cartItem.size === item.size &&
        JSON.stringify(cartItem.customizations) === JSON.stringify(item.customizations)
      );
      
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem === existingItem
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart(prev => prev.map((item, i) => i === index ? { ...item, quantity } : item));
  };

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const navigateTo = (page: Page, productId?: string) => {
    setIsLoading(true);
    setSelectedProduct(productId || null);
    
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
      setShowMobileMenu(false);
    }, 300);
  };

  const navigationItems = [
    { id: 'home', label: 'Home', icon: Coffee },
    { id: 'menu', label: 'Menu', icon: MenuIcon },
    { id: 'about', label: 'About', icon: BookOpen },
    { id: 'guide', label: 'Coffee Guide', icon: Star },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'tour', label: 'Virtual Tour', icon: Coffee },
    { id: 'contact', label: 'Contact', icon: User },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigateTo} addToCart={addToCart} user={user} />;
      case 'menu':
        return <MenuPage onNavigate={navigateTo} addToCart={addToCart} user={user} searchQuery={searchQuery} />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage onNavigate={navigateTo} />;
      case 'cart':
        return <CartPage cart={cart} removeFromCart={removeFromCart} updateQuantity={updateCartQuantity} onNavigate={navigateTo} user={user} />;
      case 'account':
        return <AccountPage user={user} setUser={setUser} onNavigate={navigateTo} cart={cart} />;
      case 'guide':
        return <CoffeeGuidePage onNavigate={navigateTo} addToCart={addToCart} />;
      case 'events':
        return <EventsPage onNavigate={navigateTo} user={user} />;
      case 'locations':
        return <LocationsPage onNavigate={navigateTo} />;
      case 'product':
        return <ProductPage productId={selectedProduct} onNavigate={navigateTo} addToCart={addToCart} user={user} />;
      case 'checkout':
        return <CheckoutPage cart={cart} user={user} onNavigate={navigateTo} onOrderComplete={() => setCart([])} />;
      case 'tour':
        return <VirtualTourPage onNavigate={navigateTo} />;
      default:
        return <HomePage onNavigate={navigateTo} addToCart={addToCart} user={user} />;
    }
  };

  return (
    <TooltipProvider>
      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark' : ''}`}>
        {/* Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="fixed top-0 left-0 right-0 bg-[#f2efea]/95 backdrop-blur-md z-40 border-b border-amber-200/50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16 gap-x-4">
              {/* Logo */}
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 cursor-pointer whitespace-nowrap"
                onClick={() => navigateTo('home')}
              >
                <Coffee className="h-8 w-8 text-amber-600" />
                <span className="text-xl font-bold text-amber-900">Verveine Café</span>
              </motion.div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        onClick={() => navigateTo(item.id as Page)}
                        className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                          currentPage === item.id 
                            ? 'bg-amber-200 text-amber-900' 
                            : 'text-amber-800 hover:bg-amber-100'
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>

              {/* Right Side Actions */}
              <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSearch(!showSearch)}
                    className="text-amber-800 hover:bg-amber-100"
                  >
                    <Search className="h-4 w-4" />
                  </Button>
                  <AnimatePresence>
                    {showSearch && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95, x: 20 }}
                        className="absolute right-0 top-full mt-2 w-64"
                      >
                        <Input
                          placeholder="Search menu items..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="bg-white shadow-lg border-amber-200"
                          autoFocus
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Theme Toggle */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setDarkMode(!darkMode)}
                      className="text-amber-800 hover:bg-amber-100 hidden md:flex"
                    >
                      {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle {darkMode ? 'Light' : 'Dark'} Mode</p>
                  </TooltipContent>
                </Tooltip>

                {/* Cart */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateTo('cart')}
                      className="relative text-amber-800 hover:bg-amber-100"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      {getTotalItems() > 0 && (
                        <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-amber-600 text-white text-xs">
                          {getTotalItems()}
                        </Badge>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Cart ({getTotalItems()} items)</p>
                  </TooltipContent>
                </Tooltip>

                {/* User Account */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigateTo('account')}
                      className="text-amber-800 hover:bg-amber-100"
                    >
                      <User className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{user ? `${user.name} (${user.loyaltyPoints} pts)` : 'Account'}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Mobile Menu */}
                <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="lg:hidden text-amber-800">
                      <MenuIcon className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80 bg-[#f2efea]">
                    <div className="flex flex-col space-y-4 mt-8">
                      <div className="flex items-center space-x-3 pb-4 border-b border-amber-200">
                        <Coffee className="h-8 w-8 text-amber-600" />
                        <span className="text-xl font-bold text-amber-900">Verveine Café</span>
                      </div>
                      {navigationItems.map((item) => (
                        <Button
                          key={item.id}
                          variant="ghost"
                          onClick={() => navigateTo(item.id as Page)}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-left justify-start ${
                            currentPage === item.id 
                              ? 'bg-amber-200 text-amber-900' 
                              : 'text-amber-800 hover:bg-amber-100'
                          }`}
                        >
                          <item.icon className="h-5 w-5" />
                          <span className="font-medium">{item.label}</span>
                        </Button>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="pt-16 overflow-x-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating Action Button for Quick Order */}
        <div className="fixed bottom-6 right-6 z-30">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => navigateTo('menu')}
                className="w-14 h-14 rounded-full bg-amber-600 hover:bg-amber-700 text-white shadow-lg"
              >
                <Coffee className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Quick Order</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}