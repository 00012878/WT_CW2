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
	const sex = req.body.sex
	const major = req.body.major
	const level = req.body.level
	
	if (fname.trim() === "" || lname.trim() === "") {
		res.render("add.pug", {error: true})	
	} else {
		fs.readFile("./data/data.json", (err, data) => {
			if (err) throw err
			const dt = JSON.parse(data)
			dt.push({
				id: id(),
				fname, lname, sex,
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

app.get("/students/:id", (req, res) => {
	const id = req.params.id

	fs.readFile("./data/data.json", (err, data) => {
		if (err) throw err
		const dt = JSON.parse(data)
		const student = dt.filter(item => item.id === id)[0]
		res.render("detail.pug", {student: student})
	})
})


app.get("/:id/delete", (req, res) => {
	const id = req.params.id
	fs.readFile("./data/data.json", (err, data) => {
		if (err) throw err
		const dt = JSON.parse(data)
		const filtered = dt.filter(item => item.id != id)
		fs.writeFile("./data/data.json", JSON.stringify(filtered), err => {
			if (err) throw err
			res.render("students.pug", {students: filtered, deleted: true})
		})
	})
})

app.post("/:id/update", (req, res) => {
	const id = req.params.id
	const fname = req.body.fname
	const lname = req.body.lname
	const sex = req.body.sex
	const major = req.body.major
	const level = req.body.level

	if (fname.trim() === "" || lname.trim() === "") {
		fs.readFile("./data/data.json", (err, data) => {
			if (err) throw err
			const dt = JSON.parse(data)
			const student = dt.filter(item => item.id === id)[0]
			res.render("detail.pug", {student: student, error: true})
		})
	} else {
	fs.readFile("./data/data.json", (err, data) => {
		if (err) throw err
		const dt = JSON.parse(data)
		const student = dt.filter(item => item.id === id)[0]

		const studentId = dt.indexOf(student)
		const splicedStudent = dt.splice(studentId, 1)[0]
		splicedStudent.fname = fname
		splicedStudent.lname = lname
		splicedStudent.sex = sex
		splicedStudent.major = major
		splicedStudent.level = level

		dt.push(splicedStudent)

		fs.writeFile("./data/data.json", JSON.stringify(dt), err => {
			if (err) throw err

			res.render("students.pug", {students: dt, updated: true})
		})
	})
}
})


app.listen(PORT, () => {
	console.log(`Serving http://localhost:${PORT}`)
})
