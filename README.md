## Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

<<<<<<< HEAD
# Структура проекта:
=======
## Структура проекта:
>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

<<<<<<< HEAD
# Важные файлы:
=======
## Важные файлы:
>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск

Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```

## Сборка

```
npm run build
```

или

```
yarn build

```

<<<<<<< HEAD
## Базовые классы

# 1. Component
=======
# Базовые классы

## 1. Component
>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7

Абстрактный класс, определяющий основные методы и свойства для всех компонентов приложения.

**Конструктор**: element: HTMLElement
<<<<<<< HEAD
=======

>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
**Методы:**
- toogleClass - переключить класс у элемента
- addClass - добавить класс элементу
- removeClass - удалить класс у элемента
- setTextContent - установить текстовое содержимое элемента
- setImage - установить изображение
- hideElement - скрыть элемент
- showElement - показать элемент
- render - рендер

<<<<<<< HEAD
# 2. EventEmitter

Класс, отвечающий за работу с событиями в приложении. Позволяет устанавливать и снимать слушатели.
**Конструктор:** new Map
=======
## 2. EventEmitter

Класс, отвечающий за работу с событиями в приложении. Позволяет устанавливать и снимать слушатели.

**Конструктор:** new Map

>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
**Методы:**
- on - добавить слушатель события
- off - удалить слушатель события
- emit - вызывает событие
- onAll - добавить слушатель на все события
- offAll - удалить слушатель со всех событий
- trigger - вернуть функцию, инициирующую заданное событие

<<<<<<< HEAD
# 3. Model

Базовый класс для создания классов моделей.
**Конструктор**: data: Partial<T>, protected events: IEvents
**Свойства:** events
**Методы:**
- emitChanges - извещение об изменении

# 4. API

Базовый класс для взаимодействия с API сервера, предоставляющий методы для выполнения HTTP-запросов.
**Конструктор:** baseUrl: string, options: RequestInit
=======
## 3. Model

Базовый класс для создания классов моделей.

**Конструктор**: data: Partial<T>, protected events: IEvents

**Свойства:** events

**Методы:**
- emitChanges - извещение об изменении

## 4. API

Базовый класс для взаимодействия с API сервера, предоставляющий методы для выполнения HTTP-запросов.

**Конструктор:** baseUrl: string, options: RequestInit

>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
**Методы:**
get() - выполнить GET-запрос.
post() - выполнить POST-запрос.
put() - выполнить PUT-запрос.
delete() - выполнить DELETE-запрос.

<<<<<<< HEAD
## Слой представления

# 1. Page

Класс для отображения страницы.
**Конструктор:** HTMLElement, events: IEvents
**Свойства:** catalog, basketIcon, basketCounter, modalContainer
=======
# Слой представления

## 1. Page

Класс для отображения страницы.

**Конструктор:** HTMLElement, events: IEvents

**Свойства:** catalog, basketIcon, basketCounter, modalContainer

>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
**Методы:**
- set catalog - добавить товары на страницу
- set basketCounter - добавить счетчик к иконке корзины

<<<<<<< HEAD
# 2. Modal

Класс, отвечающий за отображение модальных окон и взаимодействие с ними (открытие и закрытие). Наследует абстрактный класс Component.
**Конструктор:** events: IEvents
=======
## 2. Modal

Класс, отвечающий за отображение модальных окон и взаимодействие с ними (открытие и закрытие). Наследует абстрактный класс Component.

**Конструктор:** events: IEvents

>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
**Методы:**
open() - открыть модальное окно.
close() - закрыть модальное окно.
set content(value: HTMLElement) - установить содержимое модального окна.

<<<<<<< HEAD
# 3. Basket

Класс для корзины.
**Конструктор:** element: HTMLElement, eventEmitter: EventEmitter
**Свойства:** getTotalPrice, itemList, buttonBasket
=======
## 3. Basket

Класс для корзины.

**Конструктор:** element: HTMLElement, eventEmitter: EventEmitter

**Свойства:** getTotalPrice, itemList, buttonBasket

>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
**Методы:**
- set itemList - установить список товаров
- set totalPrice - установить общую сумму

<<<<<<< HEAD
# 4. Card

Класс для карточки товара.
**Конструктор:** constructor(element: HTMLElement, eventEmitter: EventEmitter)
**Свойства:** id, category, name, image, description, price, button
=======
## 4. Card

Класс для карточки товара.

**Конструктор:** constructor(element: HTMLElement, eventEmitter: EventEmitter)

**Свойства:** id, category, name, image, description, price, button

>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
**Методы:**
- set id - установить id
- set category - установить категорию товара
- set name - установить наименование товара
- set image - установить фото товара
- set description - установить описание товара
- set price - установить цену товара
- set button - установить текст для кнопки

<<<<<<< HEAD
# 5. Order

Класс для заказа.
**Конструктор:** HTMLFormElement, events: EventEmitter
**Свойства:** cashButton, onlineButton, adressInput
=======
## 5. Order

Класс для заказа.

**Конструктор:** HTMLFormElement, events: EventEmitter

**Свойства:** cashButton, onlineButton, adressInput

>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
**Методы:**
- set paymentMethod - установить способ оплаты
- set address - установить адрес
- changePayment - изменить способ оплаты

<<<<<<< HEAD
# 6. UserInfo

Класс для пользовательских данных (почта и номер телефона).
**Конструктор:** element: HTMLElement, eventEmitter: EventEmitter
**Свойства:** email, phone
=======
## 6. UserInfo

Класс для пользовательских данных (почта и номер телефона).

**Конструктор:** element: HTMLElement, eventEmitter: EventEmitter

**Свойства:** email, phone

>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
**Методы:**
- set email - установить имейл
- set phone - установить номер телефона

<<<<<<< HEAD
# 7. FormValidation

Класс для проверки валидации форм.
**Конструктор:** HTMLFormElement, events: EventEmitter
**Свойства:** inputName, submit, errors
=======
## 7. FormValidation

Класс для проверки валидации форм.

**Конструктор:** HTMLFormElement, events: EventEmitter

**Свойства:** inputName, submit, errors

>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
**Методы:**
- set valid - проверить на валидность формы
- set errors - установить ошибку

<<<<<<< HEAD
# 8. OrderConfirmation

Класс для подверждения успешного заказа.
**Конструктор:** element: HTMLElement, eventEmitter: EventEmitter
**Свойства:** title, description, closeButton
=======
## 8. OrderConfirmation

Класс для подверждения успешного заказа.

**Конструктор:** element: HTMLElement, eventEmitter: EventEmitter

**Свойства:** title, description, closeButton

>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
**Методы:**
- set title - текст с подтверждением заказа
- set description - текст с общей стоимостью

<<<<<<< HEAD
## Слой данных

# 1. Data

Класс для управления данными приложения.
**Конструктор:** events: IEvents
**Свойства:** item, itemsList, basket, order
=======
# Слой данных

## 1. Data

Класс для управления данными приложения.

**Конструктор:** events: IEvents

**Свойства:** item, itemsList, basket, order

>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
**Методы:**
- setItems - получить каталог товаров
- selectItem - выбрать товар
- isBasketEpmty - проверить, пуста ли корзина
- addToBasket - добавить в корзину
- deleteFromBasket - удалить из корзины
- clearBasket - очистить корзину
- getOrder - создать заказ
- clearOrder - очистить заказ

<<<<<<< HEAD
## Слой коммуникации

# 1. UseAPI

Класс для получения данных с сервера.
**Конструктор:** baseUrl: string, options?: RequestInit
=======
# Слой коммуникации

## 1. UseAPI

Класс для получения данных с сервера.

**Конструктор:** baseUrl: string, options?: RequestInit

>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
**Методы:**
- getItemsList - получить список доступных товаров
- makeOrder - сделать заказ

<<<<<<< HEAD
## События в приложении:

MODAL_OPEN = 'modal:open' - открытие модального окна
MODAL_CLOSE = 'modal:close' - закрытие модального окна
BASKET_ADD = 'basket:add' - добавление товара в корзину
BASKET_REMOVE = 'basket:remove' -  удаление товара из корзины
BASKET_CLEAR = 'basket:clear' - очистка корзины
BASKET_CHANGED = 'basket:changed' - изменения в корзине
ITEM_SELECTED = 'item:selected' - выбранный товар
ORDER_CREATE = 'order:create' - создание нового заказа
ORDER_CONFIRM = 'order:confirm' - подтверждение заказа
ORDER_CLEAR = 'order:clear' - очищение заказа
FORM_ERROR = 'form:error' - ошибка в форме
FORM_SUBMIT = 'form:submit' - отправка формы
INPUT_CHANGE = 'input:change' - изменение данных
=======
# События в приложении:

- MODAL_OPEN = 'modal:open' - открытие модального окна
- MODAL_CLOSE = 'modal:close' - закрытие модального окна
- BASKET_ADD = 'basket:add' - добавление товара в корзину
- BASKET_REMOVE = 'basket:remove' -  удаление товара из корзины
- BASKET_CLEAR = 'basket:clear' - очистка корзины
- BASKET_CHANGED = 'basket:changed' - изменения в корзине
- ITEM_SELECTED = 'item:selected' - выбранный товар
- ORDER_CREATE = 'order:create' - создание нового заказа
- ORDER_CONFIRM = 'order:confirm' - подтверждение заказа
- ORDER_CLEAR = 'order:clear' - очищение заказа
- FORM_ERROR = 'form:error' - ошибка в форме
- FORM_SUBMIT = 'form:submit' - отправка формы
- INPUT_CHANGE = 'input:change' - изменение данных
>>>>>>> 51fd3a13b5e7003e2192aec8c45fad5d78e630f7
