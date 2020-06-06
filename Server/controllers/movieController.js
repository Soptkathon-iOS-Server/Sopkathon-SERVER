const util = require('../modules/util');
const statusCode = require('../modules/statusCode');
const responseMessage = require('../modules/responseMessage');
const MovieModel = require('../models/movie');


exports.readAllMovie = async (req, res) => {
    var result = await MovieModel.readAllMovie();
    res.status(statusCode.OK)
    .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, result));
};

exports.searchMovie = async (req, res) => {
    const Idx = req.params.Idx;
    
      // 존재하는 인덱스인지 확인 - 없다면 No post 반환
      if(await PostModel.checkMovieIdx(Idx) == false){
        res.status(statusCode.BAD_REQUEST)
        .send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));
        return;
      }
      
      // 성공 - read profile success와 함께 해당하는 정보 출력
      var result = await MovieModel.searchMovie(Idx);
      res.status(statusCode.OK)
      .send(util.success(statusCode.OK, resMessage.READ_POST_SUCCESS, result));
      return;
};
