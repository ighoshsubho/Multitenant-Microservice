"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPoolByTenantId = void 0;
const pg_1 = require("pg");
const tenant_1 = __importDefault(require("../config/tenant"));
// Get database connection based on tenant ID
const getPoolByTenantId = (tenantId) => {
    const tenant = tenant_1.default.find((t) => t.id === tenantId);
    if (!tenant) {
        throw new Error("Tenant not found");
    }
    return new pg_1.Pool({
        connectionString: tenant.connectionString,
    });
};
exports.getPoolByTenantId = getPoolByTenantId;
