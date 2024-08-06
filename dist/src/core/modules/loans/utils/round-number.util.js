"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roundNumber = roundNumber;
function roundNumber(number, precision) {
    return Number(number.toFixed(precision));
}
