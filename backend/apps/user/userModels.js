const sql = require("../../utils/db.js");

// 생성자 
const User = function(user){
    this.user_id = user.user_id;
    this.klaytn_address = user.klaytn_address;
    this.user_type = "N";
    this.use_yn = "Y";
};

// user id로 조회
User.findById = (userId, result)=>{
    const queryString = 
        `SELECT * 
        FROM USERS 
        WHERE user_id = ?`
    const param = [userId];    
    sql.query('SELECT * FROM user WHERE user_id = ?',param, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // 결과가 없을 시 
        result({kind: "not_found"}, null);
    });
};

// klaytnAddress로 조회
User.findByKlaytnAddress = (klaytnAddress, result)=>{
    const queryString = 
    `SELECT * 
    FROM USERS
    WHERE klaytn_address = ?`
    const param = [klaytnAddress];    
    sql.query('SELECT * FROM user WHERE klaytn_address = ?',klaytnAddress, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if(res.length){
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // 결과가 없을 시 
        result({kind: "not_found"}, null);
    });
};

// user 튜플 추가 
User.create = (newUser, result)=>{
    const queryString = 
    `INSERT INTO USERS SET ?`
    sql.query(queryString, newUser, (err, res)=>{
        if(err){
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("Created customer: ",{id:res.inseertId, ...newUser });
        result(null, {id: res.inseertId, ...newUser});
    });
};

module.exports = User;