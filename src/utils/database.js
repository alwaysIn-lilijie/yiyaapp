import * as SQLite from 'expo-sqlite';
/*
 * @Descripttion: 
 * @version: 
 * @Author: lizhiying
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-19 15:31:14
 */

const DBNAME = {
	name: 'hisapp',
	path: '_doc/yiyadb'
};
class Database {
	open() {
		console.log('open database ...');
        this.db = SQLite.openDatabase(DBNAME.name);
        return this.db;
	}
	execute(sql) {
        let that = this;
		//console.log("sql",sql)
		let promise = new Promise((resolve, reject) =>{
            that.db.transaction((tx) => {
                tx.executeSql(sql);
                resolve("success");
            });
		});
		return promise;
	}
	query(sql) {
		let that = this;
		//console.log("select",sql)
		let promise = new Promise((resolve, reject) =>{
            that.db.transaction((tx) => {
                tx.executeSql(sql, [],(_,{rows})=>{
                    resolve(rows);
                });
                
            });
			// SQLite.executeSql({
			// 	name: DBNAME.name,
			// 	sql:sql,
			// 	success: (e) =>{
			// 		console.log('success.....');
					
			// 		resolve(e);
			// 	},
			// 	fail: (e) => {
			// 		console.log('fail ....');
			// 		reject(e);
			// 	}
			// });
		});
		return promise;
	}
	
	isOpen() {
		return this.db;
	}
	
	close() {
		if (this.isOpen()) {
			this.db.closeAsync();
            this.db = undefined;
		}
	}
}

export default new Database()