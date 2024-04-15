import mongoose from "mongoose";

const mapSchema = new mongoose.Schema({
  tiles: {
    type: Array,
    default: [],
  },
});

const Map = mongoose.model("Map", mapSchema);

export default Map;