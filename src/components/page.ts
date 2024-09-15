import { AppEvents, IPage } from '../types';
import { ensureElement } from '../utils/utils';
import { Component } from './base/component';
import { IEvents } from './base/events';

export class PageView extends Component<IPage> {
	_basketCounter: HTMLElement;
	protected _catalog: HTMLElement;
	protected _basket: HTMLElement;
	protected _wrapper: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);

		this._basketCounter = ensureElement<HTMLElement>('.header__basket-counter');
		this._catalog = ensureElement<HTMLElement>('.gallery');
		this._basket = ensureElement<HTMLElement>('.header__basket');
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');

		this._basket.addEventListener('click', () => {
			this.events.emit(AppEvents.BASKET_OPEN);
		});
	}

	set catalog(catalog: HTMLElement[]) {
		this._catalog.replaceChildren(...catalog);
	}

	set locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	  }

	set basketCounter(value: number) {
		this.setText(this._basketCounter, String(value));
	}
}
