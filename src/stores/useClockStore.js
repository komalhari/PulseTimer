
import { create } from 'zustand';

const useClockStore = create((set) => ({
  isClicked: false,
  setIsClicked: (value) => set({ isClicked: value }),
}));
export default useClockStore;
