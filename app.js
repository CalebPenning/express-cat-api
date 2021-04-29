const express = require('express')
const app = express()
const catsRoutes = require('./routes/cats')
const ExpressError = require('./expressError')

app.use(express.json())
app.use("/cats", catsRoutes)

/* 404 Handler */

app.use(function(req, res, next) {
    return new ExpressError("Not Found", 404)
})

// General error handler

app.use(function(err, req, res, next) {
    res.status(err.status || 500)

    return res.json({
        error: err.message,
    })
})

app.listen(3000, function() {
    console.log("Listening on port 3000")
})