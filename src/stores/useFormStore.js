
import { create } from 'zustand';

const useFormData = create((set) => ({
  formData: {},
  setFormData: (value) => set({ formData: value }),
}));
export default useFormData;
