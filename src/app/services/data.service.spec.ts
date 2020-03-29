import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/Observable/of';
import { Url } from '../shared/constants/url.enum';
import { DataService } from './data.service';

const expect = chai.expect;
const moduleName = 'Services';
const componentName = 'DataService';

const newCoast = {
  date: new Date(),
  sum: 1,
  type: '',
  author: '',
  _id: 'test'
};

const newIncome = {
  date: new Date(),
  sum: 1,
  who: '',
  type: '',
  author: '',
  _id: 'test'
};

describe(`${moduleName}.${componentName}`, () => {
  let testTarget: DataService;
  let httpMock: any;

  beforeEach(() => {
    httpMock = sinon.createStubInstance(HttpClient);
    httpMock.post = sinon.stub().returns(of([]));
    httpMock.get = sinon.stub().returns(of([]));
    httpMock.delete = sinon.stub().returns(of([]));
    httpMock.put = sinon.stub().returns(of([]));
    testTarget = new DataService(httpMock);
  });

  describe('#addField', () => {
    it('should return a promise', () => {
      // Assert
      expect(testTarget.addField(newCoast)).to.be.an('promise');
    });
  });

  describe('#getAllFieldsCoasts', () => {
    it('should call http.get() with parameters', () => {
      // Act
      testTarget.getAllFieldsCoasts();

      // Assert
      sinon.assert.calledWith(httpMock.get, Url.BASE + Url.PURCH);
    });
  });

  describe('#deleteId', () => {
    it('should call http.delete() with parameters', () => {
      // Act
      testTarget.deleteId(newCoast);

      // Assert
      sinon.assert.calledWith(httpMock.delete, Url.BASE + Url.PURCH + '/test');
    });
  });

  describe('#getFieldId', () => {
    it('should call http.get() with parameters', () => {
      // Act
      testTarget.getFieldId('test');

      // Assert
      sinon.assert.calledWith(httpMock.get, Url.BASE + Url.PURCH + '/test');
    });
  });

  describe('#updateField', () => {
    it('should call http.put() with parameters', () => {
      // Act
      testTarget.updateField('test', newCoast);

      // Assert
      sinon.assert.calledWith(httpMock.put, Url.BASE + Url.PURCH + '/test' + Url.UPD, newCoast);
    });
  });

  describe('#addFieldIncome', () => {
    it('should return a promise', () => {
      // Assert
      expect(testTarget.addFieldIncome(newIncome)).to.be.an('promise');
    });
  });

  describe('#getAllFieldsIncomes', () => {
    it('should call http.get() with parameters', () => {
      // Act
      testTarget.getAllFieldsIncomes();

      // Assert
      sinon.assert.calledWith(httpMock.get, Url.BASE + Url.INC);
    });
  });

  describe('#deleteIncomeId', () => {
    it('should call http.delete() with parameters', () => {
      // Act
      testTarget.deleteIncomeId(newIncome);

      // Assert
      sinon.assert.calledWith(httpMock.delete, Url.BASE + Url.INC + '/test');
    });
  });

  describe('#getFieldIncomeId', () => {
    it('should call http.get() with parameters', () => {
      // Act
      testTarget.getFieldIncomeId('test');

      // Assert
      sinon.assert.calledWith(httpMock.get, Url.BASE + Url.INC + '/test');
    });
  });

  describe('#updateFieldIncome', () => {
    it('should call http.put() with parameters', () => {
      // Act
      testTarget.updateFieldIncome('test', newIncome);

      // Assert
      sinon.assert.calledWith(httpMock.put, Url.BASE + Url.INC + '/test' + Url.UPD, newIncome);
    });
  });
});
