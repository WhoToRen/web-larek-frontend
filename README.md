# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

## Структура проекта:

- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

## Важные файлы:

- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
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

# Базовые классы

## 1. Component

Абстрактный класс, определяющий основные методы и свойства для всех компонентов приложения.

**Конструктор**: constructor(protected readonly container: HTMLElement)

**Методы:**
- protected setText(element: HTMLElement, value: unknown) - установка текста

- setDisabled(element: HTMLElement, state: boolean) - блокировка 

- setHidden(element: HTMLElement) - скрыть элемент

- setVisible(element: HTMLElement) - показать элемент

- setImage(element: HTMLImageElement, src: string, alt?: string) - установить изображение

- render(data?: Partial<T>): HTMLElement - рендер

## 2. EventEmitter

Класс, отвечающий за работу с событиями в приложении. Позволяет устанавливать и снимать слушатели.

**Конструктор:** this._events = new Map<EventName, Set<Subscriber>>();

**Методы:**
- on<T extends object>(eventName: EventName, callback: (event: T) => void) - добавить слушатель события
- off(eventName: EventName, callback: Subscriber) - удалить слушатель события
- emit<T extends object>(eventName: string, data?: T) - инициировать событие с данными
- onAll(callback: (event: EmitterEvent) => void) - слушать все события
-  offAll() - сбросить все обработчики
- trigger<T extends object>(eventName: string, context?: Partial<T>) - вернуть функцию, инициирующую заданное событие

## 3. Model

Базовый абстрактный класс для создания классов моделей.

**Конструктор**: constructor(data: Partial<T>, protected events: IEvents)

**Методы:**
- emitChanges(event: string, payload?: object) - сообщить всем, что модель поменялась

## 4. API

Базовый класс для взаимодействия с API сервера, предоставляющий методы для выполнения HTTP-запросов.

**Конструктор:**  constructor(baseUrl: string, options: RequestInit = {})

**Свойства:** 

- baseUrl: string;
- options: RequestInit;

**Методы:**
- get(uri: string) - get-запрос. 
- post(uri: string, data: object, method: ApiPostMethods = 'POST') - post-запрос.

## Слой представления

## 1. Page

Класс для отображения страницы.

**Конструктор:** constructor(container: HTMLElement, protected events: IEvents)

**Свойства:** 

- _basketCounter: HTMLElement;
- _catalog: HTMLElement;
- _basket: HTMLElement;
- _wrapper: HTMLElement;

**Методы** 

- set catalog(catalog: HTMLElement[]) - установить каталог товаров
- set locked(value: boolean) - заблокировать страницу
- set basketCounter(value: number) - установить счетчик на корзину

## 2. Modal

Класс, отвечающий за отображение модальных окон и взаимодействие с ними (открытие и закрытие). Наследует абстрактный класс Component.

**Конструктор:** constructor(container: HTMLElement, protected events: IEvents)

**Свойства**: 

- _closeButton: HTMLButtonElement - кнопка для закрытия
- _content: - содержимое модального окна

**Методы:**
- open() - открыть модальное окно.
- close() - закрыть модальное окно.
- set content(value: HTMLElement) - установить содержимое модального окна.


## 3. Basket

Класс для корзины.

**Конструктор:** constructor(container: HTMLElement, protected events: IEvents)

**Свойства:** 

- _list: HTMLElement - список товаров в корзине
- _total: HTMLElement - общая стоимость
- _button: HTMLButtonElement - кнопка

**Методы:**
- set products(products: HTMLElement[]) - установить список товаров
- set total(total: number) - установить общую сумму

## 4. Product

Класс для карточки товара.

**Конструктор:** constructor(element: HTMLElement, eventEmitter: EventEmitter)

**Свойства:** 
- _image: HTMLImageElement - изображение
- _title: HTMLElement - название
- _category: HTMLElement - категория 
- _price: HTMLElement - цена
- _button: HTMLButtonElement - кнопка

**Методы:**

- set image(value: string) - установит изображение
- set title(value: string) - установить название
- set price(value: number) - установить цену 
- set category(category: string) - установить категорию
- set status(status: boolean) - установить статус, если товар бесценен 

## 5. ProductViewModal 

Подкласс для отображения товара в модальном окне. 

**Конструктор**: constructor(container: HTMLElement, actions: IProductActions)

**Свойства:** _description: HTMLElement - описание товара

**Методы:** set description(value: string) - установить описание


## 6. ProductInBasketView 

Подкласс для отображения товара в корзине. 

**Конструктор**: constructor(container: HTMLElement, actions: IProductActions)

**Свойства:**

- index: HTMLElement - индекс товара
- _price: HTMLElement - цена товара 
- _title: HTMLElement - название товара
- _button: HTMLButtonElement - кнопка

**Методы:** set description(value: string) - установить описание

- set index(value: string) - установить индекс
- set price(value: string) - установить цену
- set title(value: string) - установить текст


## 7. Order 

Класс для заказа.

**Конструктор**: constructor(container: HTMLElement, actions: IProductActions)

**Свойства:**

- index: HTMLElement - индекс товара
- _price: HTMLElement - цена товара 
- _title: HTMLElement - название товара
- _button: HTMLButtonElement - кнопка

**Методы:** set description(value: string) - установить описание

- set index(value: string) - установить индекс
- set price(value: string) - установить цену
- set title(value: string) - установить текст


## 7. OrderForm 

Класс для заказа.

**Конструктор:** constructor(
    protected blockName: string,
    container: HTMLFormElement,
    protected events: IEvents
  )

**Свойства:** 

