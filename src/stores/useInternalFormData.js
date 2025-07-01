// import { create } from 'zustand';

// const useInternalFormData = create((set) => ({
//   workouts : [],
//   selectedWorkout: {},
//   setInternalFormData: (selectedWorkout, workoutList) => set({ workouts: workoutList, selectedWorkout: selectedWorkout }),
// }));
// export default useInternalFormData;
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useInternalFormData = create(
  persist(
    (set) => ({
      workouts: [],
      selectedWorkout: {},
      setInternalFormData: (selectedWorkout, workoutList) =>
        set({ selectedWorkout, workouts: workoutList }),
      clearInternalFormData: () => set({ selectedWorkout: {}, workouts: [] }),
    }),
    {
      name: 'internal-form-data',
  
      storage: {
        getItem: (name) => {
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          sessionStorage.setItem(name, JSON.stringify(value));
        },
        removeItem: (name) => sessionStorage.removeItem(name),
      },
    }
  )
);

export default useInternalFormData;
