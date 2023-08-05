"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTransactionDTO = exports.TransactionDTO = void 0;
class TransactionDTO {
    constructor(event, username, inventory) {
        this.event = event;
        this.username = username;
        this.inventory = inventory;
    }
}
exports.TransactionDTO = TransactionDTO;
class UpdateTransactionDTO {
    constructor(event, username) {
        this.event = event;
        this.username = username;
    }
}
exports.UpdateTransactionDTO = UpdateTransactionDTO;
