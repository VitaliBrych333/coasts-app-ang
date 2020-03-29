import { Filters } from './filters';

const expect = chai.expect;
const moduleName = 'Shared';
const componentName = 'Filters';

const newCoast = { date: new Date('2020-01-01'), sum: 1, type: 'test', author: 'test' };
const newIncome = { date: new Date('2020-01-01'), sum: 1, who: 'test', type: 'test', author: 'test' };

describe(`${moduleName}.${componentName}`, () => {
  let testTarget = Filters;

  describe('#filters', () => {
    it('should filter by type and return 1', () => {
      // Assert
      expect(testTarget.byType([newCoast], 'test')).to.be.eql(1);
    });

    it('should filter by author and return array of objects', () => {
      // Assert
      expect(testTarget.byAuthor([newIncome], 'test')).to.be.eql([newIncome]);
    });

    it('should filter by year and return array of objects', () => {
      // Assert
      expect(testTarget.byYear([newIncome], 2020)).to.be.eql([newIncome]);
    });

    it('should filter by mounth and return array of objects', () => {
      // Assert
      expect(testTarget.byMonth([newIncome], 0)).to.be.eql([newIncome]);
    });

    it('should filter by low date and return empty array', () => {
      // Assert
      expect(testTarget.byLowDate([newIncome], new Date('2022-01-01'))).to.be.eql([]);
    });

    it('should filter by top date and return array of objects', () => {
      // Assert
      expect(testTarget.byTopDate([newIncome], new Date('2020-01-01'))).to.be.eql([newIncome]);
    });
  });
});
