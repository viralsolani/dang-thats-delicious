const mongoose = require('mongoose');
const Store = mongoose.model('Store');
/**
 * Index Page
 *
 * @param req
 * @param res
 * @return {*}
 */
exports.homePage = (req, res) => {
  res.render('index');
};

/**
 * add store Page
 *
 * @param req
 * @param res
 * @return {*}
 */
exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store'});
};

/**
 * creating stroe
 *
 * @param req
 * @param res
 * @return {*}
 */
exports.createStore = async (req, res) => {
    const store = new Store(req.body);
    await store.save();
    res.redirect('/');
};
