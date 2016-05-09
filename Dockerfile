FROM alpine:latest

MAINTAINER Ranjandas A P <thejranjan@gmail.com>

RUN apk update && apk add ruby ruby-dev ruby-bundler ruby-io-console ruby-bigdecimal ruby-tzinfo nodejs build-base libxml2-dev libxslt-dev sqlite-dev

COPY . /opt/ocular

RUN bundle config build.nokogiri --use-system-libraries

WORKDIR /opt/ocular

RUN bundle install --without development test

EXPOSE 3000

CMD rails s -b 0.0.0.0 -p 3000
