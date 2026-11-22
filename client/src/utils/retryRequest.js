export async function retryRequest(fn, retries = 3) {

    try {

        return await fn()

    } catch (err) {

        if (retries <= 0) throw err

        return retryRequest(fn, retries - 1)

    }

}