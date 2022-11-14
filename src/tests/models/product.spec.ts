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

    beforeEach(() => {
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

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
        jasmine.clock().tick(200000);
        expect(result.name).toBe(product.name);
        expect(result.price).toBe(product.price);
        if (result?.id) {
            await productSchemal.deleteProduct(result.id);
            jasmine.clock().tick(200000);
        }
    })

    it("expect a list of products", async () => {
        const result: Product = await productSchemal.create(product);
        jasmine.clock().tick(200000);
        const _expect = await productSchemal.index();
        expect(_expect.length).toBeGreaterThan(0);
        if (result?.id) {
            await productSchemal.deleteProduct(result.id);
            jasmine.clock().tick(200000);
        }
    })

    it("expect the exact product", async () => {
        const result: Product = await productSchemal.create(product);
        jasmine.clock().tick(200000);
        if (result?.id) {
            const _expect = await productSchemal.read(result.id);
            expect(_expect).toEqual(result);
            await productSchemal.deleteProduct(result.id);
            jasmine.clock().tick(200000);
        }

    })

    it("expect updated the product", async () => {
        const result: Product = await productSchemal.create(product);
        jasmine.clock().tick(200000);
        if (result?.id) {
            const { name, price } = await productSchemal.update(result.id, {
                name: "Bep lua hong tai ban lan thu 10",
                price: "400000"
            });
            expect(name).toEqual("Bep lua hong tai ban lan thu 10");
            // expect(price).toEqual(400000);
            await productSchemal.deleteProduct(result.id);
            jasmine.clock().tick(200000);
        }
    })

    it("expect deleted the product", async () => {
        const result: Product = await productSchemal.create(product);
        jasmine.clock().tick(200000);
        if (result?.id) {
            const _expect = await productSchemal.deleteProduct(result.id);
            jasmine.clock().tick(200000);
            expect(_expect).toBeTruthy();
        }
    })

})