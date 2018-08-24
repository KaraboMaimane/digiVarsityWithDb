import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';






/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  private db: SQLiteObject;
  private isOpen: boolean;
  public lastname;

  constructor(public http: HttpClient,
    public storage: SQLite,


  ) {

    if (!this.isOpen) {
      this.storage = new SQLite();
      this.storage.create({ name: "database.db", location: "default" }).then((db: SQLiteObject) => {
        this.db = db;
        db.executeSql("CREATE TABLE IF NOT EXISTS courses(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, description TEXT, pricing TEXT, image TEXT)", []);
        this.isOpen = true;
      }).catch((error) => {
        console.log(error);
      })
    }
  }

  add(name: string, description: string, price: string, url: string) {
    return new Promise((resolve, reject) => {
      let sql = "INSERT INTO courses (name, description, pricing,  image) VALUES (?,?,?,?)";
      this.db.executeSql(sql, [name, description, price, url]).then((data) => {
        resolve(data)
      }, (error) => {
        reject(error);
      });
    });
  }

  getCourses() {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM courses", []).then((data) => {
        let courses = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            courses.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              description: data.rows.item(i).description,
              pricing: data.rows.item(i).pricing,
              url: data.rows.item(i).image,
            });
          }
        }
        resolve(courses);
      }, (error) => {
        reject(error);

      })
    })
  }

  getCourse(id) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("SELECT * FROM courses WHERE id = ?", [id]).then((data) => {
        let courses = [];
        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            courses.push({
              id: data.rows.item(i).id,
              name: data.rows.item(i).name,
              description: data.rows.item(i).description,
              price: data.rows.item(i).price,
              url: data.rows.item(i).url,
            });
          }
        }
        resolve(courses);
      }, (error) => {
        reject(error);

      })
    })
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("DELETE FROM courses WHERE id=?", [id]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }

  update(id, name, description, pricing, url) {
    return new Promise((resolve, reject) => {
      this.db.executeSql("UPDATE courses SET name=?, description=?, pricing=?, image=? WHERE id=?", [name, description, pricing, url, id]).then((data) => {
        resolve(data);
      }, (error) => {
        reject(error);
      });
    });
  }
}


