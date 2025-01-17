FROM python:3.9

# Установить рабочую директорию
WORKDIR /app

# Копировать скрипт в контейнер
COPY tag_checker.py /app/tag_checker.py

# Установить необходимые зависимости
RUN pip install requests

# Указать команду по умолчанию
ENTRYPOINT ["python", "/app/tag_checker.py"]