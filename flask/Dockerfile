FROM python:3.7.2-stretch

WORKDIR /app

ENV POSTGRES_USER="" POSTGRES_PASSWORD="" POSTGRES_HOST=postgres POSTGRES_PORT=5432 POSTGRES_DB=""

ADD . /app

RUN pip install --upgrade pip

RUN pip install -r requirements.txt

CMD ["uwsgi", "app.ini"]