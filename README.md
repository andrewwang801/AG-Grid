AG-Grid CRUD example for test

Node Version: v13.13.0 Angular CLI: 9.1.4

* project architecture
1) frontend (Angula CLI 9.1.4) run using "ng serve"
2) backend (Node + ExpressJS + ElephantSQL)
    How to run:
    1. Set NODE_ENV to production "export NODE_ENV=production"
    2. Set DATABASE_URL with Online ElephantSQL hosting url                        
       "export DATABASE_URL=postgres://ilisyrvs:zgYPHQ8PEM23naG8Vv_k5c0MOymJOyL7@lallah.db.elephantsql.com:5432/ilisyrvs"
    3. Start server using "npm run dev"

3) test (Test cases for Endpoints) mocha, chai, nyc are used as testing & assertion libraries
