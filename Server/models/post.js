const pool = require('../modules/pool');
const table = 'post';

const post = {

    //이거 뭐냐면 파라미터로 QuestionFlag(몇번째 질문에 대한 페이지인지) 받아와서
    searchPost : async (questionFlag) => {
        const fields = 'content1, content2, content3'; //content123 string 배열로 선언해두고
        const query = `SELECT ${fields[questionFlag]} FROM ${table}"`; //해당 flag에 해당하는(content1은 flag가 0) string을 가져오려고 한거야!
            try{
                const result = await pool.queryParam(query);
                return result;
            }catch(err){
                console.log('searchPost ERROR: ', err);
                throw err;
            }
        },

    createPost : async(req, res) => {
        // 1. request body에서 값을 읽어온다.
        const {content1, content2, content3} = req.body;
    
        // 2. 새로운 POST를 등록한다. post의 id는 자동으로 +1
        var result = await PostModel.createPost(content1, content2, content3);
      
        // 3. POST 작성 성공
        res.status(statusCode.OK).send(util.success(statusCode.OK, resMessage.CREATED_POST, result));
    },

    editPost : async(req, res) => {
        // 1. request body에서 값을 읽어온다.  
        const {content1, content2, content3} = req.body;
        const postIdx = req.params.postIdx;
        
        // 예외처리 : parameter 체크
          if(await PostModel.checkPostIdx(postIdx) == false){
            res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));
            return;
        }
      
        // 2. 기존 POST의 내용을 수정한다.
        var result = await PostModel.editPost(postIdx,content1, content2, content3);
        const pageInfo = await PostModel.searchPost(postIdx);
      
        // 3. POST 수정 성공 - 내용 출력
        res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.UPDATE_SUCCESS,{
          postInfo : pageInfo[0]
        }));
        return;
    },

    deletePost : async(req, res) => {
        // 1. request body에서 값을 읽어온다. 
        const postIdx = req.params.postIdx;
      
        // 예외처리 : parameter 체크
        if(await PostModel.checkPostID(postIdx) == false){ //해당하는 id의 게시글이 존재하지 않는다면
          res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, resMessage.NO_POST));  
          return;
        }
      
        // 3. POST 삭제 성공
        var result = await PostModel.deletePost(postIdx);
        res.status(statusCode.OK).send(util.success(statusCode.OK,resMessage.DELETE_SUCCESS,{
          postID : postIdx
        }));
        return;
    }

}

module.exports = post;