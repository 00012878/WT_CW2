const express = require("express")
const fs = require("fs")
const { render } = require("pug")


const app = express()
const PORT = process.env.PORT || 3000

function id() {
	return "_" + Math.random().toString(36).substring(2, 9)
}

app.use("/static", express.static("public/"))
app.use(express.urlencoded({extended: false}))

app.set("view engine", "pug")

app.get("/", (req, res) => {
	res.render("index.pug")
})


app.get("/students", (req, res) => {
	fs.readFile("./data/data.json", (err, data) => {
		if (err) throw err
		const dt = JSON.parse(data)
		res.render("students.pug", {students: dt})
	})
})

app.get("/add", (req, res) => {
	res.render("add.pug")
})


app.post("/add", (req, res) => {
	const fname = req.body.fname
	const lname = req.body.lname
	const major = req.body.major
	const level = req.body.level
	
	if (fname.trim() === "" && lname.trim() === "") {
		console.log("empty")
		res.render("add.pug", {error: true})	
	} else {
		fs.readFile("./data/data.json", (err, data) => {
			if (err) throw err
			const dt = JSON.parse(data)
			dt.push({
				id: id(),
				fname, lname,
				major, level
			})
	
			fs.writeFile("./data/data.json", JSON.stringify(dt), err => {
				if (err) throw err
				console.log("success")
				res.render("add.pug", {success: true})
			})
		})

	}
})

app.get("/detail", (req, res) => {
	res.render("detail.pug")

})

app.listen(PORT, () => {
	console.log(`Serving http://localhost:${PORT}`)
})
