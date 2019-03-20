FROM python:3.7

RUN mkdir -p /opt/services/api/src
COPY requirements.txt /opt/services/api/src/
WORKDIR /opt/services/api/src
RUN pip install -r requirements.txt
COPY . /opt/services/api/src
EXPOSE 5000
CMD ["python", "app.py"]

