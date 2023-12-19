# Multitenant-Microservice
A multitenant microservice built with node, typescript and postgres.

## Routes
Explain the available routes and their functionalities. Provide examples if possible.

### `/signup`
`Method`: POST

`Description`: Register a new user.

`Request Body`:
```json
{
  "tenantId":"tenantName",
  "email": "user@example.com",
  "password": "password123"
}
```
`Response`:
```json
{
  "message": "User created successfully"
}
```
### `/login`
`Method`: POST

`Description`: Authenticate a user and generate a JWT token.

`Request Body`:
```json
{
  "tenantId":"tenantName",
  "email": "user@example.com",
  "password": "password123"
}
```
`Response`:
```json
{
  "token": "generated_jwt_token"
}
```
