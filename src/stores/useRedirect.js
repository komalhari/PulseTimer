
import { create } from 'zustand';

const useRedirect = create((set) => ({
  redirect: false,
  setRedirect: (value) => set({ redirect: value }),
}));
export default useRedirect;
