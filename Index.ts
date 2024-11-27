import express from "express";
import ffmpeg from "fluent-ffmpeg"; // it is a wrapper around the ffmpeg cli tool

const app = express();
app.use(express.json());

// Processing video
app.post("/process-video", (req,res) => {
    // get path of the input video file
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;

    if(!inputFilePath || !outputFilePath) {
        res.status(400).send("Bad request: Missing input or file input path.");
    }
    // converting the given video file to 360p
    ffmpeg(inputFilePath).outputOptions("-vf", "scale=-1:360").on("end", () => {

        res.status(200).send("Processing finished complete.")

    }).on("error", (err) => {
        console.log(`An error has occurred: ${err.message}`);
        res.status(500).send(`Internal Server Error: ${err.message}`)
    }).save(outputFilePath);

});

const port = process.env.PORT || 3000;

// starting the server
app.listen(port, () => {
    console.log(`service is listening on the port ${port}`);
});