#!/bin/sh
set -e

echo "[backend] Running migrations..."
python manage.py migrate --noinput

if [ "${AUTO_CREATE_ADMIN:-1}" = "1" ]; then
  ADMIN_USERNAME="${DJANGO_SUPERUSER_USERNAME:-admin}"
  ADMIN_PASSWORD="${DJANGO_SUPERUSER_PASSWORD:-adminadmin}"
  ADMIN_EMAIL="${DJANGO_SUPERUSER_EMAIL:-admin@example.com}"

  echo "[backend] Ensuring admin user exists (${ADMIN_USERNAME})..."
  python manage.py shell -c "
from django.contrib.auth import get_user_model
User = get_user_model()
u, created = User.objects.get_or_create(username='${ADMIN_USERNAME}', defaults={'email':'${ADMIN_EMAIL}'})
if created:
    u.set_password('${ADMIN_PASSWORD}')
u.is_superuser = True
u.is_staff = True
u.is_admin = True
u.save()
print('created' if created else 'updated')
"
fi

echo "[backend] Starting dev server..."
exec python manage.py runserver 0.0.0.0:8000

