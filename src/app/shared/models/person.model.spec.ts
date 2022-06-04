import { Person } from './person.model';

describe('Person.Model', () => {
  it('should create an instance', () => {
    expect(new Person()).toBeTruthy();
  });
});