_card: HTMLButtonElement - для оплаты по карте
_cash: HTMLButtonElement - для оплаты наличкой
_address: HTMLInputElement - для установки адреса

## 8. OrderConfirmationView

Класс для оповещения об успешном заказе. 

**Конструктор:** (container: HTMLFormElement, actions: IConfirmationActions)

**Свойства:** 

- _close: HTMLElement - закрыть окно после успешного заказа
- _title: HTMLElement - заголовок
- _description: HTMLElement - описание
- total: any - общая сумма покупки

**Методы**:

- set title(value: string) - установить заголовок
- set description(value: string) - установить описание


# Слой данных

## 1. AppData

Класс для управления данными приложения.

**Конструктор:** constructor(
		data: Partial<IAppData>,
		protected events: IEvents,
		items: IProduct[],
		basket: IProduct[],
		order: IOrder
	)

**Свойства:** 

- catalog: IProduct[] - каталог
- basket: IProduct[] - корзина
- order: IOrder = {
		payment: 'online',
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	} - заказ
- selectedProduct: string | null - выбранный товар
- formErrors: FormErrors = {} - ошибки в форме
- items: any - товары 

**Методы:**

- setCatalog(items: IProduct[]) - установить каталог
- getCatalog() - получить каталог
- getBasket() - получить корзину
- addProductToBasket(product: IProduct) - добавить товар в корзину
- removeProductFromBasket(product: IProduct) - убрать товар из корзины
- getTotalPrice(): number - получть общую стоимость
- clearBasket() - очистить корзину
- getOrder() - получить заказ
- isFirstFormFill() - проверка, заполнена ли форма
- setOrderField(field: keyof IOrderForm, value: string) - установить поле для заполнения 
- clearOrder() - очистить заказ
- validateOrder(field: keyof IOrder) - валидация форм


## 2. Form

Класс для формы. 

**Конструктор:** (protected container: HTMLFormElement, protected events: IEvents)

**Свойства**: 

- _submit: HTMLButtonElement - отправка формы
- _errors: HTMLElement - ошибки в форме

**Методы:**

- set valid(value: boolean) - установить валидность формы
- set errors(value: string) - установить ошибки формы
- 

  ## 3. ContactsForm

Класс для контактных данных формы.

**Конструктор:** constructor(container: HTMLFormElement, protected events: IEvents)

**Свойства**: 

- _inputPhone: HTMLInputElement - поле ввода телефона
- _inputEmail: HTMLInputElement - поле ввода почты
  
**Методы:**

- set inputPhone(value: string) - ввести номер телефона
- set inputEmail(value: string) - ввести почту
- clearForm() - очистить форму

# Слой коммуникации

## 1. AppApi

Класс для получения данных с сервера.

**Конструктор:** constructor(cdn: string, baseUrl: string, options?: RequestInit)

**Свойства:**

- cdn: string - изображение
- items: IProduct[] - товар

**Методы:**

- getProducts(): Promise<IProductList<IProduct>> - получить каталог товаров 
- createOrder(order: IOrder): - создать заказ

# События в приложении (AppEvents):

- MODAL_OPEN = 'modal:open',
- MODAL_CLOSE = 'modal:close',
- BASKET_OPEN = 'basket:open',
- BASKET_ADD = 'basket:add',
- PRODUCTS_CHANGED = 'products:changed',
- PRODUCT_PREVIEW = 'product:preview',
- PRODUCT_DELETE = 'product:delete',
- FORM_USERDATA_SUBMIT = 'form-userdata:submit',
- BASKET_CLEAR = 'basket:clear',
- BASKET_CHANGED = 'basket:changed',
- ITEM_SELECTED = 'item:selected',
- ORDER_OPEN = 'order:open',
- ORDER_CONFIRM = 'order:confirm',
- FORM_ERRORS_CHANGED = 'form:errors-changed',
- ORDER_CLEAR = 'order:clear',
- FORM_ERROR = 'form:error',
- FORM_SUBMIT = 'form:submit',
- CONTACTS_SUBMIT = 'contacts:submit',
- INPUT_CHANGE = 'input:change',
- SET_PAYMENT_TYPE = 'order: set_peyment-type',


# Интерфейсы в приложении: 

Интерфейс страницы:

```

interface IPage {
	basketCounter: number;
	products: HTMLElement[];
	locked: boolean;
}

```

Интерфейс формы заказа: 

```

interface IOrderForm {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

```

Интерфейс товара: 

```

interface IProduct {
	selected: boolean;
	id: string;
	description?: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

```

Интерфейс корзины: 

```

interface IBasket {
	products: HTMLElement[];
	total: number;
	resetBasket(): void;
}

```

Интерфейс данных: 

```

interface IAppData {
	catalog: IProduct[];
	basket: IProduct[];
	order: IOrder;
	clearBasket(): void;
}

```
Интерфейс данных заказа: 

```

interface IOrder {
	address: string;
	phone: string;
	payment: string;
	email: string;
	total: number;
	items: string[];
}

```

Интерфейс результата заказа: 

```

interface IOrderResult {
	total: any;
	error: any;
	id: string;
	status: 'success' | 'error';
	message?: string;
}

```

Интерфейс карточки товара: 

```

interface IProductView {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: string;
	button: string;
	status: boolean;
}

```

# Типы данных в приложении: 

```

export type orderUserData = Pick<IOrder, 'email' | 'phone'>;
export type orderDelivery = Pick<IOrder, 'payment' | 'address'>;
export type paymentMethod = 'online' | 'cash'; 
export type IBasketView = Pick<IProduct, 'id' | 'title' | 'price'>;
export type ListItem = { index: number; }

```
