import {
	IBasketView,
	ListItem,
	IProductView,
} from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/component';

interface IProductActions {
	onClick: (event: MouseEvent) => void;
}

export class ProductView extends Component<IProductView> {
	protected _image: HTMLImageElement;
	protected _title: HTMLElement;
	protected _category: HTMLElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions: IProductActions) {
		super(container);

		this._title = ensureElement<HTMLElement>('.card__title', container);
		this._image = ensureElement<HTMLImageElement>('.card__image', container);
		this._category = ensureElement<HTMLElement>('.card__category', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._button = container.querySelector('.card__button');

		if (actions?.onClick) {
			if (this._button) {
				this._button.addEventListener('click', actions.onClick);
			} else {
				container.addEventListener('click', actions.onClick);
			}
		}
	}

	set image(value: string) {
        this.setImage(this._image, value)
    }

	set title(value: string) {
		this.setText(this._title, value);
	}

	set price(value: number) {
		this.setText(this._price, value);
	}

	protected _categoryColor = <Record<string, string>> { // описания категории
		"софт-скил": "soft",
		"другое": "other",
		"дополнительное": "additional",
		"кнопка": "button",
		"хард-скил": "hard"
	  }
	
	
	  // метод установки содержимой категории
	  set category(value: string) {
		this.setText(this._category, value);
		this.toggleClass(this._category, `card__category_${this._categoryColor[value]}`, true)
	  }

	set status(status: boolean) {
		if (this._button) {
			if (this._price.textContent === '') {
				this.setText(this._button, 'Бесценно');
				this.setDisabled(this._button, true);
			} else {
				this.setText(this._button, status ? 'В корзине' : 'В корзину');
				this.setDisabled(this._button, status);
			}
		}
	}
}

export class ProductViewModal extends ProductView {
	protected _description: HTMLElement;

	constructor(container: HTMLElement, actions: IProductActions) {
		super(container, actions);
		this._description = ensureElement<HTMLElement>('.card__text', container);
	}

	set description(value: string) {
		this.setText(this._description, value);
	}
}

export class ProductInBasketView extends Component<IBasketView | ListItem> {
	protected _index: HTMLElement;
	protected _price: HTMLElement;
	protected _title: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions: IProductActions) {
		super(container);

		this._index = ensureElement<HTMLElement>('.basket__item-index', container);
		this._title = ensureElement<HTMLImageElement>('.card__title', container);
		this._price = ensureElement<HTMLElement>('.card__price', container);
		this._button = container.querySelector('.basket__item-delete');

		this._button.addEventListener('click', actions.onClick);
	}

	set index(value: string) {
		this.setText(this._index, value);
	}

	set price(value: string) {
		this.setText(this._price, `${value} синапсов`);
	}
	

	set title(value: string) {
		this.setText(this._title, value);
	}
}
