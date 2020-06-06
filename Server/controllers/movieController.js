const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const resMessage = require('../modules/responseMessage');
const movieModel = require('../models/movie');


exports.showAllMovie = async (req,res)=>{
    return res.status(statusCode.OK)
        .send(util.success(statusCode.OK,responseMessage.READ_ALL_POST_SUCCESS, await movieModel.showAllMovie()));
};