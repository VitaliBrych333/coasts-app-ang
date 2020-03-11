import { HeaderComponent } from './header.component';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';

const expect = chai.expect;
const moduleName = 'Core';
const componentName = 'FooterComponent';

describe(`${moduleName}.${componentName}`, () => {
    let testTarget: HeaderComponent;
    let authServiceMock: any;
    let storeMock: any;

    beforeEach(() => {
        authServiceMock = sinon.createStubInstance(AuthService);
        authServiceMock.currentStatusLog = sinon.spy(() => Promise.reject(() => new Error()));
        storeMock = sinon.createStubInstance(Store);
        testTarget = new HeaderComponent(authServiceMock, storeMock);
    });

    describe('create element', () => {
        it('should be object', () => {
            // Assert
            expect(testTarget).to.be.an('object');
        });
    });
});
