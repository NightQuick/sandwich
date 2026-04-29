import { pubSub } from '@dp/pubSub';
import { counter } from '@elements/counter';
import { ref, Ref } from 'vue';

export interface Position {
  description: string;
  image: string;
  name: string;
  price: number;
  value: number;
}

export class Order {
  visible: Ref<boolean>;
  positionList: Ref<Position[]>;
  orderPrice: number;
  events: boolean;
  constructor(orders: Position[]) {
    this.visible = ref(false);
    this.positionList = ref(orders);
    this.orderPrice = 0;
    this.events = false;
  }
}
export const order = new Order([]);
