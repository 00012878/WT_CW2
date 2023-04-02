# Web Technology Coursework \#2 (Semester 2, 2023)

This repository is an academic work (coursework) of the Web Technology module taught at Westminster International University in Tashkent in Business Information Systems course level 4.<br><br>

**Repository:** https://github.com/00012878/WT_CW2<br>
**Hosted on:** 

## Project description
Fully functioning web application where a user can perform CRUD operations.<br>
There is no actual database, and the app imitates working with database by performing read and write operations over `data/data.json` file that stores actual data.<br><br>

`index.js` is a server-side js that runs **localhost** server.<br><br>

CSS is stored in `public/` folder and it is encouraged to store additional client-side js, css and media files in that folder accordingly.<br><br>

`routes/students.js` handles route requests.<br><br>
All rendering templates are stured in `views/` folder.<br><br>

Back-end is built with the help of [Express](https://expressjs.com/).<br>
To make the app dynamic, [Pug](https://pugjs.org) is used.<br>


## Run on local machine
1. Make sure [NodeJS](https://nodejs.org/) and npm is installed.
2. Clone the repository: `git clone https://github.com/00012878/WT_CW2.git`
3. Navigate to the downloaded repository and install dependencies: `npm i`
4. Serve the app on **localhost**: `node index.js` or `npm run start`
5. *(optional)* If a user wants to debug and make changes to the app, `npm run debug` will serve **localhost** with auto-reloading of `index.js` when changes to the project are made.


## Dependecies
1. Express -- for serving **localhost**
2. Pug -- for dynamic rendering of webpages
3. Nodemon -- for auto-reloading of local server 