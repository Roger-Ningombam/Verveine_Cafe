import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coffee, Filter, Star, Heart, Plus, Minus, Search, Grid, List, Zap, Flame, Leaf, Award, Clock, ChefHat } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Slider } from './ui/slider';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Checkbox } from './ui/checkbox';
import classicCappuccinoImg from "../assets/classic-cappucino.png";
import traditionalespresso from "../assets/traditional-espresso.png";
import silkycafelatte from "../assets/silky-cafe-latte.png";
import smoothamericano from "../assets/smooth-americano.png";
import soothingchamomile from "../assets/soothing-chamomile.png";
import wildblueberrymuffin from "../assets/wild blueberry muffin.png";
import caramelMacchiatoImg from "../assets/caramel-macchiato.png";
import ceremonialMatchaLatteImg from "../assets/ceremonial-macha-latte.png";
import classicButterCroissantImg from "../assets/Classic Butter Croissant.png";
import classicEarlGreyImg from "../assets/classic-earl-grey.png";
import artisancinnamonroll from "../assets/Artisan Cinnamon Roll.png";
import cranberryOrangeSconeImg from "../assets/Cranberry Orange Scone.png";
import greenTeaImg from "../assets/green-tea.png";
import ironGoddessOolongImg from "../assets/Iron-Goddess-Oolong.png";
import jasminePhoenixPearlImg from "../assets/jasmine-pheonix-pearl.png";
import painAuChocolatImg from "../assets/Pain au Chocolat.png";
import raspberryDanishImg from "../assets/Raspberry Danish.png";
import richChocolateMochaImg from "../assets/rich-chocolate-mocha.png";
import { CartItem, User } from '../App';
import type { Page } from '../App';

interface MenuPageProps {
  onNavigate: (page: Page, productId?: string) => void;
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  user: User | null;
  searchQuery: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  category: string;
  prices: { size: string; price: number }[];
  image: string;
  rating: number;
  reviews: number;
  tags: string[];
  popularity: number;
  customizations: string[];
  nutritionInfo: {
    calories: number;
    caffeine: number;
    sugar: number;
  };
  preparationTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  origin?: string;
  isVegan: boolean;
  isOrganic: boolean;
  isDecaf: boolean;
  isNew: boolean;
  isPopular: boolean;
}

