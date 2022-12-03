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

    // beforeEach(() => {
    //     jasmine.clock().install();
    // });

    // afterEach(() => {
    //     jasmine.clock().uninstall();
    // });

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

    it("expect created a user", () => {
        userSchemal.create(user)
        .then((result: User) => {
            if (result?.id) {
                const { username, firstname, lastname } = result;
                expect(username).toBe(user.username);
                expect(firstname).toBe(user.firstname);
                expect(lastname).toBe(user.lastname);

                if (result?.id) {
                    userSchemal.deleteUser(result.id);
                }
            }
        })
        .catch((err: any) => {
            console.log(err);
        });
    });

    it("expect a list of users", () => {
        let tmpUser!: User;
        userSchemal.create(user)
        .then((result: User) => {
            tmpUser = result;
            return userSchemal.index();
        })
        .then((result: User[]) => {
            expect(result.length).toBeGreaterThan(0);
            if (tmpUser && tmpUser?.id) {
                userSchemal.deleteUser(tmpUser.id);
            }
        })
        .catch((err: any) => {
            console.log(err);
        });
    });

    it("expect the exact user", () => {
        userSchemal.create(user)
        .then((result: User)=>{
            if (!result?.id) {
                throw new Error("Can't create user");
            }
            return userSchemal.read(result.id);
        })
        .then((result: User) => {
            expect(result.id).toEqual(result.id);
            if (result.id) {
                userSchemal.deleteUser(result.id);
            }
        })
        .catch((err: any) => {
            console.log(err);
        });
    });

    it("expect deleted a user", () => {
        userSchemal.create(user)
        .then((result: User) => {
            if (!result?.id) {
                throw new Error("Can't create user");
            }
            return userSchemal.deleteUser(result.id);
        })
        .then((result: any) => {
            expect(result).toEqual(true);
        })
        .catch((err: any) => {
            console.log(err);
        });
        
    });

    it("expect updated the user", async () => {
        userSchemal.create(user)
        .then((result: User) => {
            if (!result?.id) {
                throw new Error("Can't create user");
            }
            return userSchemal.update(result.id, {
                firstname: "Thuong Updated",
                lastname: "Tran Ngoc Updated",
            });
            
        })
        .then((result: User) => {
            const { firstname, lastname } = result;
            expect(firstname).toEqual("Thuong Updated");
            expect(lastname).toEqual("Tran Ngoc Updated");
            if (result?.id) {
                userSchemal.deleteUser(result.id);
            }
        })
        .catch((err: any) => {
            console.log(err);
        });
        
    })

    it("expect authenticated the user", () => {
        userSchemal.create(user)
        .then((result: User) => {
            if (!result?.username || !result?.password) {
                throw new Error("Can't create user");
            }
            return userSchemal.authenticate(result.username, result.password);
        })
        .then((result: any) => {
            const { username, firstname, lastname } = result
            expect(username).toBe(user.username);
            expect(firstname).toBe(user.firstname);
            expect(lastname).toBe(user.lastname);
            userSchemal.deleteUser(result.id);
        });
    })
})