# EventCloud backend

## Install

```bash
npm install
cp .env.example .env
npm run start:dev
```

## First real user

If database is empty, register a user:

```bash
POST http://localhost:3000/api/auth/register
{
  "email": "didenko.o@example.com",
  "password": "123456",
  "fullName": "Oleksandr Didenko"
}
```

Then login:

```bash
POST http://localhost:3000/api/auth/login
```

## Main routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/me`
- `PATCH /api/users/settings`
- `GET /api/events/my`
- `POST /api/events`
- `PATCH /api/events/:id`
- `DELETE /api/events/:id`
- `POST /api/events/:id/invite`
- `GET /api/notifications`
- `PATCH /api/notifications/read-all`
