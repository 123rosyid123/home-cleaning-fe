import { UserProfile } from '@/types/accountType';
import { create } from 'zustand';

type AccountState = {
  account: UserProfile | null;
  setAccount: (account: UserProfile) => void;
};

export const useAccountStore = create<AccountState>((set) => ({
  account: null,
  setAccount: (account) => set({ account }),
}));
