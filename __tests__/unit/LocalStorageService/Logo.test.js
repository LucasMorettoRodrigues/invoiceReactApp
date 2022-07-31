const { LocalStorageService } = require('../../../src/services/LocalStorageService')
const { LocalStorageMock } = require('../../../__mocks__/LocalStorageMock')

global.localStorage = new LocalStorageMock;
const localStorageService = new LocalStorageService()

describe('Testing logo methods from LocalStorageService', () => {
    it('should get false when localStorage does not have logo', () => {
        const hasLogo = localStorageService.hasLogo()
        expect(hasLogo).toBe(false)
    });

    it('should get false when localStorage does not have logo', () => {
        const logo = localStorageService.getLogo()
        expect(logo).toBe(false)
    });

    it('should set logo to localStorage', async () => {
        localStorageService.setLogo('Fake Logo')
        expect(localStorage.logo).toBe('Fake Logo')
    });

    it('should get true when localStorage have logo', async () => {
        const hasLogo = localStorageService.hasLogo()
        expect(hasLogo).toBe(true)
    });

    it('should get logo from localStorage', async () => {
        const logo = localStorageService.getLogo()
        expect(logo).toBe('Fake Logo')
    });

    it('should clean logo from localStorage', async () => {
        localStorageService.clearLogo()
        expect(localStorage.logo).toBe('')
    });
})
