const router = require('express-promise-router')();

//imports
const ArticlesController = require('../controllers/ArticlesController');





router.route('/article/:title/:lead/:body')
    .post(ArticlesController.addArticle)


router.route('/update/:index/:title/:lead/:body')
    .put(ArticlesController.updateArticle)

router.route('/delete/:directoryIndex')
    .delete(ArticlesController.deleteArticle)








module.exports = router;