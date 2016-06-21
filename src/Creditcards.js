var _ = require("lodash");
var locales  = require("./locales");

// Networks are ordered by ubiquity. That is, how many countries accept it, rather than
// how many card holders of a specific network there are (ahem UnionPay)
var creditcardNetworks = {
    "visa"       : {
    },

    "mastercard" : {
    },

    "amex"       : {
    },

    "discover"   : {
    },

    "diners"   : {
    },

    "dankort"    : {
        countries : [
            "DK",
        ],
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

    "unionpay"   : {
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
		// Taken from https://en.wikipedia.org/wiki/List_of_national_identity_card_policies_by_country#Countries_with_compulsory_identity_cards
        countries : [
            "AL", "AR", "BY", "BE", "BO", "BW", "BA", "BR", "BG", "MM",
			"CL", "CN", "CO", "CR", "HR", "CU", "CY", "CZ", "DO", "EG",
			"SV", "EE", "GM", "DE", "GR", "GT", "HK", "HU", "ID", "IR",
			"IL", "JO", "KE", "KW", "LV", "LB", "LU", "MK", "MG", "MY",
			"MT", "MU", "MD", "MA", "ME", "MZ", "NL", "KP", "PA", "PK",
			"PS", "PE", "PL", "PT", "QA", "RO", "RU", "SA", "RS", "SG",
			"SK", "SI", "ZA", "KR", "ES", "LK", "TW", "TH", "TN", "TR",
			"UG", "UA", "AE", "UY", "VE", "VN", "ZW"
        ],
    },

    holderName : {
    },
};



module.exports = {
    getCreditcardDataForCountry : function(countryCode) {
        return {
            networks : _.reduce(creditcardNetworks, function(rc, network, name) {if (!network.countries || _.includes(network.countries, countryCode)) {rc.push(name)} return rc}, []),
            fields   : _.reduce(creditcardFields,   function(rc, field, name)   {if (!field.countries   || _.includes(field.countries,   countryCode)) {rc.push(name)} return rc}, []),
        };
    },

    getCreditcardName : function(locale, networkId) {
        if (_.has(locales, locale)) {
            var network = locales[locale].creditcards.networks[networkId];
            if (network) {
                return network;
            }
        }
        return "";
    },

    getFieldName : function(locale, fieldId) {
        if (_.has(locales, locale)) {
            var field = locales[locale].creditcards.fields[fieldId];
            if (field) {
                return field;
            }
        }
        return "";
    },
};
