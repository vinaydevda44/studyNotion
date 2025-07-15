const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
});

delete mongoose.connection.models["SubSection"]; // Force fresh model registration
module.exports = mongoose.model("SubSection", subSectionSchema);

