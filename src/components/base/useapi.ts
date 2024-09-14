import { Api } from './api';
import { IProductList, IOrder, IOrderResult, IProduct } from '../../types';

export interface UseApi {
	getProducts(): Promise<IProductList<IProduct>>;
	createOrder(order: IOrder): Promise<IOrderResult>;
}

export class AppApi extends Api implements UseApi {
    makeOrder(order: IOrder) {
        throw new Error('Method not implemented.');
    }
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getProducts(): Promise<IProductList<IProduct>> {
		return this.get('/product') as Promise<IProductList<IProduct>>;
	}

	createOrder(order: IOrder): Promise<IOrderResult> {
		return this.post('/order', order) as Promise<IOrderResult>;
	}
}