export default function MenuPage({ onNavigate, addToCart, user, searchQuery }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 20]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<MenuItem | null>(null);
  const [customizations, setCustomizations] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState('Medium');
  const [quantity, setQuantity] = useState(1);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const menuItems: MenuItem[] = [
    // COFFEE ITEMS (6)
    {
      id: 'espresso-traditional',
      name: 'Traditional Espresso',
      description: 'Rich, bold espresso shot with perfect crema',
      category: 'coffee',
      prices: [
        { size: 'Single', price: 3.00 },
        { size: 'Double', price: 5.00 },
        { size: 'Triple', price: 7.00 }
      ],
      image: traditionalespresso,
      rating: 4.8,
      reviews: 342,
      tags: ['bold', 'traditional', 'quick'],
      popularity: 95,
      customizations: ['Extra Hot', 'Extra Strong', 'Decaf', 'Organic'],
      nutritionInfo: { calories: 5, caffeine: 75, sugar: 0 },
      preparationTime: 2,
      difficulty: 'Medium',
      origin: 'Italy',
      isVegan: true,
      isOrganic: true,
      isDecaf: false,
      isNew: false,
      isPopular: true
    },
    {
      id: 'cappuccino-classic',
      name: 'Classic Cappuccino',
      description: 'Perfect balance of espresso, steamed milk, and foam',
      category: 'coffee',
      prices: [
        { size: 'Small', price: 4.50 },
        { size: 'Medium', price: 6.00 },
        { size: 'Large', price: 7.50 }
      ],
      image: classicCappuccinoImg,
      rating: 4.9,
      reviews: 578,
      tags: ['creamy', 'balanced', 'popular'],
      popularity: 98,
      customizations: ['Oat Milk', 'Almond Milk', 'Extra Foam', 'Cinnamon', 'Vanilla'],
      nutritionInfo: { calories: 120, caffeine: 65, sugar: 8 },
      preparationTime: 4,
      difficulty: 'Medium',
      origin: 'Italy',
      isVegan: false,
      isOrganic: true,
      isDecaf: false,
      isNew: false,
      isPopular: true
    },
    {
      id: 'americano-smooth',
      name: 'Smooth Americano',
      description: 'Espresso with hot water for a smooth, clean taste',
      category: 'coffee',
      prices: [
        { size: 'Small', price: 3.50 },
        { size: 'Medium', price: 5.00 },
        { size: 'Large', price: 6.50 }
      ],
      image: smoothamericano,
      rating: 4.6,
      reviews: 234,
      tags: ['smooth', 'clean', 'mild'],
      popularity: 78,
      customizations: ['Extra Shot', 'Light Roast', 'Dark Roast', 'Decaf'],
      nutritionInfo: { calories: 10, caffeine: 95, sugar: 0 },
      preparationTime: 3,
      difficulty: 'Easy',
      origin: 'USA',
      isVegan: true,
      isOrganic: true,
      isDecaf: false,
      isNew: false,
      isPopular: false
    },
    {
      id: 'latte-silky',
      name: 'Silky Café Latte',
      description: 'Smooth espresso with perfectly steamed milk and microfoam',
      category: 'coffee',
      prices: [
        { size: 'Small', price: 5.00 },
        { size: 'Medium', price: 6.50 },
        { size: 'Large', price: 8.00 }
      ],
      image: silkycafelatte,
      rating: 4.7,
      reviews: 445,
      tags: ['smooth', 'milky', 'comforting'],
      popularity: 89,
      customizations: ['Vanilla Syrup', 'Caramel Syrup', 'Coconut Milk', 'Extra Shot', 'Decaf'],
      nutritionInfo: { calories: 150, caffeine: 75, sugar: 12 },
      preparationTime: 5,
      difficulty: 'Medium',
      origin: 'Italy',
      isVegan: false,
      isOrganic: true,
      isDecaf: false,
      isNew: false,
      isPopular: true
    },
    {
      id: 'mocha-chocolate',
      name: 'Rich Chocolate Mocha',
      description: 'Decadent blend of espresso, steamed milk, and premium chocolate',
      category: 'coffee',
      prices: [
        { size: 'Small', price: 5.50 },
        { size: 'Medium', price: 7.00 },
        { size: 'Large', price: 8.50 }
      ],
      image: richChocolateMochaImg,
      rating: 4.8,
      reviews: 367,
      tags: ['chocolate', 'sweet', 'indulgent'],
      popularity: 85,
      customizations: ['Whipped Cream', 'Extra Chocolate', 'Dark Chocolate', 'White Chocolate', 'Marshmallows'],
      nutritionInfo: { calories: 220, caffeine: 85, sugar: 25 },
      preparationTime: 6,
      difficulty: 'Medium',
      origin: 'USA',
      isVegan: false,
      isOrganic: false,
      isDecaf: false,
      isNew: false,
      isPopular: true
    },
    {
      id: 'macchiato-caramel',
      name: 'Caramel Macchiato',
      description: 'Vanilla-flavored latte marked with espresso and caramel drizzle',
      category: 'coffee',
      prices: [
        { size: 'Small', price: 5.25 },
        { size: 'Medium', price: 6.75 },
        { size: 'Large', price: 8.25 }
      ],
      image: caramelMacchiatoImg,
      rating: 4.6,
      reviews: 298,
      tags: ['sweet', 'caramel', 'layered'],
      popularity: 82,
      customizations: ['Extra Caramel', 'Sugar-Free Vanilla', 'Almond Milk', 'Extra Shot', 'Iced'],
      nutritionInfo: { calories: 190, caffeine: 75, sugar: 32 },
      preparationTime: 5,
      difficulty: 'Medium',
      origin: 'USA',
      isVegan: false,
      isOrganic: false,
      isDecaf: false,
      isNew: true,
      isPopular: false
    },

    // TEA ITEMS (6)
    {
      id: 'green-tea-premium',
      name: 'Premium Green Tea',
      description: 'Antioxidant-rich organic green tea with delicate flavor',
      category: 'tea',
      prices: [
        { size: 'Small', price: 3.00 },
        { size: 'Medium', price: 4.50 },
        { size: 'Large', price: 6.00 }
      ],
      image: greenTeaImg,
      rating: 4.7,
      reviews: 189,
      tags: ['healthy', 'antioxidant', 'organic'],
      popularity: 82,
      customizations: ['Honey', 'Lemon', 'Mint', 'Extra Strong'],
      nutritionInfo: { calories: 2, caffeine: 25, sugar: 0 },
      preparationTime: 5,
      difficulty: 'Easy',
      origin: 'Japan',
      isVegan: true,
      isOrganic: true,
      isDecaf: false,
      isNew: false,
      isPopular: false
    },
    {
      id: 'matcha-latte-ceremonial',
      name: 'Ceremonial Matcha Latte',
      description: 'Premium ceremonial grade matcha with steamed milk',
      category: 'tea',
      prices: [
        { size: 'Small', price: 5.50 },
        { size: 'Medium', price: 7.00 },
        { size: 'Large', price: 8.50 }
      ],
      image: ceremonialMatchaLatteImg,
      rating: 4.9,
      reviews: 423,
      tags: ['premium', 'ceremonial', 'antioxidant', 'zen'],
      popularity: 91,
      customizations: ['Oat Milk', 'Coconut Milk', 'Extra Matcha', 'Vanilla', 'Agave'],
      nutritionInfo: { calories: 140, caffeine: 70, sugar: 12 },
      preparationTime: 6,
      difficulty: 'Hard',
      origin: 'Japan',
      isVegan: false,
      isOrganic: true,
      isDecaf: false,
      isNew: true,
      isPopular: true
    },
    {
      id: 'earl-grey-classic',
      name: 'Classic Earl Grey',
      description: 'Traditional black tea blend with bergamot oil and cornflower petals',
      category: 'tea',
      prices: [
        { size: 'Small', price: 3.25 },
        { size: 'Medium', price: 4.75 },
        { size: 'Large', price: 6.25 }
      ],
      image: classicEarlGreyImg,
      rating: 4.5,
      reviews: 156,
      tags: ['classic', 'bergamot', 'floral'],
      popularity: 75,
      customizations: ['Milk', 'Lemon', 'Honey', 'Sugar', 'Lavender'],
      nutritionInfo: { calories: 2, caffeine: 40, sugar: 0 },
      preparationTime: 4,
      difficulty: 'Easy',
      origin: 'England',
      isVegan: true,
      isOrganic: false,
      isDecaf: false,
      isNew: false,
      isPopular: false
    },
    {
      id: 'chamomile-soothing',
      name: 'Soothing Chamomile',
      description: 'Calming herbal tea with gentle floral notes, naturally caffeine-free',
      category: 'tea',
      prices: [
        { size: 'Small', price: 3.00 },
        { size: 'Medium', price: 4.50 },
        { size: 'Large', price: 6.00 }
      ],
      image: soothingchamomile,
      rating: 4.4,
      reviews: 134,
      tags: ['herbal', 'calming', 'floral', 'caffeine-free'],
      popularity: 68,
      customizations: ['Honey', 'Lavender', 'Lemon', 'Ginger'],
      nutritionInfo: { calories: 1, caffeine: 0, sugar: 0 },
      preparationTime: 5,
      difficulty: 'Easy',
      origin: 'Egypt',
      isVegan: true,
      isOrganic: true,
      isDecaf: true,
      isNew: false,
      isPopular: false
    },
    {
      id: 'jasmine-phoenix-pearls',
      name: 'Jasmine Phoenix Pearls',
      description: 'Hand-rolled green tea pearls scented with fresh jasmine flowers',
      category: 'tea',
      prices: [
        { size: 'Small', price: 4.00 },
        { size: 'Medium', price: 5.50 },
        { size: 'Large', price: 7.00 }
      ],
      image: jasminePhoenixPearlImg,
      rating: 4.8,
      reviews: 89,
      tags: ['jasmine', 'floral', 'premium', 'hand-rolled'],
      popularity: 73,
      customizations: ['Extra Steeping', 'Light Brew', 'Honey', 'No Sweetener'],
      nutritionInfo: { calories: 2, caffeine: 30, sugar: 0 },
      preparationTime: 6,
      difficulty: 'Medium',
      origin: 'China',
      isVegan: true,
      isOrganic: true,
      isDecaf: false,
      isNew: false,
      isPopular: false
    },
    {
      id: 'oolong-iron-goddess',
      name: 'Iron Goddess Oolong',
      description: 'Traditional semi-fermented tea with complex floral and fruity notes',
      category: 'tea',
      prices: [
        { size: 'Small', price: 4.50 },
        { size: 'Medium', price: 6.00 },
        { size: 'Large', price: 7.50 }
      ],
      image: ironGoddessOolongImg,
      rating: 4.6,
      reviews: 67,
      tags: ['traditional', 'complex', 'fruity', 'premium'],
      popularity: 65,
      customizations: ['Multiple Infusions', 'Light Roast', 'Dark Roast', 'Gongfu Style'],
      nutritionInfo: { calories: 2, caffeine: 35, sugar: 0 },
      preparationTime: 7,
      difficulty: 'Hard',
      origin: 'China',
      isVegan: true,
      isOrganic: true,
      isDecaf: false,
      isNew: true,
      isPopular: false
    },

    // PASTRY ITEMS (6)
    {
      id: 'croissant-butter',
      name: 'Classic Butter Croissant',
      description: 'Flaky, buttery pastry baked fresh daily with French technique',
      category: 'pastries',
      prices: [
        { size: 'Regular', price: 4.50 }
      ],
      image: classicButterCroissantImg,
      rating: 4.8,
      reviews: 312,
      tags: ['fresh', 'buttery', 'flaky', 'french'],
      popularity: 88,
      customizations: ['Warmed', 'Almond Filling', 'Ham & Cheese'],
      nutritionInfo: { calories: 250, caffeine: 0, sugar: 8 },
      preparationTime: 1,
      difficulty: 'Easy',
      origin: 'France',
      isVegan: false,
      isOrganic: false,
      isDecaf: true,
      isNew: false,
      isPopular: true
    },
    {
      id: 'croissant-chocolate',
      name: 'Pain au Chocolat',
      description: 'Traditional French pastry with rich dark chocolate batons',
      category: 'pastries',
      prices: [
        { size: 'Regular', price: 5.25 }
      ],
      image: painAuChocolatImg,
      rating: 4.9,
      reviews: 267,
      tags: ['chocolate', 'french', 'indulgent', 'traditional'],
      popularity: 92,
      customizations: ['Warmed', 'Extra Chocolate', 'Powdered Sugar'],
      nutritionInfo: { calories: 320, caffeine: 5, sugar: 18 },
      preparationTime: 2,
      difficulty: 'Easy',
      origin: 'France',
      isVegan: false,
      isOrganic: false,
      isDecaf: true,
      isNew: false,
      isPopular: true
    },
    {
      id: 'muffin-blueberry',
      name: 'Wild Blueberry Muffin',
      description: 'Moist muffin bursting with fresh wild blueberries and lemon zest',
      category: 'pastries',
      prices: [
        { size: 'Regular', price: 4.75 }
      ],
      image: wildblueberrymuffin,
      rating: 4.6,
      reviews: 198,
      tags: ['fresh', 'fruity', 'moist', 'morning'],
      popularity: 79,
      customizations: ['Warmed', 'Butter', 'Gluten-Free', 'Sugar-Free'],
      nutritionInfo: { calories: 280, caffeine: 0, sugar: 22 },
      preparationTime: 1,
      difficulty: 'Easy',
      origin: 'USA',
      isVegan: false,
      isOrganic: true,
      isDecaf: true,
      isNew: false,
      isPopular: false
    },
    {
      id: 'cinnamon-roll',
      name: 'Artisan Cinnamon Roll',
      description: 'Warm, gooey cinnamon roll with cream cheese frosting',
      category: 'pastries',
      prices: [
        { size: 'Regular', price: 5.50 }
      ],
      image: artisancinnamonroll,
      rating: 4.7,
      reviews: 234,
      tags: ['cinnamon', 'sweet', 'gooey', 'comfort'],
      popularity: 84,
      customizations: ['Extra Frosting', 'Warmed', 'No Nuts', 'Gluten-Free'],
      nutritionInfo: { calories: 380, caffeine: 0, sugar: 35 },
      preparationTime: 2,
      difficulty: 'Easy',
      origin: 'Sweden',
      isVegan: false,
      isOrganic: false,
      isDecaf: true,
      isNew: false,
      isPopular: true
    },
    {
      id: 'danish-raspberry',
      name: 'Raspberry Danish',
      description: 'Buttery puff pastry filled with sweet raspberry jam and almond cream',
      category: 'pastries',
      prices: [
        { size: 'Regular', price: 5.00 }
      ],
      image: raspberryDanishImg,
      rating: 4.5,
      reviews: 145,
      tags: ['raspberry', 'flaky', 'fruity', 'danish'],
      popularity: 71,
      customizations: ['Warmed', 'Extra Jam', 'Powdered Sugar', 'Almond Glaze'],
      nutritionInfo: { calories: 290, caffeine: 0, sugar: 20 },
      preparationTime: 1,
      difficulty: 'Easy',
      origin: 'Denmark',
      isVegan: false,
      isOrganic: false,
      isDecaf: true,
      isNew: false,
      isPopular: false
    },
    {
      id: 'scone-cranberry',
      name: 'Cranberry Orange Scone',
      description: 'Traditional British scone with dried cranberries and orange zest',
      category: 'pastries',
      prices: [
        { size: 'Regular', price: 4.25 }
      ],
      image: cranberryOrangeSconeImg,
      rating: 4.4,
      reviews: 112,
      tags: ['traditional', 'cranberry', 'orange', 'british'],
      popularity: 66,
      customizations: ['Clotted Cream', 'Jam', 'Butter', 'Warmed'],
      nutritionInfo: { calories: 240, caffeine: 0, sugar: 16 },
      preparationTime: 1,
      difficulty: 'Easy',
      origin: 'United Kingdom',
      isVegan: false,
      isOrganic: false,
      isDecaf: true,
      isNew: true,
      isPopular: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Items', icon: Grid },
    { id: 'coffee', name: 'Coffee', icon: Coffee },
    { id: 'tea', name: 'Tea', icon: Leaf },
    { id: 'pastries', name: 'Pastries', icon: ChefHat }
  ];

  const allTags = Array.from(new Set(menuItems.flatMap(item => item.tags)));

  const filteredItems = useMemo(() => {
    let filtered = menuItems.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      
      // Search filter
      const searchTerm = localSearch.toLowerCase();
      if (searchTerm && !item.name.toLowerCase().includes(searchTerm) && 
          !item.description.toLowerCase().includes(searchTerm) &&
          !item.tags.some(tag => tag.toLowerCase().includes(searchTerm))) return false;
      
      // Price filter
      const minPrice = Math.min(...item.prices.map(p => p.price));
      const maxPrice = Math.max(...item.prices.map(p => p.price));
      if (minPrice > priceRange[1] || maxPrice < priceRange[0]) return false;
      
      // Tags filter
      if (selectedTags.length > 0 && !selectedTags.some(tag => item.tags.includes(tag))) return false;
      
      return true;
    });

    // Sort items
    switch (sortBy) {
      case 'popularity':
        filtered.sort((a, b) => b.popularity - a.popularity);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => Math.min(...a.prices.map(p => p.price)) - Math.min(...b.prices.map(p => p.price)));
        break;
      case 'price-high':
        filtered.sort((a, b) => Math.max(...b.prices.map(p => p.price)) - Math.max(...a.prices.map(p => p.price)));
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return filtered;
  }, [selectedCategory, localSearch, priceRange, selectedTags, sortBy]);

  const handleAddToCart = (item: MenuItem, size: string, customizations: string[]) => {
    const sizePrice = item.prices.find(p => p.size === size);
    if (!sizePrice) return;

    addToCart({
      id: `${item.id}-${size}`,
      name: item.name,
      price: sizePrice.price,
      size: size,
      image: item.image,
      customizations
    });
  };

  const openProductDialog = (item: MenuItem) => {
    setSelectedProduct(item);
    setSelectedSize(item.prices[0].size);
    setCustomizations([]);
    setQuantity(1);
  };

  const getCurrentPrice = () => {
    if (!selectedProduct) return 0;
    const sizePrice = selectedProduct.prices.find(p => p.size === selectedSize);
    return sizePrice ? sizePrice.price * quantity : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-800">Our Menu</Badge>
          <h1 className="text-5xl font-bold text-amber-900 mb-4">Crafted with Love</h1>
          <p className="text-xl text-amber-700 max-w-2xl mx-auto">
            Every item on our menu is carefully crafted using the finest ingredients and traditional techniques
          </p>
        </motion.div>

        {/* Search and Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 space-y-4"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-amber-500" />
              <Input
                placeholder="Search menu items..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="pl-10 bg-white border-amber-200 focus:border-amber-400"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4">
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="border-amber-300 text-amber-700 hover:bg-amber-100"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 border-amber-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === 'grid' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-lg p-6 border border-amber-200 shadow-sm"
              >
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div>
                    <Label className="text-amber-900 font-medium">Price Range</Label>
                    <div className="mt-3">
                      <Slider
                        value={priceRange}
                        onValueChange={setPriceRange}
                        max={20}
                        step={0.5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-amber-600 mt-1">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <Label className="text-amber-900 font-medium">Tags</Label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {allTags.slice(0, 6).map(tag => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className={`cursor-pointer transition-colors ${
                            selectedTags.includes(tag) 
                              ? 'bg-amber-600 text-white' 
                              : 'text-amber-700 border-amber-300 hover:bg-amber-100'
                          }`}
                          onClick={() => {
                            setSelectedTags(prev => 
                              prev.includes(tag) 
                                ? prev.filter(t => t !== tag)
                                : [...prev, tag]
                            );
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Dietary Filters */}
                  <div>
                    <Label className="text-amber-900 font-medium">Dietary</Label>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="vegan" />
                        <Label htmlFor="vegan" className="text-sm">Vegan</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="organic" />
                        <Label htmlFor="organic" className="text-sm">Organic</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="decaf" />
                        <Label htmlFor="decaf" className="text-sm">Decaf</Label>
                      </div>
                    </div>
                  </div>

                  {/* Quick Filters */}
                  <div>
                    <Label className="text-amber-900 font-medium">Quick Filters</Label>
                    <div className="mt-3 space-y-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-amber-700 border-amber-300"
                        onClick={() => setSelectedTags(['popular'])}
                      >
                        <Star className="h-4 w-4 mr-2" />
                        Popular Items
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start text-amber-700 border-amber-300"
                        onClick={() => setSelectedTags(['new'])}
                      >
                        <Zap className="h-4 w-4 mr-2" />
                        New Items
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-white border border-amber-200">
              {categories.map(category => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex items-center gap-2 data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900"
                >
                  <category.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {viewMode === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full bg-white border-amber-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      <div 
                        className="h-48 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url('${item.image}')` }}
                      />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-1">
                        {item.isNew && (
                          <Badge className="bg-green-500 text-white">New</Badge>
                        )}
                        {item.isPopular && (
                          <Badge className="bg-orange-500 text-white">Popular</Badge>
                        )}
                        {item.isOrganic && (
                          <Badge className="bg-green-600 text-white">Organic</Badge>
                        )}
                      </div>

                      {/* Heart Icon */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute top-3 right-3 p-2 bg-white/80 rounded-full shadow-md hover:bg-white transition-colors"
                      >
                        <Heart className={`h-4 w-4 ${user?.favoriteItems.includes(item.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
                      </motion.button>
                    </div>

                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-bold text-amber-900 text-lg line-clamp-1">{item.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-amber-700">{item.rating}</span>
                        </div>
                      </div>

                      <p className="text-amber-700 text-sm mb-3 line-clamp-2">{item.description}</p>

                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="h-4 w-4 text-amber-600" />
                        <span className="text-sm text-amber-600">{item.preparationTime} min</span>
                        {item.difficulty === 'Hard' && <Flame className="h-4 w-4 text-red-500" />}
                        {item.isVegan && <Leaf className="h-4 w-4 text-green-500" />}
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {item.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs border-amber-300 text-amber-700">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-amber-900">
                          <span className="text-lg font-bold">
                            ${Math.min(...item.prices.map(p => p.price))}
                          </span>
                          {item.prices.length > 1 && (
                            <span className="text-sm text-amber-600"> - ${Math.max(...item.prices.map(p => p.price))}</span>
                          )}
                        </div>

                        <Button
                          onClick={() => openProductDialog(item)}
                          className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Add
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                >
                  <Card className="bg-white border-amber-200 hover:shadow-lg transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-6">
                        <div 
                          className="w-24 h-24 bg-cover bg-center rounded-lg flex-shrink-0"
                          style={{ backgroundImage: `url('${item.image}')` }}
                        />
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-amber-900">{item.name}</h3>
                              <p className="text-amber-700">{item.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Star className="h-4 w-4 text-yellow-400 fill-current" />
                              <span className="text-amber-700">{item.rating}</span>
                              <span className="text-amber-600 text-sm">({item.reviews})</span>
                            </div>
                          </div>

                          <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-amber-600" />
                              <span className="text-sm text-amber-600">{item.preparationTime} min</span>
                            </div>
                            {item.origin && (
                              <Badge variant="outline" className="border-amber-300 text-amber-700">
                                {item.origin}
                              </Badge>
                            )}
                            {item.isVegan && <Leaf className="h-4 w-4 text-green-500" />}
                            {item.isOrganic && <Badge className="bg-green-100 text-green-800">Organic</Badge>}
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                              {item.tags.slice(0, 4).map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs border-amber-300 text-amber-700">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center gap-4">
                              <div className="text-amber-900">
                                <span className="text-xl font-bold">
                                  ${Math.min(...item.prices.map(p => p.price))}
                                </span>
                                {item.prices.length > 1 && (
                                  <span className="text-sm text-amber-600"> - ${Math.max(...item.prices.map(p => p.price))}</span>
                                )}
                              </div>
                              <Button
                                onClick={() => openProductDialog(item)}
                                className="bg-amber-600 hover:bg-amber-700 text-white"
                              >
                                <Plus className="h-4 w-4 mr-2" />
                                Customize & Add
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Coffee className="h-16 w-16 text-amber-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-amber-900 mb-2">No items found</h3>
            <p className="text-amber-700 mb-6">Try adjusting your filters or search terms</p>
            <Button
              onClick={() => {
                setSelectedCategory('all');
                setLocalSearch('');
                setSelectedTags([]);
                setPriceRange([0, 20]);
              }}
              variant="outline"
              className="border-amber-300 text-amber-700 hover:bg-amber-100"
            >
              Clear all filters
            </Button>
          </motion.div>
        )}

        {/* Product Customization Dialog */}
        <Dialog open={selectedProduct !== null} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-amber-900">
                    Customize Your {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6">
                  {/* Product Image and Info */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div 
                        className="w-full h-64 bg-cover bg-center rounded-lg"
                        style={{ backgroundImage: `url('${selectedProduct.image}')` }}
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-medium text-amber-900">{selectedProduct.rating}</span>
                        <span className="text-amber-600">({selectedProduct.reviews} reviews)</span>
                      </div>
                      <p className="text-amber-700 mb-4">{selectedProduct.description}</p>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-amber-700">Preparation Time:</span>
                          <span className="text-amber-900">{selectedProduct.preparationTime} minutes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-amber-700">Calories:</span>
                          <span className="text-amber-900">{selectedProduct.nutritionInfo.calories}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-amber-700">Caffeine:</span>
                          <span className="text-amber-900">{selectedProduct.nutritionInfo.caffeine}mg</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div>
                    <Label className="text-lg font-medium text-amber-900 mb-3 block">Choose Size</Label>
                    <div className="grid grid-cols-3 gap-3">
                      {selectedProduct.prices.map(price => (
                        <motion.button
                          key={price.size}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setSelectedSize(price.size)}
                          className={`p-4 border-2 rounded-lg text-center transition-colors ${
                            selectedSize === price.size
                              ? 'border-amber-500 bg-amber-50 text-amber-900'
                              : 'border-amber-200 text-amber-700 hover:border-amber-300'
                          }`}
                        >
                          <div className="font-medium">{price.size}</div>
                          <div className="text-lg font-bold">${price.price}</div>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Customizations */}
                  {selectedProduct.customizations.length > 0 && (
                    <div>
                      <Label className="text-lg font-medium text-amber-900 mb-3 block">Customizations</Label>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {selectedProduct.customizations.map(customization => (
                          <motion.button
                            key={customization}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                              setCustomizations(prev => 
                                prev.includes(customization)
                                  ? prev.filter(c => c !== customization)
                                  : [...prev, customization]
                              );
                            }}
                            className={`p-3 border-2 rounded-lg text-left transition-colors ${
                              customizations.includes(customization)
                                ? 'border-amber-500 bg-amber-50 text-amber-900'
                                : 'border-amber-200 text-amber-700 hover:border-amber-300'
                            }`}
                          >
                            {customization}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Quantity */}
                  <div>
                    <Label className="text-lg font-medium text-amber-900 mb-3 block">Quantity</Label>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="border-amber-300 text-amber-700"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="text-xl font-bold text-amber-900 min-w-[3rem] text-center">{quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                        className="border-amber-300 text-amber-700"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Add to Cart */}
                  <div className="flex items-center justify-between pt-6 border-t border-amber-200">
                    <div className="text-2xl font-bold text-amber-900">
                      Total: ${getCurrentPrice().toFixed(2)}
                    </div>
                    <Button
                      onClick={() => {
                        for (let i = 0; i < quantity; i++) {
                          handleAddToCart(selectedProduct, selectedSize, customizations);
                        }
                        setSelectedProduct(null);
                      }}
                      className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 text-lg"
                    >
                      <Coffee className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}