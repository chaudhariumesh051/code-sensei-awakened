
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export interface SubscriptionState {
  currentPlan: SubscriptionPlan | null;
  isSubscribed: boolean;
  subscriptionStatus: 'active' | 'inactive' | 'cancelled' | 'expired';
  expiryDate: Date | null;
  
  // Actions
  setCurrentPlan: (plan: SubscriptionPlan) => void;
  setSubscriptionStatus: (status: 'active' | 'inactive' | 'cancelled' | 'expired') => void;
  setExpiryDate: (date: Date | null) => void;
  cancelSubscription: () => void;
  renewSubscription: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      currentPlan: null,
      isSubscribed: false,
      subscriptionStatus: 'inactive',
      expiryDate: null,

      setCurrentPlan: (plan) => set({ 
        currentPlan: plan,
        isSubscribed: true,
        subscriptionStatus: 'active'
      }),

      setSubscriptionStatus: (status) => set({ 
        subscriptionStatus: status,
        isSubscribed: status === 'active'
      }),

      setExpiryDate: (date) => set({ expiryDate: date }),

      cancelSubscription: () => set({
        subscriptionStatus: 'cancelled',
        isSubscribed: false
      }),

      renewSubscription: () => set({
        subscriptionStatus: 'active',
        isSubscribed: true
      }),
    }),
    {
      name: 'subscription-store',
      // Fix the type issue by ensuring the storage value is properly handled
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          return JSON.parse(str);
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    }
  )
);

// Helper functions for subscription management
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    features: [
      'Basic code analysis',
      '5 AI conversations per day',
      'Community support'
    ]
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 9.99,
    features: [
      'Advanced code analysis',
      'Unlimited AI conversations',
      'Priority support',
      'Code optimization suggestions',
      'Custom code templates'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 29.99,
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Advanced analytics',
      'Custom integrations',
      'Dedicated support',
      'SLA guarantee'
    ]
  }
];

// Utility functions
export const getSubscriptionPlan = (planId: string): SubscriptionPlan | undefined => {
  return subscriptionPlans.find(plan => plan.id === planId);
};

export const isSubscriptionActive = (status: string, expiryDate: Date | null): boolean => {
  if (status !== 'active') return false;
  if (!expiryDate) return true;
  return new Date() < expiryDate;
};

export const getDaysUntilExpiry = (expiryDate: Date | null): number => {
  if (!expiryDate) return -1;
  const now = new Date();
  const diffTime = expiryDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
