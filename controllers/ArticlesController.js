const mongoose = require("mongoose");
const {ObjectId} = require("mongoose/lib/types");

const ArticleSchema = mongoose.Schema({
    articleId: String,
    createdAt: Date,
    updatedAt: Date,
    fullArticle: String,
    articleTitle: String,
    articleLead: String,
    articleBody: String
});

const Article = mongoose.model('Article', ArticleSchema, 'articlestore');

module.exports = {
    addArticle: async (req, res, next) => {
        // POSTMAN: http://localhost:2531/articles/article/space/stars/sun

        const {title, lead, body} = req.params;

        const article1 = await new Article({
            createdAt: new Date(),
            fullArticle: `Title: ${title}, lead: ${lead}, body: ${body} `,
            articleTitle: title,
            articleLead: lead,
            articleBody: body,
        });

        article1.save(function (err, article) {
            if (err) return console.error(err);
            console.log(article.articleTitle + " saved to bookstore collection.");
        });



        res.send(`
       <ul>ARTICLE ${article1._id} was added to MongoDB database 
    <li>Title: ${article1.articleTitle}</li>
    <li>Lead: ${article1.articleLead}</li>
    <li>Body: ${article1.articleBody}</li>
</ul>
        `)
    },

    deleteArticle: async (req, res, next) => {
        // POSTMAN: http://localhost:2531/articles/delete/61d2f8f61fa69d1b48456615
        const {directoryIndex} = req.params

        //delete in MongoDB
        await Article.deleteOne({_id: `${directoryIndex}`});

        await res.end()
    },

    updateArticle: async (req, res, next) => {
        //POSTMAN: http://localhost:2531/articles/update/61d2ee27b0355d1e64b18146/newsgsdTitle/newLead/newBody
        const {index, title, lead, body} = req.params;

        const {fullArticle} = await Article.findOne({_id: ObjectId(`${index}`)});


        //Update in MongoDB
        await Article.updateOne( {_id: ObjectId(`${index}`)}, {
            updatedAt: new Date(),
            fullArticle: `Title: ${title}, lead: ${lead}, body: ${body} `,
            articleTitle: title,
            articleLead: lead,
            articleBody: body,
        })

        console.log(fullArticle)
        res.send(`Data before update: ${fullArticle}
        Data after update: {"title": "${title}","lead":  "${lead}","body":"${body}"}
        `)
    }

}