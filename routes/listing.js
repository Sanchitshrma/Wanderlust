const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

router
  .route("/")
  //index route
  .get(wrapAsync(listingController.index))
  //create route
  .post(
    isLoggedIn,
    validateListing,
    wrapAsync(listingController.createListing)
  );

// New  route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  //show route
  .get(wrapAsync(listingController.showListing))
  //update route
  .put(
    validateListing,
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.updateListing)
  )
  //destroy route
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

//Edit route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditForm)
);
module.exports = router;
