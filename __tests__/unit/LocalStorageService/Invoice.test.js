const { LocalStorageService } = require('../../../src/services/LocalStorageService')
const { LocalStorageMock } = require('../../../__mocks__/LocalStorageMock')
const { fakeInvoice } = require('../../../__mocks__/FakeInvoice')

global.localStorage = new LocalStorageMock;
const localStorageService = new LocalStorageService()

describe('Testing Invoice methods from LocalStorageService', () => {
    it('should get false when localStorage does not have Invoice', () => {
        const hasInvoice = localStorageService.hasInvoice()
        expect(hasInvoice).toBe(false)
    });

    it('should get false when localStorage does not have Invoice', () => {
        const Invoice = localStorageService.getInvoice()
        expect(Invoice).toBe(false)
    });

    it('should set Invoice to localStorage', async () => {
        localStorageService.setInvoice(fakeInvoice)
        expect(localStorage.invoice).toBe(JSON.stringify(fakeInvoice))
    });

    it('should get true when localStorage have Invoice', async () => {
        const hasInvoice = localStorageService.hasInvoice()
        expect(hasInvoice).toBe(true)
    });

    it('should get Invoice from localStorage', async () => {
        const Invoice = localStorageService.getInvoice()
        expect(JSON.stringify(Invoice)).toBe(JSON.stringify(fakeInvoice))
    });

    it('should clean Invoice from localStorage', async () => {
        localStorageService.clearinvoice()
        expect(localStorage.invoice).toBe('')
    });
})
