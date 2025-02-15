const Audio = require('../models/Audio');
const axios = require('axios');
const path = require('path');
const cloudinary = require('cloudinary').v2;

exports.uploadAudio = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).json({ success: false, message: "Patient not found" });
        }

        if (!req.files || !req.files.audio) {
            return res.status(400).json({ success: false, message: "No audio file uploaded" });
        }

        const audioFile = req.files.audio;
        const filePath = path.join(__dirname, '../uploads/', audioFile.name);

        // Upload audio to Cloudinary
        cloudinary.uploader.upload(filePath, { resource_type: 'auto' }, async (error, result) => {
            if (error) {
                return res.status(500).json({ success: false, message: "Error uploading audio" });
            }

            const newAudio = new Audio({
                patient: patient._id,
                fileUrl: result.secure_url,
                fileType: audioFile.mimetype,
                duration: audioFile.size / 1024 / 1024, // Duration placeholder; update with real audio length
                processed: false,  // Initially, the file is unprocessed
            });

            await newAudio.save();

            // Send audio data to Flask API for classification
            try {
                const response = await axios.post('http://localhost:5000/api/v1/classify', { fileUrl: result.secure_url });
                const classificationResults = response.data;

                // Update audio with classification result
                newAudio.processed = true;
                await newAudio.save();

                res.status(200).json({
                    success: true,
                    message: "Audio uploaded and processed",
                    classificationResults,
                });
            } catch (error) {
                console.error(error);
                res.status(500).json({ success: false, message: "Error processing audio" });
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error uploading audio" });
    }
};
