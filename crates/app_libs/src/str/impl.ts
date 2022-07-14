class Person {
  name: string;
}

interface Human {
  name: string;
  isWomen(): boolean;
}

export class People extends Person {
  constructor() {
    super();
  }
}

export class Man implements Person {
  name: string;
  constructor() {
    this.name = ''
  }
}

export enum Gender {
  UNKNOWN,
  MALE,
  FEMALE
}

export class WoMan implements Human {
  name: string;
  gender: Gender;
  constructor() {
    this.name = ''
    this.gender = Gender.UNKNOWN;
  }
  isWomen(): boolean {
    return this.gender === Gender.FEMALE
  }
}
