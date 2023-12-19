import { Pool } from "pg";
import tenants from "../config/tenant";

// Get database connection based on tenant ID
export const getPoolByTenantId = (tenantId: string): Pool => {
  const tenant = tenants.find((t) => t.id === tenantId);

  if (!tenant) {
    throw new Error("Tenant not found");
  }

  return new Pool({
    connectionString: tenant.connectionString,
  });
};
