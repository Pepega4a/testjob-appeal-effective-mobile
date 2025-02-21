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

## Скриншоты

![image](https://github.com/user-attachments/assets/fdbe2a24-f57a-414f-be16-9096abc63c15)
![image](https://github.com/user-attachments/assets/efdddaed-2050-4081-b830-5831a16ff0a6)
![image](https://github.com/user-attachments/assets/34aa1150-1163-4e42-b677-42f16dadbfcc)
![image](https://github.com/user-attachments/assets/a9b91268-5dba-4fab-b510-b82f256cb943)

