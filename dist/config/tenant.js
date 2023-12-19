"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tenants = [
    {
        id: "tenant1",
        connectionString: "postgres://postgres:postgres@localhost:5432/tenant1",
    },
    {
        id: "tenant2",
        connectionString: "postgres://postgres:postgres@localhost:5432/tenant2",
    },
];
exports.default = tenants;
