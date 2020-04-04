Created in 2018 and constantly updated, the website is a partial show of my work working with vanillaJS with the support of NodeJS and NPM. Using the EJS engine to integrate JS in HTML, it includes both a frontend and a backend.

The site is static, however it is built with a backbone of NodeJS (with Express) for routing, auth, connection to DB, modelling, security; in the blog section the data is stored on mongoDB (which manages the users and auth as well). 

## Structure

- [README.md](README.md)
   - [app.js](app.js)
   - __middleware__
     - [index.js](middleware/index.js)
   - __models__
     - [devComment.js](models/devComment.js)
     - [devPost.js](models/devPost.js)
     - [user.js](models/user.js)
   - [node\_modules](node_modules)
   - [package\-lock.json](package-lock.json)
   - [package.json](package.json)
   - __public__
     - __docs__
       - [Alex\_Buaiscia\_CV.pdf](public/docs/Alex_Buaiscia_CV.pdf)
     - __stylesheets__
       - [main.css](public/stylesheets/main.css)
   - __routes__
     - __dev__
       - [devblog.js](routes/dev/devblog.js)
       - [devcomments.js](routes/dev/devcomments.js)
       - [devlife.js](routes/dev/devlife.js)
       - [portfolio.js](routes/dev/portfolio.js)
     - [index.js](routes/index.js)
   - [seeds.js](seeds.js)
   - __views__
     - __comments__
       - [edit.ejs](views/comments/edit.ejs)
       - [new.ejs](views/comments/new.ejs)
     - __dev__
       - [devblog.ejs](views/dev/devblog.ejs)
       - [devlife.ejs](views/dev/devlife.ejs)
       - [edit.ejs](views/dev/edit.ejs)
       - [newPost.ejs](views/dev/newPost.ejs)
       - __portfolio__
         - [deploymentTool.ejs](views/dev/portfolio/deploymentTool.ejs)
         - [movieDB.ejs](views/dev/portfolio/movieDB.ejs)
         - [portal.ejs](views/dev/portfolio/portal.ejs)
         - [restApi.ejs](views/dev/portfolio/restApi.ejs)
         - [website.ejs](views/dev/portfolio/website.ejs)
       - [portfolio.ejs](views/dev/portfolio.ejs)
       - [showPost.ejs](views/dev/showPost.ejs)
     - __devcomment__
       - [edit.ejs](views/devcomment/edit.ejs)
       - [new.ejs](views/devcomment/new.ejs)
     - [landing.ejs](views/landing.ejs)
     - [login.ejs](views/login.ejs)
     - __partials__
       - [footer.ejs](views/partials/footer.ejs)
       - [header.ejs](views/partials/header.ejs)
     - [register.ejs](views/register.ejs)
 
###VERSION

    2