import { AppData, ProductsChangeEvent } from './components/data';
import { AppApi } from './components/base/useapi';
import { PageView } from './components/page';
import {
	ProductView,
	ProductViewModal,
	ProductInBasketView,
} from './components/product';
import { BasketView } from './components/common/basket';
import { OrderForm } from './components/order';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { AppEvents, IOrder, IProduct } from './types';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, createElement, ensureElement } from './utils/utils';
import { Modal } from './components/common/modal';
import { ContactsForm } from './components/common/contacts';
import { OrderConfirmationView } from './components/common/orderconfirmation';

const events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const productModal = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
export const productInBasket =
	ensureElement<HTMLTemplateElement>('#card-basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successOrderTemplate = ensureElement<HTMLTemplateElement>('#success');

export const basketView = new BasketView(cloneTemplate(basketTemplate), events);
const orderForm = new OrderForm('order', cloneTemplate(orderTemplate), events);
const contactsForm = new ContactsForm(cloneTemplate(contactsTemplate), events);

const ConfirmationView = new OrderConfirmationView(
	cloneTemplate(successOrderTemplate),
	{
		onClick: () => {
			modal.close();
			events.emit(AppEvents.ORDER_CLEAR);
		},
	}
);

const appData = new AppData({}, events, [], [], {
	email: '',
	phone: '',
	payment: null,
	address: '',
	total: 0,
	items: [],
});

const pageView = new PageView(document.body, events);

api
	.getProducts()
	.then((data) => appData.setCatalog(data.items))
	.catch((err) => {
		console.error(err);
	});

events.on<ProductsChangeEvent>(AppEvents.PRODUCTS_CHANGED, () => {
	pageView.basketCounter = appData.getBasket().length;
	pageView.catalog = appData.getCatalog().map((item) => {
		const product = new ProductView(cloneTemplate(cardCatalogTemplate), {
			onClick: () => {
				events.emit(AppEvents.PRODUCT_PREVIEW, item);
			},
		});
		return product.render({
			id: item.id,
			title: item.title,
			image: CDN_URL + item.image,
			category: item.category,
			price: item.price ? `${item.price} синапсов` : 'Бесценно',
		});
	});
});

events.on(AppEvents.PRODUCT_PREVIEW, (product: IProduct) => {
	const card = new ProductViewModal(cloneTemplate(productModal), {
		onClick: () => events.emit(AppEvents.BASKET_ADD, product),
	});

	modal.render({
		content: card.render({
			title: product.title,
			image: CDN_URL + product.image,
			category: product.category,
			description: product.description,
			price: product.price ? `${product.price} синапсов` : '',
			status:
				product.price === null ||
				appData.getBasket().some((item) => item === product),
		}),
	});
});

events.on(AppEvents.MODAL_OPEN, () => {
	pageView.locked = true;
});
events.on(AppEvents.MODAL_CLOSE, () => {
	pageView.locked = false;
});

events.on(AppEvents.BASKET_ADD, (product: IProduct) => {
	appData.addProductToBasket(product);
	pageView.basketCounter = appData.getBasket().length;
	modal.close();
	events.emit(AppEvents.BASKET_CHANGED);
});

events.on(AppEvents.PRODUCT_DELETE, (product: IProduct) => {
	appData.removeProductFromBasket(product);
	events.emit(AppEvents.BASKET_OPEN);
	pageView.basketCounter = appData.getBasket().length;
});

events.on(AppEvents.BASKET_OPEN, () => {
	const products = appData.getBasket().map((item, index) => {
		const product = new ProductInBasketView(cloneTemplate(productInBasket), {
			onClick: () => events.emit(AppEvents.PRODUCT_DELETE, item),
		});
		return product.render({
			index: index + 1,
			id: item.id,
			title: item.title,
			price: item.price,
		});
	});
	modal.render({
		content: createElement<HTMLElement>('div', {}, [
			basketView.render({
				products,
				total: appData.getTotalPrice(),
			}),
		]),
	});
});

events.on(AppEvents.ORDER_OPEN, () => {
	if (!appData.isFirstFormFill()) {
		const data = {
			address: '',
		};
		modal.render({
			content: orderForm.render({
				valid: false,
				errors: [],
				...data,
			}),
		});
	} else {
		const data = {
			phone: '',
			email: '',
		};
		modal.render({
			content: contactsForm.render({
				valid: false,
				errors: [],
				...data,
			}),
		});
	}
});

events.on(
	/(^order|^contacts)\..*:change/,
	(data: { field: keyof Omit<IOrder, 'items' | 'total'>; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

events.on(AppEvents.FORM_ERRORS_CHANGED, (errors: Partial<IOrder>) => {
	const { email, phone, address, payment } = errors;
	orderForm.valid = !address && !payment;
	orderForm.errors = Object.values(errors)
		.filter((i) => !!i)
		.join(', ');

	contactsForm.valid = !email && !phone;
	contactsForm.errors = Object.values(errors)
		.filter((i) => !!i)
		.join(', ');
});

events.on(AppEvents.FORM_ERRORS_CHANGED, (errors: Partial<IOrder>) => {
	const { email, phone, address, payment } = errors;
	orderForm.valid = !address && !payment;
	orderForm.errors = Object.values(errors)
		.filter((i) => !!i)
		.join(', ');

	contactsForm.valid = !email && !phone;
	contactsForm.errors = Object.values(errors)
		.filter((i) => !!i)
		.join(', ');
});

events.on(/(^order|^contacts):submit/, () => {
	if (
		!appData.getOrder().email ||
		!appData.getOrder().address ||
		!appData.getOrder().phone
	) {
		return events.emit(AppEvents.ORDER_OPEN);
	}
	const products = appData.getBasket();

	api
		.createOrder({
			...appData.getOrder(),
			items: products.map((product) => product.id),
			total: appData.getTotalPrice(),
		})
		.then((result) => {
			modal.render({
				content: ConfirmationView.render({
					title: !result.error ? 'Заказ оформлен!' : 'Произошла ошибка',
					description: !result.error
						? `Списано ${result.total} синапсов`
						: result.error,
				}),
			});
			events.emit(AppEvents.ORDER_CONFIRM);
		})
		.catch(console.error);
});

events.on(AppEvents.ORDER_CLEAR, () => {
	appData.clearBasket();
	appData.clearOrder();
	orderForm.disableButtons();
	contactsForm.clearForm();
});

events.on('MODAL_OPEN', () => {
	pageView.locked = true;
});

// ... и разблокируем
events.on('MODAL_CLOSE', () => {
	pageView.locked = false;
});
