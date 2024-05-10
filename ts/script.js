//tsx ./script.ts --watch
'use strict';
var UserIntImpl = /** @class */ (function () {
    function UserIntImpl() {
    }
    UserIntImpl.prototype.hello = function () {
        console.log("Hi! My name is ".concat(this.name, ". And I am ").concat(this.age, " years old."));
    };
    return UserIntImpl;
}());
var UserTypeImpl = /** @class */ (function () {
    function UserTypeImpl() {
    }
    UserTypeImpl.prototype.hello = function () {
        console.log("Hi! My name is ".concat(this.name, ". And I am ").concat(this.age, " years old."));
    };
    return UserTypeImpl;
}());
function distance(p1orx1, p2orx2, x2, y2) {
    if (typeof p1orx1 === 'number' && typeof p2orx2 === 'number' && typeof x2 === 'number' && typeof y2 === 'number') {
        return Math.sqrt((x2 - p1orx1) ^ 2 + (y2 - p2orx2) ^ 2);
    }
    else if (typeof p1orx1 !== 'number' && typeof p2orx2 !== 'number') {
        return Math.sqrt((p2orx2.x - p1orx1.x) ^ 2 + ((p2orx2.y - p1orx1.y) ^ 2));
    }
    else {
        throw new Error("w?");
    }
}
//task4
var BNode = /** @class */ (function () {
    function BNode(value) {
        this.left = null;
        this.right = null;
        this.par = null;
        this.value = value;
    }
    return BNode;
}());
var BinaryTree = /** @class */ (function () {
    function BinaryTree() {
        this.root = null;
    }
    BinaryTree.prototype.insert = function (value) {
        this.root = this.insertNode(this.root, value);
    };
    BinaryTree.prototype.insertNode = function (node, value) {
        if (node === null) {
            return new BNode(value);
        }
        else {
            if (node.value > value) {
                node.left = this.insertNode(node.left, value);
            }
            else {
                node.right = this.insertNode(node.right, value);
            }
            return node;
        }
    };
    BinaryTree.prototype.delete = function (value) {
        this.root = this.deleteNode(this.root, value);
    };
    BinaryTree.prototype.deleteNode = function (node, value) {
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
        }
        else {
            if (node.value > value) {
                node.left = this.deleteNode(node.left, value);
            }
            else {
                node.right = this.deleteNode(node.right, value);
            }
        }
        return node;
    };
    BinaryTree.prototype.minimum = function (node) {
        while (node.left !== null) {
            node = node.left;
        }
        return node;
    };
    BinaryTree.prototype.search = function (value) {
        return this.searchNode(this.root, value);
    };
    BinaryTree.prototype.searchNode = function (node, value) {
        if (node === null) {
            return null;
        }
        else {
            if (node.value === value) {
                return node;
            }
            else {
                if (node.value > value) {
                    return this.searchNode(node.left, value);
                }
                else {
                    return this.searchNode(node.right, value);
                }
            }
        }
    };
    BinaryTree.prototype.height = function () {
        return this.heightNode(this.root);
    };
    BinaryTree.prototype.heightNode = function (node) {
        if (node === null) {
            return 0;
        }
        return 1 + Math.max(this.heightNode(node.left), this.heightNode(node.right));
    };
    return BinaryTree;
}());
function sendPayment(details) {
    //some business logic, kotoryu ya ne pridymal
}
var CreditCardDetails = /** @class */ (function () {
    function CreditCardDetails(cardNumber, expirationDate, securityCode) {
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.securityCode = securityCode;
    }
    return CreditCardDetails;
}());
var CreditCardDetailsAdapter = /** @class */ (function () {
    function CreditCardDetailsAdapter(details) {
        this.details = details;
    }
    Object.defineProperty(CreditCardDetailsAdapter.prototype, "cardNumber", {
        get: function () {
            return this.details.cardNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreditCardDetailsAdapter.prototype, "expiryDate", {
        get: function () {
            return this.details.expirationDate;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CreditCardDetailsAdapter.prototype, "cvv", {
        get: function () {
            return this.details.securityCode;
        },
        enumerable: false,
        configurable: true
    });
    return CreditCardDetailsAdapter;
}());
//Теперь можно использовать CreditCardDetails c sendPayment, так как названия сходятся
var some = new CreditCardDetails('s', 'o', 'me');
var ad = new CreditCardDetailsAdapter(some);
sendPayment(ad);
//пара конкретных сортировок
var BubbleSortStrategy = /** @class */ (function () {
    function BubbleSortStrategy() {
    }
    BubbleSortStrategy.prototype.sort = function (arr) {
        var _a;
        for (var i = 0; i < arr.length; i++) {
            for (var j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    _a = [arr[j + 1], arr[j]], arr[j] = _a[0], arr[j + 1] = _a[1];
                }
            }
        }
        return arr;
    };
    return BubbleSortStrategy;
}());
var SelectionSortStrategy = /** @class */ (function () {
    function SelectionSortStrategy() {
    }
    SelectionSortStrategy.prototype.sort = function (arr) {
        var _a;
        for (var i = 0; i < arr.length; i++) {
            var minIndex = i;
            for (var j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[minIndex]) {
                    minIndex = j;
                }
            }
            _a = [arr[minIndex], arr[i]], arr[i] = _a[0], arr[minIndex] = _a[1];
        }
        return arr;
    };
    return SelectionSortStrategy;
}());
//контекст, использующий конкретную сортировку
var SortContext = /** @class */ (function () {
    function SortContext(strategy) {
        this.strategy = strategy;
    }
    SortContext.prototype.sort = function (arr) {
        return this.strategy.sort(arr);
    };
    return SortContext;
}());
//Observer
//По сути событие
var Newsletter = /** @class */ (function () {
    function Newsletter() {
        this.name = '';
        this.description = '';
    }
    return Newsletter;
}());
//наблюдаемый объект
var NewsletterManager = /** @class */ (function () {
    function NewsletterManager() {
        this.subscribers = [];
    }
    NewsletterManager.prototype.subscribe = function (subscriber) {
        this.subscribers.push(subscriber);
    };
    NewsletterManager.prototype.unsubscribe = function (subscriber) {
        var index = this.subscribers.indexOf(subscriber);
        if (index > -1) {
            this.subscribers.splice(index, 1);
        }
    };
    NewsletterManager.prototype.publish = function (newsletter) {
        for (var _i = 0, _a = this.subscribers; _i < _a.length; _i++) {
            var subscriber = _a[_i];
            subscriber.update(newsletter);
        }
    };
    return NewsletterManager;
}());
//Пример наблюдателя
var EmailSubscriber = /** @class */ (function () {
    function EmailSubscriber(email) {
        this.email = email;
    }
    EmailSubscriber.prototype.update = function (newsletter) {
        console.log("\u041E\u0442\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0430 \u0440\u0430\u0441\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0430\u0434\u0440\u0435\u0441 ".concat(this.email, ": ").concat(newsletter.name));
    };
    return EmailSubscriber;
}());
