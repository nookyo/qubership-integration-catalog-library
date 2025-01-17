FROM python:3.9-slim

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY tag_checker.py /tag_checker.py

ENTRYPOINT ["python", "/tag_checker.py"]
