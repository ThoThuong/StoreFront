import { Product, ProductSchemal } from "../../models/product.model"

const _ProductSchemal = new ProductSchemal()

describe("Product Schemal", () => {
    const product: Product = {
        id: "e3f4922d-e12b-47f0-a5a8-20a3fb12cd76",
        name: "Bep lua hong",
        price: 200000
    };

    it("toBeDefined index method", () => {
        expect(_ProductSchemal.index).toBeDefined();
    })

    it("toBeDefined show method", () => {
        expect(_ProductSchemal.read).toBeDefined();
    })

    it("toBeDefined add method", () => {
        expect(_ProductSchemal.create).toBeDefined();
    })

    it("toBeDefined delete method", () => {
        expect(_ProductSchemal.deleteProduct).toBeDefined();
    })
})