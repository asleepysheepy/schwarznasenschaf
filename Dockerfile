FROM ruby:latest

WORKDIR /usr/src/app
COPY Gemfile* ./
RUN gem install bundler:2.0.1
RUN bundle install
COPY . .

CMD bundle exec rake
