FROM node:16-bullseye

RUN apt update
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt install -y ./google-chrome-stable_current_amd64.deb

WORKDIR /home/app
COPY package.json package-lock.json /home/app/
RUN npm install

COPY index.html test.js run_tests.sh /home/app/
