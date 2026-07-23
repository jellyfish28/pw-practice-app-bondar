1. install Docker desktop

in PW config
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200'
  },

  then run
  npm run firstTest-chromium -->test will run on webserver

  2. to run test in DOcker
  create Dockerfile in root

pull image from PW site
  docker pull mcr.microsoft.com/playwright:v1.61.0-noble

  FROM mcr.microsoft.com/playwright:v1.61.0-noble - Dockerfile
  keep in mind: version of image should be the same as PW version in package.json

  FROM mcr.microsoft.com/playwright:v1.61.0-noble

RUN mkdir /app - will create folder in container
WORKDIR /app - it will be working dir
COPY . /app - will copy project to container

RUN npm install --force - will install dependencies
RUN npx playwright install

  to run test in DOcker
  in Terminal in IDE run
  docker build -t pw-pageobject-test . -->docker image will be created

  check images
  docker images

  run docker image
  docker run -it pw-pageobject-test

  then you are in container
  npm run firstTest-chromium -->will run test in container

  report will live in container

  to better orchestrate containers -->Docker compose
  also there we can specify to uploud test results from container to host machine

//will copy results from container to host machine
  volumes: 
      - ./playwright-report/:/app/playwright-report
      - ./test-results/:/app/test-results

//will build image based on Dockerfile
  build: 
      context: .
      dockerfile: ./Dockerfile     - will create iage based on docker file instructions


//run docker-compose
docker-compose up --build    

//to exit container in IDE in Terminal run: exit command

3. CI
instruction to setup remote repo

https://bondaracademy.com/blog/most-poular-git-commands-for-testers


