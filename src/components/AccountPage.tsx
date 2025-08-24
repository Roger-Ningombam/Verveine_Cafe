import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User as UserIcon, Star, Coffee, Heart, Settings, Gift, Crown, Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { CartItem, User } from '../App';
import type { Page } from '../App';

interface AccountPageProps {
  user: User | null;
  setUser: (user: User | null) => void;
  onNavigate: (page: Page) => void;
  cart: CartItem[];
}

export default function AccountPage({ user, setUser, onNavigate, cart }: AccountPageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <UserIcon className="h-16 w-16 text-amber-400 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-amber-900 mb-4">Sign In Required</h1>
          <p className="text-amber-700 mb-8">
            Please sign in to access your account and loyalty rewards.
          </p>
          <Button
            onClick={() => onNavigate('home')}
            className="bg-amber-600 hover:bg-amber-700 text-white"
          >
            Back to Home
          </Button>
        </motion.div>
      </div>
    );
  }

  const loyaltyTiers = [
    { name: 'Bronze', min: 0, max: 499, color: 'from-orange-400 to-orange-600' },
    { name: 'Silver', min: 500, max: 999, color: 'from-gray-400 to-gray-600' },
    { name: 'Gold', min: 1000, max: 2499, color: 'from-yellow-400 to-yellow-600' },
    { name: 'Platinum', min: 2500, max: Infinity, color: 'from-purple-400 to-purple-600' }
  ];

  const getCurrentTier = () => {
    return loyaltyTiers.find(tier => user.loyaltyPoints >= tier.min && user.loyaltyPoints < tier.max) || loyaltyTiers[0];
  };

  const getNextTier = () => {
    const currentTier = getCurrentTier();
    const currentIndex = loyaltyTiers.indexOf(currentTier);
    return currentIndex < loyaltyTiers.length - 1 ? loyaltyTiers[currentIndex + 1] : null;
  };

  const currentTier = getCurrentTier();
  const nextTier = getNextTier();
  const progressToNext = nextTier ? ((user.loyaltyPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100;

  const recentOrders = [
    { id: '1', date: '2024-01-15', items: ['Cappuccino Large', 'Butter Croissant'], total: 11.50, status: 'Completed' },
    { id: '2', date: '2024-01-12', items: ['Americano Medium', 'Green Tea Small'], total: 8.50, status: 'Completed' },
    { id: '3', date: '2024-01-10', items: ['Espresso Double', 'Matcha Latte Large'], total: 12.50, status: 'Completed' }
  ];

  const handleSaveProfile = () => {
    if (editedUser) {
      setUser(editedUser);
      setIsEditing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Badge className="mb-4 bg-amber-100 text-amber-800">My Account</Badge>
          <h1 className="text-4xl font-bold text-amber-900 mb-2">Welcome back, {user.name}!</h1>
          <p className="text-amber-700">Manage your profile and track your coffee journey</p>
        </motion.div>

        {/* Loyalty Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className={`bg-gradient-to-r ${currentTier.color} text-white border-0 shadow-xl`}>
            <CardContent className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Crown className="h-12 w-12" />
                  <div>
                    <h2 className="text-2xl font-bold">{currentTier.name} Member</h2>
                    <p className="opacity-90">{user.loyaltyPoints} loyalty points</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{user.loyaltyPoints}</div>
                  <div className="text-sm opacity-90">Total Points</div>
                </div>
              </div>
              
              {nextTier && (
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress to {nextTier.name}</span>
                    <span>{nextTier.min - user.loyaltyPoints} points to go</span>
                  </div>
                  <Progress value={progressToNext} className="h-2 bg-white/20" />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 bg-white border border-amber-200">
            <TabsTrigger value="profile" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              Orders
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              Favorites
            </TabsTrigger>
            <TabsTrigger value="rewards" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-900">
              Rewards
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="bg-white border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-900 flex items-center gap-2">
                      <UserIcon className="h-5 w-5" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={editedUser?.name || ''}
                            onChange={(e) => setEditedUser(prev => prev ? {...prev, name: e.target.value} : null)}
                            className="border-amber-300"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={editedUser?.email || ''}
                            onChange={(e) => setEditedUser(prev => prev ? {...prev, email: e.target.value} : null)}
                            className="border-amber-300"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button onClick={handleSaveProfile} className="bg-amber-600 hover:bg-amber-700">
                            Save Changes
                          </Button>
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label className="text-amber-700">Name</Label>
                          <p className="text-amber-900 font-medium">{user.name}</p>
                        </div>
                        <div>
                          <Label className="text-amber-700">Email</Label>
                          <p className="text-amber-900 font-medium">{user.email}</p>
                        </div>
                        <Button
                          onClick={() => setIsEditing(true)}
                          variant="outline"
                          className="border-amber-300 text-amber-700"
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          Edit Profile
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="bg-white border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-900">Account Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-amber-50 rounded-lg">
                        <Coffee className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-amber-900">47</div>
                        <div className="text-sm text-amber-700">Cups Ordered</div>
                      </div>
                      <div className="text-center p-4 bg-amber-50 rounded-lg">
                        <Star className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-amber-900">{user.loyaltyPoints}</div>
                        <div className="text-sm text-amber-700">Points Earned</div>
                      </div>
                      <div className="text-center p-4 bg-amber-50 rounded-lg">
                        <Calendar className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-amber-900">8</div>
                        <div className="text-sm text-amber-700">Months Member</div>
                      </div>
                      <div className="text-center p-4 bg-amber-50 rounded-lg">
                        <Heart className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-amber-900">{user.favoriteItems.length}</div>
                        <div className="text-sm text-amber-700">Favorites</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900">Recent Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                        <div>
                          <div className="font-medium text-amber-900">Order #{order.id}</div>
                          <div className="text-sm text-amber-700">{order.date}</div>
                          <div className="text-sm text-amber-600">{order.items.join(', ')}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-amber-900">${order.total}</div>
                          <Badge className="bg-green-100 text-green-800">{order.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Button
                      onClick={() => onNavigate('menu')}
                      className="bg-amber-600 hover:bg-amber-700"
                    >
                      Order Again
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="bg-white border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-900 flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Your Favorite Items
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {user.favoriteItems.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-4">
                      {user.favoriteItems.map((itemId) => (
                        <div key={itemId} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                          <div>
                            <div className="font-medium text-amber-900 capitalize">
                              {itemId.replace('-', ' ')}
                            </div>
                            <div className="text-sm text-amber-700">Your go-to choice</div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => onNavigate('menu')}
                            className="bg-amber-600 hover:bg-amber-700"
                          >
                            Order Now
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                      <p className="text-amber-700 mb-4">No favorites yet</p>
                      <Button
                        onClick={() => onNavigate('menu')}
                        className="bg-amber-600 hover:bg-amber-700"
                      >
                        Explore Menu
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Rewards Tab */}
          <TabsContent value="rewards">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="bg-white border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-900 flex items-center gap-2">
                      <Gift className="h-5 w-5" />
                      Available Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-green-800">Free Coffee</h4>
                            <p className="text-sm text-green-700">Any size, any style</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-green-800">500 pts</div>
                            <Button size="sm" className="mt-1 bg-green-600 hover:bg-green-700">
                              Redeem
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-blue-800">Free Pastry</h4>
                            <p className="text-sm text-blue-700">Any pastry item</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-blue-800">300 pts</div>
                            <Button size="sm" className="mt-1 bg-blue-600 hover:bg-blue-700">
                              Redeem
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border-amber-200">
                  <CardHeader>
                    <CardTitle className="text-amber-900">Tier Benefits</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {loyaltyTiers.map((tier) => (
                        <div
                          key={tier.name}
                          className={`p-4 rounded-lg border-2 ${
                            tier.name === currentTier.name
                              ? 'border-amber-500 bg-amber-50'
                              : 'border-gray-200 bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-amber-900">{tier.name}</h4>
                            {tier.name === currentTier.name && (
                              <Badge className="bg-amber-600 text-white">Current</Badge>
                            )}
                          </div>
                          <p className="text-sm text-amber-700">
                            {tier.max === Infinity ? `${tier.min}+ points` : `${tier.min}-${tier.max} points`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}