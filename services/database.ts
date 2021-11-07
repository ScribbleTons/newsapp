import * as SQLite from 'expo-sqlite';
import {Alert} from 'react-native';

const db = SQLite.openDatabase("app_db");
 
export  function createTable(){
	return new Promise((resolve, reject) => { 

	db.transaction((txn) => {
		txn.executeSql(
		`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT NOT NULL UNIQUE, password TEXT );`, 
		[],
		(sqlTxn, res) => resolve(res),
		error => reject(error)
		)
		});
	});
  }
  
 export async function addUser(payload){
	if(!payload){
	 Alert.alert("Please enter valid inputs");
	}
	const user = await fetchUserByEmail(payload.email);
	
	return new Promise((resolve, reject)=> { 
		if(user.length>0){
			resolve({isExist: true})
			return;
		}
		
		db.transaction(txn => {
		  txn.executeSql(
		`INSERT INTO users (email, password) values (?,?);`,[payload?.email, payload?.password],
		(sqlTxn, res) => resolve(res),
		error => reject(error)
		)
	});
	});
 }
 
 
 export function logOutUser(payload){
	return new Promise((resolve, reject) => {
		db.transaction(txn => {
			txn.executeSql(
			`DELETE FROM users WHERE email=?`,
			[payload],
			(_, res) => resolve(res),
			error => reject(error)
			)
		})
	
	})
 
 }
 
 export function fetchUser(){
	return new Promise((resolve, reject) => {
		db.transaction(txn => {
			txn.executeSql(
			`SELECT * FROM users`,
			[],
			(_, res) => resolve(res.rows._array),
			error => reject(error)
			)
		})
	
	})
 }
 
function fetchUserByEmail(email){
	return new Promise((resolve, reject) => {
		db.transaction(txn => {
			txn.executeSql(
			`SELECT * FROM users WHERE email=?`,
			[email],
			(_, res) => resolve(res.rows._array),
			error => reject(error)
			)
		})
	
	})
 }