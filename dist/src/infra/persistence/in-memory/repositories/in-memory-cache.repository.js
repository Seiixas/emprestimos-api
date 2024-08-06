"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryCacheRepository = void 0;
class InMemoryCacheRepository {
    constructor() {
        this._cache = {};
    }
    async get(key) {
        return this._cache[key] ? JSON.parse(this._cache[key]) : null;
    }
    async set(key, value) {
        this._cache[key] = JSON.stringify(value);
    }
    async delete(key) {
        delete this._cache[key];
    }
}
exports.InMemoryCacheRepository = InMemoryCacheRepository;
