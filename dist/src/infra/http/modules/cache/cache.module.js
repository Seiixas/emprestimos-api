"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheModule = void 0;
const common_1 = require("@nestjs/common");
const cache_service_1 = require("../../../../core/shared/services/cache.service");
const cache_repository_1 = require("../../../persistence/cache/cache.repository");
const io_redis_cache_repository_1 = require("../../../persistence/cache/redis/repositories/io-redis-cache.repository");
let CacheModule = class CacheModule {
};
exports.CacheModule = CacheModule;
exports.CacheModule = CacheModule = __decorate([
    (0, common_1.Module)({
        imports: [io_redis_cache_repository_1.IoRedisCacheRepository],
        providers: [
            {
                provide: cache_repository_1.CacheRepository,
                useClass: io_redis_cache_repository_1.IoRedisCacheRepository,
            },
            {
                provide: cache_service_1.CacheService,
                useFactory: (cacheRepository) => {
                    return new cache_service_1.CacheService(cacheRepository);
                },
                inject: [cache_repository_1.CacheRepository],
            },
        ],
        exports: [cache_service_1.CacheService],
    })
], CacheModule);
