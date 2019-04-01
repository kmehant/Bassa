FROM ubuntu

MAINTAINER SCoRe Lab Community <commuity@scorelab.org>

ARG BUILD_DATE
ARG VCS_REF
WORKDIR /home/Bassa/ui
COPY . .

EXPOSE 3000

RUN apt-get update
RUN apt-get clean
RUN apt-get install git curl -y
RUN apt install nodejs npm -y
RUN npm install bower
RUN npm install gulp
RUN npm install -g gulp
RUN npm install --global gulp-cli
RUN npm install yarn -g
RUN apt-get install yarn -y
RUN apt remove cmdtest -y
RUN yarn install
CMD [ "gulp", "serve" ]

LABEL multi.org.label-schema.name="Bassa" \
      multi.org.label-schema.description="Bassa provides Automated Download Queue to make the best use of Internet bandwidth" \
      multi.org.label-schema.url="https://github.com/scorelab/Bassa/wiki" \
      multi.org.label-schema.vcs-url="https://github.com/scorelab/Bassa" \
      multi.org.label-schema.vcs-ref=$VCS_REF \
      multi.org.label-schema.build-date=$BUILD_DATE \
      multi.org.label-schema.vendor="Sustainable Computing Research Group" \
      multi.org.label-schema.version="" \
      multi.org.label-schema.schema-version="1.0"
