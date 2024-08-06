"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IoRedisCacheRepository = void 0;
const common_1 = require("@nestjs/common");
const ioredis_1 = require("ioredis");
class IoRedisCacheRepository {
    constructor() {
        this.logger = new common_1.Logger(IoRedisCacheRepository.name);
        this.client = new ioredis_1.Redis({
            host: process.env.REDIS_URL,
            port: 6379,
        });
    }
    async connect() {
        try {
            await this.client.connect();
            this.logger.log('IoRedis connection success');
        }
        catch (err) {
            this.logger.error('IoRedis connection error', err);
        }
    }
    async get(key) {
        const cachedValue = await this.client.get(key);
        return cachedValue ? JSON.parse(cachedValue) : null;
    }
    async set(key, value, ttl) {
        const stringValue = JSON.stringify(value);
        if (ttl) {
            await this.client.set(key, stringValue, 'EX', ttl);
        }
        else {
            await this.client.set(key, stringValue);
        }
    }
    async delete(key) {
        await this.client.del(key);
    }
}
exports.IoRedisCacheRepository = IoRedisCacheRepository;
