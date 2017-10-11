import { Exercise } from '../exercise/exercise';

export class Workout {
    public id: string;
    public seq: number;
    public date: string;
    public exercises: Array<Exercise>;

constructor() {
    this.exercises = [];
}

}
