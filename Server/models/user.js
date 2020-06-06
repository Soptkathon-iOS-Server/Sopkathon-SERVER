const pool = require('../modules/pool');
const crypto = require('crypto');
const table = 'user';
const Movie = require('../models/movie');
const tableUserMovie = 'user_watched_movie';

const user = {
    signup: async (id, name, password, salt) => {
        const fields = 'id, name, password, salt';
        const questions = `?, ?, ?, ?`;
        const values = [id, name, password, salt];
        const query = `INSERT INTO ${table}(${fields}) VALUES(${questions})`;
        try {
            const result = await pool.queryParamArr(query, values);
            const trueFalse = result.protocol41;
            console.log(trueFalse)
            return trueFalse;
        } catch (err) {
            if (err.errno == 1062) {
                console.log('signup ERROR : ', err.errno, err.code);
                return -1;
            }
            console.log('signup ERROR : ', err);
            throw err;
        }
    },
    checkUser: async (id) => {
        const query = `SELECT * FROM ${table} WHERE id = "${id}";`;
        try{
            const result = await pool.queryParam(query);
            if(result.length > 0) return true;
            else return false;
        } catch(err){
            console.log('checkUser ERROR : ', err);
            throw err;
        }
    },
    signin: async (id, password) => {
        const query = `SELECT * FROM ${table} WHERE id = "${id}";`
        try{
            const result = await pool.queryParam(query);
            const hashedPassword = await crypto.pbkdf2Sync(password, result[0].salt, 1, 32, 'sha512').toString('hex');

            if(result[0].password === hashedPassword) return result;
            else return false;
        } catch(err){
            console.log('signin ERROR : ', err);
            throw err;
        }
    },
    getUserById : async (id) => {
        const query = `SELECT * FROM ${table} WHERE id = "${id}";`
        try{
            const result = await pool.queryParam(query);
            return result[0];
        } catch(err){
            console.log('getUserById ERROR : ', err);
            throw err;
        }
    },
    getAllMovie: async(id)=>{
        const query = `SELECT * FROM ${tableUserMovie} WHERE user_id = "${id}";`
        
        try{
            const userResult = await pool.queryParam(query)
            let result =[];
            for(i=0;i<userResult.length;i++){
                result[i]= await Movie.getMovieByIdx(userResult[i].movie_idx)
            }
            return result;
        }catch(err){
            console.log('getAllMovie ERROR : ', err);
            throw err;
        }
    },
    signMovie: async(id,movieName)=>{
        const movieIdx = await Movie.getMovieIdxByName(movieName);
        const fields = 'user_id,movie_idx'
        const values = [id,movieIdx];
        const query = `INSERT INTO ${tableUserMovie}(${fields}) VALUES(?,?)`
        try{
            const result = await pool.queryParamArr(query,values);
            return result;
        }catch(err){
            console.log('signMovie ERROR : ', err);
            throw err;
        }
    }
}

module.exports = user;
