
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DailyUsage {
  problemSolving: number;
  codeGeneration: number;
  videoGeneration: number;
}

export interface Subscription {
  isActive: boolean;
  plan: 'free' | 'pro' | 'enterprise';
  dailyUsage: DailyUsage;
}

export interface SubscriptionState {
  subscription: Subscription;
  canUseFeature: (feature: keyof DailyUsage) => boolean;
  updateUsage: (feature: keyof DailyUsage) => void;
  resetDailyUsage: () => void;
}

const initialState: Subscription = {
  isActive: false,
  plan: 'free',
  dailyUsage: {
    problemSolving: 0,
    codeGeneration: 0,
    videoGeneration: 0,
  },
};

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      subscription: initialState,
      
      canUseFeature: (feature: keyof DailyUsage) => {
        const state = get();
        if (state.subscription.isActive) return true;
        
        const limits = {
          problemSolving: 3,
          codeGeneration: 5,
          videoGeneration: 1,
        };
        
        return state.subscription.dailyUsage[feature] < limits[feature];
      },
      
      updateUsage: (feature: keyof DailyUsage) => {
        set((state) => ({
          subscription: {
            ...state.subscription,
            dailyUsage: {
              ...state.subscription.dailyUsage,
              [feature]: state.subscription.dailyUsage[feature] + 1,
            },
          },
        }));
      },
      
      resetDailyUsage: () => {
        set((state) => ({
          subscription: {
            ...state.subscription,
            dailyUsage: {
              problemSolving: 0,
              codeGeneration: 0,
              videoGeneration: 0,
            },
          },
        }));
      },
    }),
    {
      name: 'subscription-storage',
    }
  )
);
