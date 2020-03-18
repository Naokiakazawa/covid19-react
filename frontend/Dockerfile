FROM node:10.17.0
LABEL maintainer='Naoki Akazawa'
ENV TZ=Asia/Tokyo
WORKDIR /usr/app
EXPOSE 3000 8080
RUN rm /root/.bashrc
COPY .bashrc /root/.bashrc
COPY frontend_entrypoint.sh /
RUN chmod 777 /frontend_entrypoint.sh
ENTRYPOINT [ "/bin/bash", "/frontend_entrypoint.sh" ]