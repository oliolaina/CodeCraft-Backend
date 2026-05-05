# Backend (Django + DRF)

Серверная часть LMS-проекта для последующей интеграции с React.

## Запуск

1. Создать и активировать виртуальное окружение.
2. Установить зависимости из `requirements.txt`.
3. Скопировать `.env.example` в `.env`.
4. Применить миграции.
5. Создать суперпользователя.
6. Запустить сервер.

### Быстрые команды для Windows (PowerShell)

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Команды для миграций и тестов

```powershell
# из папки backend и с активированным venv
python manage.py makemigrations
python manage.py migrate
python manage.py test
```

### Быстрые команды для Ubuntu (bash)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Миграции и тесты (Ubuntu)

```bash
# из папки backend и с активированным venv
python manage.py makemigrations
python manage.py migrate
python manage.py test
```

## Основные API эндпоинты

- `POST /api/auth/register/` — регистрация.
- `POST /api/auth/login/` — вход и выдача токена.
- `GET /api/auth/me/` — текущий пользователь.
- `GET/POST /api/courses/`, `GET/PUT/PATCH/DELETE /api/courses/{id}/`.
- `GET/POST /api/lessons/`, `GET/PUT/PATCH/DELETE /api/lessons/{id}/`.
- `GET/POST /api/tasks/`, `GET/PUT/PATCH/DELETE /api/tasks/{id}/`.
- `POST /api/tasks/{id}/check/` — проверка ответа.
- `GET /api/progress/` — прогресс пользователя.
- `POST /api/progress/mark_completed/` — отметить урок пройденным.
- `GET /api/progress/course/{id}/` — процент завершения курса.

## Авторизация

Используется DRF Token Authentication:

`Authorization: Token <token_value>`
