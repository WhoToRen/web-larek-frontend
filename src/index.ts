import './scss/styles.scss';

// типы
type orderUserData = Pick<IOrder, 'email' | 'phone'>;
type orderDelivery = Pick<IOrder, 'payment' | 'address'>; 
type itemCategoryType = | 'софт-скил' | 'другое' | 'дополнительное' | 'кнопка' | 'хард-скил';

// юзер-апи
export interface IUserAPI {
    getItemsList(): Promise<IProduct[]>;
    makeOrder(order: IOrder): Promise<IOrder>;
  }

  // интерфейс для товара
export interface IProduct {
	id: string;
	description?: string;
	image: string;
	name: string;
	category: string;
	price: number | null;
}

// интерфейс для корзины
export interface IBasket {
	items: IProduct[];
	total: number; 
}

// интерфейс для заказа
export interface IOrder {
	address: string;
	phone: string;
	payment: string;
	email: string;
	total: number;
	items: string[]
}

// интерфейс проверки формы
export interface IFormIsValid {
    valid: boolean;
    errors: string[];
}

// интерфейс для результатов заказа
export interface IOrderResult {
    id: string;
    status: 'success' | 'error';
    message?: string;
  }