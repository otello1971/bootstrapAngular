export interface PerformanceLessId { seq: number;  reps: number; weight: number; times: number; unit: string; }
export interface Performance extends PerformanceLessId { id: string; }
export interface ExerciseLessId { seq: number;  title: string; performances: Performance[]; }
export interface Exercise extends ExerciseLessId { id: string; }
export interface WorkoutLessId { seq: number;  date: string; exercises: Exercise[]; }
export interface Workout extends WorkoutLessId { id: string; }
export interface GymJournalLessId { userid: string; date: string; }
export interface GymJournal extends GymJournalLessId { id: string; }
