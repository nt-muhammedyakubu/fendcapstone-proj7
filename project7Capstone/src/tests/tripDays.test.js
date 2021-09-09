// import { tripDays } from '..client/js/tripDays';

// test('startDay + endDay equal tripDays', () => {
//     expect(tripDays(startDay, endDay)).toBetripdays;
// });
import { trip } from '../client/js/tripDays'
import { validateString } from '../client/js/tripDays'
test('adds day1 + day2 to equal day3', () => {
    expect(trip(1, 2)).toBe(3);
});
test('validate string', () => {
    expect(validateString("")) === false;
    expect(validateString("test")) === true;
});







// import { submitHandler } from '../client/js/cityData';

// describe('Testing the city location', () => {
//     test('test city location', () => {
//         expect(submitHandler).toBeDefined();
//     });
// })