module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("Users", {
        id: {type: Sequelize.STRING, primaryKey: true, autoIncrement:true},
        name: {type: Sequelize.STRING},
        // pool: {
        //     max: 5,
        //     min: 0,
        //     acquire: 30000,
        //     idle: 10000
        // }
    });

    return Users;
};