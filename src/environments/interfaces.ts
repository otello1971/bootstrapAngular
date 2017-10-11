export interface PerformanceLessId { seq: number;  reps: number; weight: number; times: number; }
export interface Performance extends PerformanceLessId { id: string; }
export interface ExerciseLessId { seq: number;  title: string; performances: Performance[]; }
export interface Exercise extends ExerciseLessId { id: string; }
export interface WorkoutLessId { seq: number;  date: string; exercises: Exercise[]; }
export interface Workout extends WorkoutLessId { id: string; }
