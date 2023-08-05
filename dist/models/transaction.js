"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
class Transaction {
    constructor(event, user, history, id, createdAt, updatedAt) {
        this.event = event;
        this.user = user;
        this.history = history;
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
exports.Transaction = Transaction;
