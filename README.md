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
  keep in mind: version of image should be the same as PW version in package.json ("@playwright/test": "^1.61.0")

  FROM mcr.microsoft.com/playwright:v1.61.0-noble - sets the base image for your Docker image:

  mcr.microsoft.com is Microsoft’s container registry.
playwright is the official Playwright image.
v1.61.0 is the Playwright image version.
noble means it uses Ubuntu 24.04 (“Noble Numbat”).

RUN mkdir /app - will create folder in container
WORKDIR /app - it will be working dir
COPY . /app - will copy project to container

RUN npm install --force - will install dependencies
RUN npx playwright install

  to run test in DOcker
  in Terminal in IDE run
  docker build -t pw-pageobject-test . -->docker image will be created; -t means tag; . - means use current dir as the build context

  check images (or check them in Docker desktop->Images)
  docker images 

  run docker image
  docker run -it pw-pageobject-test -->
  docker run -it pw-pageobject-test creates and starts a container from the pw-pageobject-test image.

docker run starts a new container.
-i keeps input open, and -t gives you an interactive terminal.
pw-pageobject-test is the image name you built earlier.
In your setup, it should open a shell in the container. From there, run npm run firstTest-chromium to start the tests. 

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
OR
docker compose up --build --abort-on-container-exit --exit-code-from playwright-test   

//to exit container in IDE in Terminal run: exit command

3. CI
instruction to setup remote repo

https://bondaracademy.com/blog/most-poular-git-commands-for-testers
3.0 upload your project to GitHub

3.1 git remote set-url origin https://github.com/jellyfish28/pw-practice-app-bondar.git - create new repo on GitHub and set it as main one;If you cloned the project from the remote repository but would like to switch the remote repository to the new one (for example, to your private repository), you can update the remote repository URL with this command

go to https://playwright.dev/docs/ci-intro and copy playwright.yml to your project

https://github.com/jellyfish28/pw-practice-app-bondar/settings/environments/23762296860/edit - add Env secrets from URL=https://playground.bondaracademy.com/pages/iot-dashboard
USERNAME=test@gmail.com
PASSWORD=12345

3.2 git remote -v -- check that main repo is selected

3.3 git add -A - to stage all files
3.4 commit 
git commit -m 'Test message'

3.5 git push

go to https://playwright.dev/docs/ci-introro

main workflow will be placed in .github/workflows

also setup your user in git 

git config --global user.name "<your-full-name>"
git config --global user.email "<your-email-address>"


each push will trigger test run on GitHub
and report will be attached