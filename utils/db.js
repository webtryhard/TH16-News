var mysql = require('mysql');

var createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'thamtran',
        database: 'news',
        multipleStatements: true
    });
}

module.exports = {
    load: sql => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();
            connection.connect();
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
                connection.end();
            });
        });
    },

    add: (tableName, entity) => {
        return new Promise((resolve, reject) => {
            var sql = `insert into ${tableName} set ?`;
            var connection = createConnection();
            connection.connect();
            connection.query(sql, entity, (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value.insertId);
                }
                connection.end();
            });
        });
    },

    addTags: (tableName, entity) => {
        return new Promise((resolve, reject) => {

            var sql = `insert into ${tableName} set ?`;
            var connection = createConnection();
            connection.connect();
            connection.query(sql, entity, (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value.insertId);
                }
                connection.end();
            });

        });
    },

    update: (tableName, idField, entity) => {
        return new Promise((resolve, reject) => {
            var id = entity[idField];
            delete entity[idField];

            var sql = `update ${tableName} set ? where ${idField} = ?`;
            var connection = createConnection();
            connection.connect();
            connection.query(sql, [entity, id], (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value.changedRows);
                }
                connection.end();
            });
        });
    },

    delete: (tableName, idField, idField2, id, id2) => {
        return new Promise((resolve, reject) => {
            var sql = `delete from ${tableName} where ${idField} = ? and  ${idField2} = ?`;
            var connection = createConnection();
            connection.connect();
            connection.query(sql, [id, id2], (error, value) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(value.affectedRows);
                }
                connection.end();
            });
        });
    },
};