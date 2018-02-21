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
 * Adding Store
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


/**
 * Getting all store
 *
 * @param req
 * @param res
 * @return {*}
 */
exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
};

/**
 * Edit Store
 *
 * @param req
 * @param res
 * @return {*}
 */
exports.editStore = async (req, res) => {
  const store = await Store.findOne({ _id: req.params.id });
  // TODO
  //confirm they are the owner of the store
  res.render('editStore', { title: `Edit ${store.name}`, store });
};

/**
 * Updating Store
 *
 * @param req
 * @param res
 * @return {*}
 */
exports.updateStore = async (req, res) => {
  // set the location data to be a point
  req.body.location.type = 'Point';
  // find and update the store
  const store = await Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new store instead of the old one
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store →</a>`);
  res.redirect(`/stores/${store._id}/edit`);
  // Redriect them the store and tell them it worked
};