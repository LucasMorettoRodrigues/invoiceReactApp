export class LocalStorageService {
    // Returns true if there is a logo stored
    hasLogo() {
        return !!localStorage['logo'];
    };

    // Returns a stored logo (false if none is stored)
    getLogo() {
        if (this.hasLogo()) {
            return localStorage['logo'];
        } else {
            return false;
        }
    };

    // Set a new logo to Local Storage
    setLogo(logo: string) {
        localStorage['logo'] = logo;
    };

    // Checks to see if an invoice is stored
    hasInvoice() {
        return !(localStorage['invoice'] === '' || localStorage['invoice'] === null || localStorage['invoice'] === undefined);
    };

    // Returns a stored invoice (false if none is stored)
    getInvoice() {
        if (this.hasInvoice()) {
            return JSON.parse(localStorage['invoice']);
        } else {
            return false;
        }
    };

    // Set a new invoice to Local Storage
    setInvoice(invoice: any) {
        localStorage['invoice'] = JSON.stringify(invoice);
    };

    // Clears a stored logo
    clearLogo() {
        localStorage['logo'] = '';
    };

    // Clears a stored invoice
    clearinvoice() {
        localStorage['invoice'] = '';
    };

    // Clears the local storage
    clearLocalStorage() {
        this.clearinvoice()
        this.clearLogo()
    };
}