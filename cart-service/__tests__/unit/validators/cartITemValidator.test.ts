import cartItemValidator from "../../../src/validators/cartItemValidator"

describe("Testing cartItemValidator", () => {
    it("Should return false if payload isn't as expected", () => {
        const payload = {
            product_id: 1,
            product_amount: 1
        }

        const isItemPaylodValid = cartItemValidator(payload)

        expect(isItemPaylodValid).toBe(false)
    })

    it("Should return true if payload is as expected", () => {
        const payload = {
            product_id: 1,
            product_amount: 1,
            user_id: 1
        }

        const isItemPaylodValid = cartItemValidator(payload)

        expect(isItemPaylodValid).toBe(true)
    })
})
