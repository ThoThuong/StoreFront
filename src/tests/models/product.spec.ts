import { Product, ProductSchemal } from "../../models/product.model"



describe("Product Schemal", () => {
    let productSchemal!: ProductSchemal;
    const product: Product = {
        name: "Bep lua hong",
        price: 200000
    };

    beforeAll(() => {
        productSchemal = new ProductSchemal();
    })

    // beforeEach(() => {
    //     jasmine.clock().install();
    // });

    // afterEach(() => {
    //     jasmine.clock().uninstall();
    // });

    it("toBeDefined an index method", () => {
        expect(productSchemal.index).toBeDefined();
    })

    it("toBeDefined a show method", () => {
        expect(productSchemal.read).toBeDefined();
    })

    it('toBeDefined an update method', () => {
        expect(productSchemal.update).toBeDefined();
    });

    it("toBeDefined an add method", () => {
        expect(productSchemal.create).toBeDefined();
    })

    it("toBeDefined a delete method", () => {
        expect(productSchemal.deleteProduct).toBeDefined();
    })

    it("expect created a product", async () => {
        const result: Product = await productSchemal.create(product);
        expect(result.name).toBe(product.name);
        expect(result.price).toBe(product.price);
        if (result?.id) {
            await productSchemal.deleteProduct(result.id);
        }
    })

    it("expect a list of products", async () => {
        const result: Product = await productSchemal.create(product);
        const _expect = await productSchemal.index();
        expect(_expect.length).toBeGreaterThan(0);
        if (result?.id) {
            await productSchemal.deleteProduct(result.id);
        }
    })

    it("expect the exact product", () => {
        let productCreated!: Product;

        productSchemal.create(product)
        .then((result: Product) => {
            if (!result?.id) {
                throw new Error('Can\'t not create product.');
            }
            productCreated = result;
            return productSchemal.read(result.id);
           
        })
        .then((result: Product) => {
            expect(result.name).toEqual(productCreated.name);
            if (result.id) {
                productSchemal.deleteProduct(result.id);
            }
        })
        .catch((err) => {
            console.log(err);
            
        });

    })

    it("expect updated the product", async () => {
        productSchemal.create(product)
        .then((result: Product) => {
            if (!result?.id) {
                throw new Error('Can\'t not create product.');
            }
            return productSchemal.update(result.id, {
                name: "Bep lua hong tai ban lan thu 10",
                price: "400000"
            });
        })
        .then((result: Product) => {
            const { name, price } = result;
            expect(name).toEqual("Bep lua hong tai ban lan thu 10");
            if (result.id) {
                productSchemal.deleteProduct(result.id);
            }
            
        })
        .catch((err) => {
            console.log(err);
            
        });
    })

    it("expect deleted the product", () => {
        productSchemal.create(product)
        .then((result: Product) => {
            if (!result?.id) {
               throw new Error('Can\'t not create product.');
            }
            return productSchemal.deleteProduct(result.id);
        })
        .then((_expect) => {
            expect(_expect).toBeTruthy();
        })
        .catch((err) => {
            console.log(err);
            
        });
    })

})