import { IEvents } from './base/events';
import {
	IProduct,
	IAppData,
	IOrder,
	FormErrors,
	AppEvents,
	IOrderForm,
} from '../types';
import { Model } from './base/model';

export type ProductsChangeEvent = {
	items: IProduct[];
};

export class AppData extends Model<IAppData> {
	catalog: IProduct[];
	basket: IProduct[];
	order: IOrder = {
		payment: 'online',
		address: '',
		email: '',
		phone: '',
		total: 0,
		items: [],
	};
	selectedProduct: string | null;
	formErrors: FormErrors = {};
	items: any;

	constructor(
		data: Partial<IAppData>,
		protected events: IEvents,
		items: IProduct[],
		basket: IProduct[],
		order: IOrder
	) {
		super(data, events);
		this.catalog = items;
		this.basket = basket;
		this.order = order;
	}

	setCatalog(items: IProduct[]) {
		this.catalog = items;
		this.emitChanges(AppEvents.PRODUCTS_CHANGED, { catalog: this.catalog });
	}

	getCatalog() {
		return this.catalog;
	}

	getBasket() {
		return this.basket;
	}

	addProductToBasket(product: IProduct) {
		if (!this.basket.some((item) => item === product)) {
			this.basket.push(product);
		}
	}

	removeProductFromBasket(product: IProduct) {
		this.basket = this.basket.filter((item) => item !== product);
		this.emitChanges(AppEvents.BASKET_OPEN);
	}

	getTotalPrice(): number {
		return this.basket.reduce((total, item) => total + item.price, 0);
	}

	clearBasket() {
		this.basket = [];
		this.emitChanges(AppEvents.PRODUCTS_CHANGED, { products: this.items });
		this.events.emit(AppEvents.BASKET_CLEAR);
	}
	
	getOrder() {
		return this.order;
	}

	isFirstFormFill() {
		if (this.order === null) {
			return false;
		} else {
			return this.order.address && this.order.payment;
		}
	}

	setOrderField(field: keyof IOrderForm, value: string) {
		this.order[field] = value;

		if (this.validateOrder(field)) {
			this.emitChanges(AppEvents.FORM_USERDATA_SUBMIT, { order: this.order });
		}
	}

	clearOrder() {
		this.order = {
			items: [],
			total: null,
			address: '',
			email: '',
			phone: '',
			payment: '',
		};
	}

	validateOrder(field: keyof IOrder) {
		const errors: Partial<Record<keyof IOrder, string>> = {};

		if (field === "email" || field === "phone") {
			if (!this.order.email && !this.order.phone) {
				errors.email = `Необходимо указать Email и телефон`;
			}
			else if (!this.order.email) {
				errors.email = `Необходимо указать Email`;
			}
			else if (!this.order.phone) {
				errors.email = `Необходимо указать телефон`;
			}
		}
		else if (field === "address" || field === "payment" ) {
			if (!this.order.address && !this.order.payment) {
				errors.email = `Необходимо указать адресс и способ оплаты`;
			}
			else if (!this.order.address) {
				errors.email = `Необходимо указать адресс`;
			}
			else if (!this.order.payment) {
				errors.email = `Необходимо указать способ оплаты`;
			}
		}
		this.formErrors = errors;
		this.events.emit(AppEvents.FORM_ERRORS_CHANGED, this.formErrors);
		return Object.keys(errors).length === 0;
	}
}
