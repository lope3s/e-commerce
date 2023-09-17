export default function cartItemValidator(payload: object) {
    const requiredKeys = ["product_id", "user_id", "product_amount"]

    const payloadKeys = Object.keys(payload)

    if (payloadKeys.length == requiredKeys.length) {
        for (const key of payloadKeys) {
            if (!requiredKeys.includes(key)) {
                return false
            }
        }

        return true
    }

    return false
}
