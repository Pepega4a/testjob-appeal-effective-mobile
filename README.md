# Система обработки обращений

## Установка
1. npm install
2. Убедитесь, что MongoDB запущен на localhost:27017
3. npm run start

## Эндпоинты

| Метод  | URL                              | Тело запроса (JSON)                     | Описание                     |
|--------|----------------------------------|-----------------------------------------|------------------------------|
| POST   | `/appeals`                      | `{"topic": "Тест", "text": "Описание"}` | Создать обращение            |
| PATCH  | `/appeals/:id/take`             | -                                       | Взять в работу               |
| PATCH  | `/appeals/:id/complete`         | `{"resolution": "Решено"}`              | Завершить                    |
| PATCH  | `/appeals/:id/cancel`           | `{"cancelReason": "Причина"}`           | Отменить                    |
| GET    | `/appeals?date=2025-02-21`      | -                                       | Список по дате              |
| GET    | `/appeals?startDate=2025-02-01&endDate=2025-02-28` | -                    | Список по диапазону         |
| POST   | `/appeals/cancel-all-in-progress` | -                                     | Отменить все "В работе"     |