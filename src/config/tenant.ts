interface Tenant {
  id: string;
  connectionString: string;
}

const tenants: Tenant[] = [
  {
    id: "tenant1",
    connectionString: "postgres://postgres:postgres@localhost:5432/tenant1",
  },
  {
    id: "tenant2",
    connectionString: "postgres://postgres:postgres@localhost:5432/tenant2",
  },
];

export default tenants;
