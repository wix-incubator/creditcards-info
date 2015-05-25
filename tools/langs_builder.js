var recursive = require('recursive-readdir');
var fs_extra = require('fs-extra');
var gift = require("gift");
var path = require('path');
var os = require('os');
var fs = require('fs');
var Q = require("q");
var _ = require("lodash");


var BASE_DIR = path.join(os.tmpdir(), "langs-"+(new Date().getTime()));

Q().then(function() {
    var deferred = Q.defer();

    console.log(" - Cloning");

    gift.clone("https://github.com/wix/creditcards-langs.git", BASE_DIR, function(err, _repo) {
        if (err) {
            throw("Error cloning git", err);
        }
        deferred.resolve(_repo);
    });

    return deferred.promise;
}).then(function(repo) {
    var deferred = Q.defer();
    var tmpDir = path.join(BASE_DIR, "src", "main", "resources", "creditcards");

    var tokens = {};

    recursive(tmpDir, function (err, files) {
        if (err) {
            console.log("Error reading directory [" + tmpDir + "]", err);
            deferred.reject(err);
            return;
        }
        _.each(files, function(file) {
            // All files are in the format of networks_en-US.json
            var locale = file.substr(-10, 5);
            tokens[locale] = tokens[locale] || {};

            var data = fs.readFileSync(file, 'utf8');
            var json = JSON.parse(data.toString('utf8'));

            _.each(json, function(val, key) {
                var parts = key.split("_");
                var obj = tokens[locale];
                key = parts.pop();

                _.each(parts, function(part) {
                    obj[part] = obj[part] || {};
                    obj = obj[part];
                })

                obj[key] = val;
            });
        });
        deferred.resolve(tokens);
    });
    return deferred.promise;
}).then(function(tokens) {
    _.each(tokens, function(token, locale) {
        fs.writeFileSync(path.join(__dirname, "..", "resources", locale.replace("-", "_") + ".json"), JSON.stringify(token, null, 4), 'utf8');
    });
}).then(function() {
    console.log(" - Success.")
}).catch(function(err) {
    console.log("- Error: ", err);
}).finally(function() {
    console.log(" - Deleting tmp dir");
    var deferred = Q.defer();
    fs_extra.remove(BASE_DIR, function() {deferred.resolve();});
    return deferred.promise;
});
