FROM node:10.17.0
LABEL maintainer='Naoki Akazawa'
ENV TZ=Asia/Tokyo
WORKDIR /usr/app
COPY package.json package-lock.json /usr/app/
RUN npm install
WORKDIR /usr/app/src
EXPOSE 5555
RUN rm /root/.bashrc
COPY .bashrc /root/.bashrc