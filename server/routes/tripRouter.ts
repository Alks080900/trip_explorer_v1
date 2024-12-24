import express from "express";
const router = express.Router();
import {getTrips, getTrip, addTrip, updateTrip, deleteTrip, addGalleryImage, updateGalleryImage, deleteGalleryImage } from "../controllers/TripController";

router.get("/", getTrips);
router.get("/:tripId", getTrip);
router.post("/", addTrip);
router.put("/:tripId", updateTrip);
router.delete("/:tripId", deleteTrip); 
router.post("/:tripId/gallery", addGalleryImage);
router.put("/:tripId/gallery", updateGalleryImage);
router.delete("/:tripId/gallery", deleteGalleryImage);

export default router;