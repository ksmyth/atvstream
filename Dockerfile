# run like:
#sudo docker build -t atvstream atvstream
#sudo docker run -v ~/video:/data -p 8011:8011 --name atvstream -d atvstream

FROM dockerfile/nodejs

WORKDIR /data

RUN apt-get update && apt-get install -y ruby git ruby-dev libavahi-compat-libdnssd-dev
RUN gem install airstream

RUN mkdir /atvstream && cd /atvstream && git init \
 && git remote add origin https://github.com/ksmyth/atvstream \
 && git fetch \
 && git branch master origin/master \
 && git checkout master
 
RUN cd /atvstream && sudo npm install

# start server
EXPOSE 8011
CMD ["node", "/atvstream/app.js"]
