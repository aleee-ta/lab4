//tsx ./script.ts --watch
'use strict';
//task1
interface UserInt {
    name : string
    age : number
    hello() : void
}

class UserIntImpl implements UserInt {
    name! : string
    age! : number
    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`)
    }
}

//task2
type UserType = {
    name : string
    age : number
}

class UserTypeImpl implements UserType {
    name! : string
    age! : number
    hello() {
        console.log(`Hi! My name is ${this.name}. And I am ${this.age} years old.`)
    }
}

//task3
type Point = {
    x : number
    y : number
}

function distance(x1: number, y1: number, x2: number, y2: number): number
function distance(p1: Point, p2: Point): number
function distance(p1orx1: number | Point, p2orx2 : number | Point, x2? : number, y2? : number) {
    if (typeof p1orx1 === 'number' && typeof p2orx2 === 'number' && typeof x2 === 'number' && typeof y2 === 'number') {
        return Math.sqrt((x2 - p1orx1)^2 + (y2-p2orx2)^2)
    } else if (typeof p1orx1 !== 'number' && typeof p2orx2 !== 'number') {
        return Math.sqrt((p2orx2.x - p1orx1.x)^2 + ((p2orx2.y - p1orx1.y)^2))
    } else {
        throw new Error("w?")
    }
}

//task4
class BNode<T> {
    public value: T;
    public left: BNode<T> | null = null;
    public right: BNode<T> | null = null;
    public par: BNode<T> | null = null;

    constructor(value: T) {
      this.value = value;
    }
  }

class BinaryTree<T> {
    private root: BNode<T> | null = null;

    public insert(value : T) : void {
        this.root = this.insertNode(this.root, value);
    }
    private insertNode(node: BNode<T> | null, value: T) : BNode<T> {
        if (node === null) {
            return new BNode(value);
        } else {
            if (node.value > value) {
                node.left = this.insertNode(node.left, value);
            } else {
                node.right = this.insertNode(node.right, value);
            }
            return node;
        }
    }

    public delete(value : T) : void {
        this.root = this.deleteNode(this.root, value);
    }
    private deleteNode(node: BNode<T> | null, value: T) : BNode<T> | null {
        if (node === null) {
            return node;
        }
        if (node.value === value) {
            if (node.left === null && node.right === null) {
                return null;
            }
            if (node.left === null && node.right !== null) {
                return node.right;
            }
            if (node.left !== null && node.right === null) {
                return node.left;
            }
            if (node.left !== null && node.right !== null) {
                node.value = this.minimum(node.right).value;
                node.right = this.deleteNode(node.right, node.value);
            }
        } else {
            if (node.value > value) {
                node.left = this.deleteNode(node.left, value);
            } else {
                node.right = this.deleteNode(node.right, value);
            }
        }
        return node;
    }

    private minimum(node: BNode<T>) : BNode<T> {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    }

    public search(value : T) : BNode<T> | null {
        return this.searchNode(this.root, value);
    }
    private searchNode(node : BNode<T> | null, value: T) : BNode<T> | null {
        if (node === null) {
            return null;
        } else {
            if (node.value === value) {
                return node;
            } else {
                if (node.value > value) {
                    return this.searchNode(node.left, value);
                } else {
                    return this.searchNode(node.right, value);
                }
            }
        }
    }

    public height() : number {
        return this.heightNode(this.root);
    }
    private heightNode(node: BNode<T> | null): number {
        if (node === null) {
            return 0;
        }
        return 1 + Math.max(this.heightNode(node.left), this.heightNode(node.right));
    }
}

//task5
//Adapter
interface PaymentDetailsInt {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

function sendPayment(details : PaymentDetailsInt) : void {
    //some business logic, kotoryu ya ne pridymal
}

class CreditCardDetails {
    cardNumber: string;
    expirationDate: string;
    securityCode: string;

    constructor(cardNumber: string, expirationDate: string, securityCode: string) {
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.securityCode = securityCode;
    }
}

class CreditCardDetailsAdapter implements PaymentDetailsInt {
    details : CreditCardDetails;
    
    constructor(details: CreditCardDetails) {
        this.details = details;
    }

    get cardNumber() {
        return this.details.cardNumber;
    }

    get expiryDate() {
        return this.details.expirationDate;
    }

    get cvv() {
        return this.details.securityCode;
    }
}
//Теперь можно использовать CreditCardDetails c sendPayment, так как названия сходятся
let some = new CreditCardDetails('s','o','me');
let ad = new CreditCardDetailsAdapter(some);
sendPayment(ad);

//Strategy
//общий интерфейс, можно менять сортировки на лету
interface SortStrategy {
    sort(arr: number[]): number[];
}
//пара конкретных сортировок
class BubbleSortStrategy implements SortStrategy {
    sort(arr: number[]): number[] {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          }
        }
      }
      return arr;
    }
}  
class SelectionSortStrategy implements SortStrategy {
    sort(arr: number[]): number[] {
      for (let i = 0; i < arr.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
          if (arr[j] < arr[minIndex]) {
            minIndex = j;
          }
        }
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      }
      return arr;
    }
}
//контекст, использующий конкретную сортировку
class SortContext {
    private strategy: SortStrategy;
  
    constructor(strategy: SortStrategy) {
      this.strategy = strategy;
    }
  
    sort(arr: number[]): number[] {
      return this.strategy.sort(arr);
    }
}

//Observer
//По сути событие
class Newsletter {
    name : string = ''
    description : string = ''
}

//наблюдатели
interface Subscriber {
    update(newsletter: Newsletter): void;
}

//наблюдаемый объект
class NewsletterManager {
    private subscribers: Subscriber[] = [];
  
    subscribe(subscriber: Subscriber) {
      this.subscribers.push(subscriber);
    }
  
    unsubscribe(subscriber: Subscriber) {
      const index = this.subscribers.indexOf(subscriber);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    }
  
    publish(newsletter: Newsletter) {
      for (const subscriber of this.subscribers) {
        subscriber.update(newsletter);
      }
    }
}
//Пример наблюдателя
class EmailSubscriber implements Subscriber {
    constructor(private email: string) {}  
    update(newsletter: Newsletter) {
        console.log(`Отправлена рассылка на адрес ${this.email}: ${newsletter.name}`);
    }
}