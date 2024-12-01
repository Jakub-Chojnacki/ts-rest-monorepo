This is a monorepo project built with Turborepo, integrating NestJS for the backend, React for the frontend, and ts-rest for type-safe API contracts between them. It's a simple app for booking a training with a personal trainer. I have created it as a demo/PoC and to test this stack and to make an assignment for one of my university classes. The code is definitely not optimal since I just want to get it running and tinker with ts-rest. There are many things that could be improved like the projects architecture, the configuration of monorepo, schemas and error handling. 

  
### Project Structure

The repository follows a monorepo structure with the following main packages:

/apps/api: The NestJS backend application, uses PostgreSQL and Prisma to communicate with it

/apps/client: The React frontend application that interacts with the API.

/packages/api-client: Shared API contract definitions using ts-rest to ensure type safety between the frontend and backend. It's an internal package that is imported in both parts of the app

### Setup

1. Clone the repository
```bash
  git clone https://github.com/Jakub-Chojnacki/ts-rest-test.git
  cd ts-rest
```
2. Install all dependencies
```bash
  npm install
```
3. Configure .env files according to .env.example files
4. Start the dev server in main folder. It will automatically start FE and BE
```bash
npm run dev
```

