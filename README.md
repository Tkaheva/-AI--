# Task Manager AI

Fullstack-приложение для управления задачами с AI-помощником. Позволяет создавать задачи, отмечать их выполнение, фильтровать по статусу и разбивать сложные задачи на подзадачи с помощью GPT.

<img width="732" height="729" alt="image" src="https://github.com/user-attachments/assets/d761c360-cf05-4746-84ea-45fb696f6b39" />


## Возможности

- **Аутентификация** — регистрация и вход через JWT
- **Управление задачами** — создание, редактирование, удаление
- **Приоритеты** — низкий / средний / высокий
- **Фильтры** — все / активные / выполненные
- **AI-помощник** — разбивает задачу на подзадачи через OpenAI
- **Статистика** — всего / активных / выполнено
- **Адаптивный интерфейс** — работает на мобильных и десктопе

## Стек технологий

### Backend
- **Python 3.12** — язык разработки
- **FastAPI** — веб-фреймворк с автодокументацией
- **SQLAlchemy 2.0 (async)** — ORM с асинхронной поддержкой
- **PostgreSQL** — база данных
- **Alembic** — миграции
- **JWT** — аутентификация
- **passlib + bcrypt** — хеширование паролей
- **Pydantic** — валидация данных
- **OpenAI API** — интеграция с GPT

### Frontend
- **React 19** — UI-библиотека
- **Vite** — сборщик
- **Tailwind CSS v4** — стилизация
- **Axios** — HTTP-клиент
- **React Router** — маршрутизация

### Инфраструктура
- **Docker + Docker Compose** — контейнеризация
- **GitHub Actions** — CI/CD

## Архитектура
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ Frontend │─────▶│ Backend │─────▶│ DB │
│ React │ HTTP │ FastAPI │ SQL │ PostgreSQL │
│ :5173 │ │ :8000 │ │ :5432 │
└─────────────┘ └─────────────┘ └─────────────┘
│
▼
┌─────────────┐
│ OpenAI API │
└─────────────┘

**Backend** построен по слоям:
- `models/` — модели SQLAlchemy
- `schemas/` — Pydantic-схемы
- `services/` — бизнес-логика
- `api/` — эндпоинты FastAPI

## Быстрый старт

### Требования
- **Docker Desktop** (запущен)
- Git

### Установка

1. **Клонировать репозиторий:**
   ```bash
   git clone https://github.com/Tkaheva/-AI--.git
   cd -AI--

   (Опционально) Заполнить OPENAI_API_KEY в backend/.env.
Если ключа нет — AI-помощник вернёт заглушки (4 стандартные подзадачи).

Запустить через Docker Compose:

bash
docker compose up -d --build
Открыть:

Frontend: http://localhost:5173

API Docs (Swagger): http://localhost:8000/docs

API Endpoints
Аутентификация
Метод	Endpoint	Описание
POST	/api/auth/register	Регистрация
POST	/api/auth/login	Вход
GET	/api/auth/me	Текущий пользователь
Задачи
Метод	Endpoint	Описание
GET	/api/tasks	Список задач
POST	/api/tasks	Создать задачу
PATCH	/api/tasks/{id}	Обновить задачу
DELETE	/api/tasks/{id}	Удалить задачу
AI
Метод	Endpoint	Описание
POST	/api/ai/suggest	Разбить задачу на подзадачи
Скриншоты
Вход
https://docs/screenshots/login.png

Дашборд
https://docs/screenshots/dashboard.png

AI-помощник
<img width="361" height="300" alt="image" src="https://github.com/user-attachments/assets/eb5f2004-717b-4850-bd92-4add33711047" />
<img width="735" height="833" alt="image" src="https://github.com/user-attachments/assets/f22fde18-947f-4e08-874e-dc957ae3525d" />
<img width="735" height="722" alt="image" src="https://github.com/user-attachments/assets/47b0f76d-3067-43b9-b695-937a70ed898e" />\
<img width="728" height="612" alt="image" src="https://github.com/user-attachments/assets/dcb6382f-08b3-474e-8e6d-8b031249dac2" />





Структура проекта
.
├── .github/
│   └── workflows/
│       └── ci.yml               # CI: линт + сборка
├── backend/
│   ├── alembic/                 # Миграции
│   ├── app/
│   │   ├── api/                 # Эндпоинты
│   │   ├── models/              # SQLAlchemy-модели
│   │   ├── schemas/             # Pydantic-схемы
│   │   ├── services/            # Бизнес-логика
│   │   ├── config.py
│   │   ├── database.py
│   │   └── main.py
│   ├── .env.example
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── api/                 # HTTP-клиент
│   │   ├── components/          # React-компоненты
│   │   ├── pages/               # Страницы
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md

Полезные команды
bash
# Запустить всё
docker compose up -d --build

# Остановить
docker compose down

# Логи
docker compose logs -f backend
docker compose logs -f frontend

# Применить миграции
docker compose exec backend alembic upgrade head

# Подключиться к БД
docker compose exec db psql -U user -d tasks

# Войти в backend-контейнер
docker compose exec backend bash

CI/CD
При каждом git push в main GitHub Actions запускает:

Backend — установка зависимостей, проверка импортов

Frontend — установка зависимостей, сборка

Статус: https://github.com/Tkaheva/-AI--/actions/workflows/ci.yml/badge.svg
Автор
Анастасия Ткачева

GitHub: @Tkaheva
