import { Performance } from '../performance/performance';

export class Exercise {
    public id: string;
    public seq: number;
    public title: string;
    public performances: Array<Performance>;

constructor() {
    this.performances = [];
}

// public setId(id: string) {
//     this.id = id;
// }

// public set setSeq(seq: number) {
//     this.seq = seq;
// }

// public set setTitle(title: string) {
//     this.title = title;
// }

// public set setPerformances(performances: Performance[]) {
//     this.performances = performances;
// }

  }
