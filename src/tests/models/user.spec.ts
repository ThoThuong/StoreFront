import { User, UserSchemal, UserOrders } from '../../models/user.model';

describe("User Schemal", () => {
    let userSchemal!: UserSchemal;
    let user = {
        username: "ThuongTN",
        firstname: "Thuong",
        lastname: "Tran Ngoc",
        password: "password"
    }

    beforeAll(() => {
        userSchemal = new UserSchemal();
    })

    beforeEach(() => {
        jasmine.clock().install();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it("toBeDefined an index method", () => {
        expect(userSchemal.index).toBeDefined();
    })

    it("toBeDefined a show method", () => {
        expect(userSchemal.read).toBeDefined();
    })

    it("toBeDefined a create method", () => {
        expect(userSchemal.create).toBeDefined();
    })

    it("stoBeDefined a remove method", () => {
        expect(userSchemal.deleteUser).toBeDefined();
    })

    it("expect created a user", async () => {
        const _expect: User = await userSchemal.create(user);
        if (_expect?.id) {
            const { username, firstname, lastname } = _expect;
            expect(username).toBe(user.username);
            expect(firstname).toBe(user.firstname);
            expect(lastname).toBe(user.lastname);

            // if (_expect?.id) {
            //     await userSchemal.deleteUser(_expect.id);
            // }
        }
    })

    it("expect a list of users", async () => {
        // const result: User = await userSchemal.create(user);
        const _expect = await userSchemal.index();
        expect(_expect.length).toBeGreaterThan(0);
        // if (result?.id) {
        //     await userSchemal.deleteUser(result.id);
        // }

    })

    it("expect the exact user", async () => {
        const result: User = await userSchemal.create(user);
        if (result?.id) {
            const _expect = await userSchemal.read(result.id);
            expect(_expect.id).toEqual(result.id);
            await userSchemal.deleteUser(result?.id);
        }
    })

    // it("expect deleted a user", async () => {
    //     const result: User = await userSchemal.create(user);
    //     if (result?.id) {
    //         const _expect = await userSchemal.deleteUser(result.id);
    //         expect(_expect).toEqual(true);
    //     }
    // })

    // it("expect updated the user", async () => {
    //     const result: User = await userSchemal.create(user);
    //     if (result?.id) {
    //         const { firstname, lastname } = await userSchemal.update(result.id, {
    //             firstname: "Thuong Updated",
    //             lastname: "Tran Ngoc Updated",
    //         });
    //         expect(firstname).toEqual("Thuong Updated");
    //         expect(lastname).toEqual("Tran Ngoc Updated");
    //         await userSchemal.deleteUser(result.id);
    //     }
    // })

    // it("expect authenticated the user", async () => {
    //     const result: User = await userSchemal.create(user);
    //     const _expect = await userSchemal.authenticate(user.username, user.password);
    //     if (_expect && result?.id) {
    //         const { username, firstname, lastname } = _expect
    //         expect(username).toBe(user.username);
    //         expect(firstname).toBe(user.firstname);
    //         expect(lastname).toBe(user.lastname);
    //         await userSchemal.deleteUser(result.id);
    //     }

    //     // const _expect = await userSchemal.authenticate(user.username, user.password) as User | any;
    //     // console.log('what is this one??????', _expect)
    //     // expect(_expect?.error?.mesage).toBe("Wrong credentials. Error: Can not found any user on the credentials.")

    // })
})