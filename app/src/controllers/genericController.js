const DocumentTypeEnum = require("../models/documentTypeEnum");
const GenderEnum = require("../models/genderEnum");
const ReservationTypeEnum = require("../models/reservationTypeEnum");

//Query all documents type
exports.getDocumentType = async (req, res, next) => {
    try {
        res.status(200).json(DocumentTypeEnum);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//Query all genders
exports.getGender = async (req, res, next) => {
    try {
        res.status(200).json(GenderEnum);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

//Query all reservation type
exports.getReservationType = async (req, res, next) => {
    try {
        res.status(200).json(ReservationTypeEnum);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};