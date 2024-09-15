export type orderUserData = Pick<IOrder, 'email' | 'phone'>;
export type orderDelivery = Pick<IOrder, 'payment' | 'address'>;
export type paymentMethod = 'online' | 'cash';
export type IBasketView = Pick<IProduct, 'id' | 'title' | 'price'>;
export type ListItem = {
	index: number;
};

export interface IPage {
	basketCounter: number;
	products: HTMLElement[];
	locked: boolean;
}

export interface IOrderForm {
	payment: string;
	address: string;
	email: string;
	phone: string;
}

export interface IProduct {
	selected: boolean;
	id: string;
	description?: string;
	image: string;
	title: string;
	category: string;
	price: number | null;
}

export interface IBasket {
	products: HTMLElement[];
	total: number;
	resetBasket(): void;
}

export type FormErrors = {
	email?: string;
	phone?: string;
	address?: string;
	payment?: string;
};

export interface IAppData {
	catalog: IProduct[];
	basket: IProduct[];
	order: IOrder;
	clearBasket(): void;
}

export interface IOrder {
	address: string;
	phone: string;
	payment: string;
	email: string;
	total: number;
	items: string[];
}

export interface IOrderResult {
	total: any;
	error: any;
	id: string;
	status: 'success' | 'error';
	message?: string;
}

export interface IProductView {
	id: string;
	description: string;
	image: string;
	title: string;
	category: string;
	price: string;
	button: string;
	status: boolean;
}

export enum AppEvents {
	MODAL_OPEN = 'modal:open',
	MODAL_CLOSE = 'modal:close',
	BASKET_OPEN = 'basket:open',
	BASKET_ADD = 'basket:add',
	PRODUCTS_CHANGED = 'products:changed',
	PRODUCT_PREVIEW = 'product:preview',
	PRODUCT_DELETE = 'product:delete',
	FORM_USERDATA_SUBMIT = 'form-userdata:submit',
	BASKET_CLEAR = 'basket:clear',
	BASKET_CHANGED = 'basket:changed',
	ITEM_SELECTED = 'item:selected',
	ORDER_OPEN = 'order:open',
	ORDER_CONFIRM = 'order:confirm',
	FORM_ERRORS_CHANGED = 'form:errors-changed',
	ORDER_CLEAR = 'order:clear',
	FORM_ERROR = 'form:error',
	FORM_SUBMIT = 'form:submit',
	CONTACTS_SUBMIT = 'contacts:submit',
	INPUT_CHANGE = 'input:change',
	SET_PAYMENT_TYPE = 'order: set_peyment-type',
}
