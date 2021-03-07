# ratePlacesMERN
This repository contains frontend code and e2e tests (cypress + cucumber preprocessor) for YourPlace application.
App was created wit react-create-app.

Run instruction:
1. Clone repository
2. Run npm i
3. Rename .env.example file with REACT_APP_BACKEND_URL=http://localhost:XXXX (where XXXX stands for port that is used by backend)
4. Rename config.example.js file in ./src directory and provide your own mongouri and mapbox token
5 Run npm run start

In case you'd like to run tests, apart from steps listed above, you need to:
1. Run npm run e2e:headless (if you'd like to run tests in headless mode)
OR
1. Run npm run e2e
