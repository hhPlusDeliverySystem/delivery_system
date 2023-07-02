import { MyCart } from '../myCart.entity';

export class MyCartDto {
  id: number;
  orderId: string;
  storeName: string;
  menuName: string;
  unitCount: number;
  menuPrice: number;
  deliveryPrice: number;
  totalPrice: number;

  constructor(myCart: MyCart) {
    this.id = myCart.id;
    this.orderId = myCart.orderId;
    this.storeName = myCart.storeName;
    this.menuName = myCart.menuName;
    this.unitCount = myCart.unitCount;
    this.menuPrice = myCart.menuPrice;
    this.deliveryPrice = myCart.deliveryPrice;
    this.totalPrice = myCart.totalPrice;
  }
}
