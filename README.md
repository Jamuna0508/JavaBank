# JavaBank (Frontend + Backend demo)

This repo contains a simple frontend (static website) and a demo Java Spring Boot backend skeleton.

## Frontend (frontend/)
- index.html, register.html, login.html, dashboard.html
- Uses localStorage to simulate accounts when backend is not present.
- Deploy frontend on GitHub Pages (push `frontend/` contents to repo root or gh-pages branch).

## Backend (backend/)
- Spring Boot demo app exposing basic REST APIs:
  - POST /api/register  {accNo,name,pin,balance}
  - POST /api/login     {accNo,pin}
  - POST /api/deposit/{accNo} {amount}
  - POST /api/withdraw/{accNo} {amount}
  - GET  /api/balance/{accNo}

### Run backend locally
- Install Java 17 and Maven.
- `cd backend`
- `mvn spring-boot:run`

## How it works
- Frontend ships with localStorage-based demo. When you have a backend deployed, change `script.js` to call the API endpoints instead of localStorage (examples included as comments).

## License
MIT
"# JavaBank" 
