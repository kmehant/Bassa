FROM ubuntu
WORKDIR /home/Bassa/components/core
RUN apt-get update && apt-get upgrade -y && apt-get install aria2 -y
EXPOSE 6800
CMD ["aria2c" ,"--enable-rpc"]
