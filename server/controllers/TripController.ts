import { Request, Response } from "express";
import Trip from "../models/Trip";

export const getTrips = (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    data: Trip.getTrips()
  });
};

export const getTrip = (req: Request, res: Response) => {
  const { tripId } = req.params;

  res.status(200).json({
    status: "success",
    data: Trip.getTrip(Number(tripId))
  });
};

export const addTrip = (req: Request, res: Response) => {
  try {
    const tripData = req.body;
    const newTrip = Trip.addTrip(tripData);
    res.status(201).json({
      status: "success",
      data: newTrip
    });
  } catch (error: any) {
    res.status(400).json({
      status: "fail",
      message: error.message
    });
  }
};

export const updateTrip = (req: Request, res: Response) => {
  const { tripId } = req.params;
  const tripData = req.body;

  try {
    const updatedTrip = Trip.updateTrip(Number(tripId), tripData);
    res.status(200).json({
      status: "success",
      data: updatedTrip
    });
  } catch (error: any) {
    res.status(400).json({
      status: "fail",
      message: error.message
    });
  }
};

export const deleteTrip = (req: Request, res: Response) => {
  const { tripId } = req.params;

  try {
    const deletedTrip = Trip.deleteTrip(Number(tripId));
    res.status(200).json({
      status: "success",
      message: `Trip with id ${tripId} deleted successfully`,
      data: deletedTrip
    });
  } catch (error: any) {
    res.status(404).json({
      status: "fail",
      message: error.message
    });
  }
};

export const addGalleryImage = (req: Request, res: Response) => {
  const { tripId } = req.params;
  const { url } = req.body;

  try {
    const updatedGallery = Trip.addGalleryImage(Number(tripId), url);
    res.status(201).json({
      status: "success",
      message: "Image added to gallery",
      data: updatedGallery
    });
  } catch (error: any) {
    res.status(404).json({ status: "error", message: error.message });
  }
};

export const updateGalleryImage = (req: Request, res: Response) => {
  const { tripId } = req.params;
  const { oldUrl, newUrl } = req.body;

  try {
    const updatedGallery = Trip.updateGalleryImage(Number(tripId), oldUrl, newUrl);
    res.status(200).json({
      status: "success",
      data: updatedGallery
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};

export const deleteGalleryImage = (req: Request, res: Response) => {
  const { tripId } = req.params;
  const { url } = req.body;
  try {
    const updatedGallery = Trip.deleteGalleryImage(Number(tripId), url);
    res.status(200).json({
      status: "success",
      message: "Image deleted from gallery",
      data: updatedGallery
    });
  } catch (error: any) {
    res.status(400).json({
      status: "error",
      message: error.message
    });
  }
};




