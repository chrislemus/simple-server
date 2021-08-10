"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.del = exports.post = exports.put = exports.get = void 0;
require("reflect-metadata");
var Methods_1 = require("./Methods");
var MetadataKeys_1 = require("./MetadataKeys");
function routeBinder(method) {
    return function (path) {
        return function (target, key, desc) {
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.Path, path, target, key);
            Reflect.defineMetadata(MetadataKeys_1.MetadataKeys.Method, method, target, key);
        };
    };
}
exports.get = routeBinder(Methods_1.Methods.Get);
exports.put = routeBinder(Methods_1.Methods.Put);
exports.post = routeBinder(Methods_1.Methods.Post);
exports.del = routeBinder(Methods_1.Methods.Del);
exports.patch = routeBinder(Methods_1.Methods.Patch);
