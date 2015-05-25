var _ = require("lodash");
var locales  = require("./locales");

var creditcardNetworks = {
    "amex"       : {
    },

    "dankort"    : {
        countries : [
            "DK",
        ],
    },

    "diners"   : {
    },

    "discover"   : {
    },

    "isracard"   : {
        countries : [
            "IL",
        ],
    },

    "jcb"        : {
    },

    "maestro"    : {
    },

    "mastercard" : {
    },

    "unionpay"   : {
    },

    "visa"       : {
    },
};


var creditcardFields = {
    billingAddress : {
    },

    billingPostalCode : {
    },

    csc : {
    },

    holderId : {
        countries : [
            "IL",
        ],
    },

    holderName : {
    },
};



module.exports = {
    getCreditcardDataForCountry : function(countryCode) {
        return {
            networks : _.reduce(creditcardNetworks, function(rc, network, name) {if (!network.countries || _.contains(network.countries, countryCode)) {rc.push(name)} return rc}, []),
            fields   : _.reduce(creditcardFields,   function(rc, field, name)   {if (!field.countries   || _.contains(field.countries,   countryCode)) {rc.push(name)} return rc}, []),
        };
    },

    getCreditcardName : function(locale, networkId) {
        if (_.has(locales, locale)) {
            var network = locales[locale].networks[networkId];
            if (network) {
                return network;
            }
        }
        return "";
    },

    getFieldName : function(locale, fieldId) {
        if (_.has(locales, locale)) {
            var field = locales[locale].fields[fieldId];
            if (field) {
                return field;
            }
        }
        return "";
    },
};
