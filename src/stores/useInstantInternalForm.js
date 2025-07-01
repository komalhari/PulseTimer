import { create } from 'zustand';

const useInternalInstantFormData = create((set) => ({
  formData : {},
//   isClicked: false,
  setInternalInstantFormData: (formData) => set({ formData: formData}),
}));
export default useInternalInstantFormData;
