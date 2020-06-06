const pool = require('../modules/pool');
let moment = require('moment');
const table = 'movie';

const movie = {
    readAllMovie : async () => {
        const query = `SELECT * FROM ${table}`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch (err){
            console.log('readAllMovie ERROR : ', err);
            throw err;
        }
    },

    //해당 idx의 movie가 존재하는지 확인
    checkMovieIdx: async (Idx) => {
        const query = `SELECT * FROM ${table} WHERE movieIdx = "${Idx}"`;    //해당 아이디에 해당하는 모든 데이터
        try{
            const result = await pool.queryParam(query);
            if( result.length === 0 ){  //id에 해당하는 정보가 없다면
                return false;   //false 반환 -> routes/post.js에서 이 결과값으로 아이디 체크
            } else{
                return true;
            } //if문에 걸리지 않았다면 정보가 있다는 의미
        } catch(err){
            console.log('checkPostID ERROR: ', err);
            throw err;
        }
    },

    //해당 id 게시글 조회
    searchMovie : async (Idx) => {
    const query = `SELECT * FROM ${table} WHERE idx = "${Idx}"`;
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('getMovieByIdx ERROR : ', err);
            throw err;
    }
    },
    getMovieByIdx: async(idx)=>{
        const query = `SELECT * FROM ${table} WHERE idx="${idx}";`
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('getMovieByIdx ERROR : ', err);
            throw err;
    }
    },
    getMovieIdxByName: async(name)=>{
        const query = `SELECT * FROM ${table} WHERE name="${name}";`
        try{
            const result = await pool.queryParam(query);
            const resultIdx = result[0].idx;
            return resultIdx;
        }catch(err){
            console.log('getMovieIdxByName ERROR : ', err);
            throw err;
        }
    }
}
module.exports = movie;