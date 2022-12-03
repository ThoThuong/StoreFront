import { Order, OrderSchemal } from "../../models/order.model"
import { User, UserSchemal } from "../../models/user.model"
import { Product, ProductSchemal } from "../../models/product.model"


describe("Order Model", () => {
    let OrderStoreInstance!: OrderSchemal;
    let productSchemal!: ProductSchemal;
    let userSchemal!: UserSchemal;

    let product: Product = {
        name: "Bep lua hong",
        price: 200000
    };
    let user: User = {
        username: "ThuongTN",
        firstname: "Thuong",
        lastname: "Tran Ngoc",
        password: "password"
    };
    let order: any = {
        "userId": null,
        "status": true,
        "products": [

            {
                "productId": null,
                "quantity": 10
            }
        ]
    }

    beforeAll(async () => {
        OrderStoreInstance = new OrderSchemal();
        productSchemal = new ProductSchemal();
        userSchemal = new UserSchemal();

        user = await userSchemal.create(user);
        product = await productSchemal.create(product);

        order['userId'] = user.id
        order['products'][0]['productId'] = product.id
    })

    it("should have an index method", () => {
        expect(OrderStoreInstance.index).toBeDefined();
    })

    it("should have a show method", () => {
        expect(OrderStoreInstance.read).toBeDefined();
    })

    it("should have a add method", () => {
        expect(OrderStoreInstance.create).toBeDefined();
    })

    it("should have a delete method", () => {
        expect(OrderStoreInstance.delete).toBeDefined();
    })

    it("add method should add a order", () => {
        OrderStoreInstance.create(order)
            .then((createdOrder: Order) => {
                expect(createdOrder).toEqual({
                    id: createdOrder.id,
                    ...order
                });
                if (createdOrder.id) {
                    OrderStoreInstance.delete(createdOrder.id);
                }
            })
            .catch(err => {
                console.log(err);
            });
    });

    it("index method should return a list of orders", async () => {
        OrderStoreInstance.create(order)
            .then((createdOrder: Order) => {
                return OrderStoreInstance.index();
            })
            .then(() => {
                return OrderStoreInstance.index();
            })
            .then((orderList: Order[]) => {
                expect(orderList.length).toBeGreaterThan(0);

                let i = 0;
                while (i) {
                    const orderId = orderList[i]?.id
                    if (orderId) {
                        OrderStoreInstance.delete(orderId);
                    }
                    i++;
                }
            })
            .catch(err => {
                console.log(err);
            });
    })

    it("show method should return the correct orders", async () => {
        let createdOrder!: Product;
        OrderStoreInstance.create(order)
            .then((createdOrder: Order) => {
                createdOrder = createdOrder;
                return OrderStoreInstance.read(createdOrder?.id || '');
            })
            .then((result: Product) => {
                expect(result.id).toEqual(createdOrder.id);
                return OrderStoreInstance.delete(result?.id || '');
            })
            .catch(err => {
                console.log(err);
            });
    })

    it("update method should update the order", async () => {

        OrderStoreInstance.create(order)
            .then((createdOrder: any) => {
                let newOrderData = createdOrder
                newOrderData['products'][0]['quantity'] = 200;
                return OrderStoreInstance.update(createdOrder.id, newOrderData);
            })
            .then((result: any) => {
                const { products, status } = result;
                expect(products[0]?.quantity).toEqual(200);
                if (result.id) {
                    OrderStoreInstance.delete(result.id);
                }
            });
    });

    it("delete method should remove the order", () => {
        OrderStoreInstance.create(order)
            .then((createdOrder: Order) => {
                return OrderStoreInstance.delete(createdOrder?.id || '')
            })
            .then((result: any) => {
                expect(result).toBeTruthy();
            })
            .catch(err => {
                console.log(err);
            });;
    })
})