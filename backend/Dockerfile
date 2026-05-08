FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends gcc libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt
RUN python -c "from pathlib import Path; p=Path('/app/requirements.txt'); b=p.read_bytes(); \
txt = b.decode('utf-16-le') if b'\x00' in b else b.decode('utf-8', errors='replace'); \
p.write_text(txt, encoding='utf-8')"
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app

RUN chmod +x /app/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/entrypoint.sh"]
