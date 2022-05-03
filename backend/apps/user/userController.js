const User = require("./userModels.js");
const Utils = require("../../utils/commonutils.js");

const getUser = function(req, res){
    User.findByKlaytnAddress(req.params.klaytnAddress, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found User with id ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving User with id " + req.params.customerId
            });
          }
        } else res.send(data);
      });
}

const createUser = function(req, res){
    console.log(req.body)
    if(!req.body || Utils.isEmpty(req.body)){
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return
    };

    const user = new User({
        klaytn_address: req.body.klaytnAddress,
    });

    // 데이터베이스에 저장
    User.create(user, (err, data) =>{
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occured while creating th Customer."
            });
        }else res.send(data);
    })
}

//const LoginKaikas


module.exports = {
    getUser:getUser,
    createUser:createUser
  }