'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century = 0) {
  let result = 0;
  let manArray = [];

  (century)
    ? manArray = people.filter((man) => man.sex === 'm'
    && Math.ceil(man.died / 100) === century)
      .map(person => person.died - person.born)
    : manArray = people.filter((man) => man.sex === 'm')
      .map((person) => person.died - person.born);

  result = manArray.reduce((prev, current) => prev + current, 0);

  return result / manArray.length;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = false) {
  let result = 0;
  let ageArray;
  const arrayWomen = people.filter((woman) => woman.sex === 'f');

  (withChildren)
    ? ageArray = arrayWomen.filter(woman => {
      return people.some(child => child.mother === woman.name);
    })
      .map(woman => woman.died - woman.born)
    : ageArray = arrayWomen.map(woman => woman.died - woman.born);

  result = ageArray.reduce((prev, current) => prev + current, 0);

  return result / ageArray.length;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon = false) {
  let motherArr = [];
  let result = 0;

  (onlyWithSon)
    ? motherArr = people.filter((person) => {
      return people.find(mother => person.mother === mother.name
        && person.sex === 'm');
    })
    : motherArr = people.filter((person) => {
      return people.find(mother => person.mother === mother.name);
    });

  result = motherArr.reduce((prev, current) => {
    const childBirth = people.find(mother => current.mother === mother.name);

    return prev + (current.born - childBirth.born);
  }, 0);

  return result / motherArr.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
