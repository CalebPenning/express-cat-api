process.env.NODE_ENV = "test"

const request = require('supertest')

const app = require('../app')
let cats = require('../fakeDb')

let pickles = { name: "Pickles" }

beforeEach(function() {
    cats.push(pickles)
})

afterEach(function() {
    // Make sure this mutates, rather than redefines, 'cats'
    cats.length = 0
})

describe("GET /cats", () => {
    test("Get all cats", async () => {
        const response = await request(app).get('/cats')
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ cats: [pickles] })
    })
})

describe("POST /cats", () => {
    test("Create new cat", async () => {
        const response = await request(app).post('/cats').send({ name: "Owen" })
        expect(response.statusCode).toBe(201)
        expect(response.body).toEqual({ cat: { name: "Owen" } })
    })
})

describe("/PATCH /cats/:name", () => {
    test("Update existing cat", async () => {
        const response = await request(app).patch(`/cats/${pickles.name}`).send({ name: "Cucumber" })
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual({ cat: { name: "Cucumber" } })
    })
    test("Responds with 404 for invalid name", async () => {
        const response = await request(app).patch(`cats/Piggles`).send()
    })
})