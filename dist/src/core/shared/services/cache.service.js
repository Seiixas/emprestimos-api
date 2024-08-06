"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
class CacheService {
    constructor(cacheRepository) {
        this.cacheRepository = cacheRepository;
    }
    async getFromCache(key) {
        return await this.cacheRepository.get(key);
    }
    async setInCache(key, value, ttl) {
        return this.cacheRepository.set(key, value, ttl);
    }
    async deleteFromCache(key) {
        return this.cacheRepository.delete(key);
    }
}
exports.CacheService = CacheService;
