import { create } from 'zustand';

const useWorkoutStore = create((set) => ({
  workoutData: null,

  setWorkoutData: (workouts) => set({ workouts }),

  addWorkout: (newWorkout) =>
    set((state) => ({
      workouts: [...state.workouts, newWorkout],
    })),

  clearWorkouts: () => set({ workouts: [] }),
}));

export default useWorkoutStore;
