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
    const store = await (new Store(req.body)).save();
    req.flash('success', `Successfully Created ${store.name}. Care to leave a review?`);
    res.redirect(`/store/${store.slug}`);
};
