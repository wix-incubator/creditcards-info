var expect      = require('chai').expect;
var _           = require("lodash");
var creditcards = require("../src/Creditcards.js");


describe("English locale tests (en_US)", () => {
    it ('returns "Visa" for "visa" (network name)', () => {
    	expect(creditcards.getCreditcardName("en_US", "visa")).to.equal("Visa");
    });

    it ('returns "Expiry Date" for "expiration" (field name)', () => {
    	expect(creditcards.getFieldName("en_US", "expiration")).to.equal("Expiry Date");
    });
});

describe("Invalid locale tests (xx_XX)", () => {
    it ('returns empty string for "visa" (network name)', () => {
        expect(creditcards.getCreditcardName("xx_XX", "visa")).to.equal("");
    });

    it ('returns empty string for "expiration" (field name)', () => {
        expect(creditcards.getFieldName("xx_XX", "expiration")).to.equal("");
    });
});

describe('Existing state test (IL)', () => {
    it ('returns correct response', () => {
        expect(creditcards.getCreditcardDataForCountry('IL')).to.deep.equal({
            networks: [
                'visa',
                'mastercard',
                'amex',
                'discover',
                'diners',
                'isracard',
                'jcb',
                'maestro',
                'unionpay' ],
            fields: [
                'csc',
                'holderName',
                'holderId',
                'billingAddress',
                'billingPostalCode'
            ]
        });
    });
});

describe('Unknown state test (XX)', () => {
    it ('returns correct response', () => {
        expect(creditcards.getCreditcardDataForCountry('XX')).to.deep.equal({
            networks: [
                'visa',
                'mastercard',
                'amex',
                'discover',
                'diners',
                'jcb',
                'maestro',
                'unionpay'
            ],
            fields: [
                'csc',
                'holderName',
                'billingAddress',
                'billingPostalCode'
            ]
        });
    });
});

describe('Fields sort values test', () => {
    it ('returns 4 for "billingPostalCode"', () => {
        expect(creditcards.getFieldSortValue('billingPostalCode')).to.equal(4);
    });

    it ('returns -1 for "X"', () => {
        expect(creditcards.getFieldSortValue('X')).to.equal(-1);
    });
});
