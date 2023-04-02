const express = require("express")
const students = require("./routes/students.js")


const app = express()
const PORT = process.env.PORT || 3000


app.use("/static", express.static("public/"))
app.use(express.urlencoded({extended: false}))
app.use(students)

app.set("view engine", "pug")

app.listen(PORT, () => {
	console.log(`Serving http://localhost:${PORT}`)
})
