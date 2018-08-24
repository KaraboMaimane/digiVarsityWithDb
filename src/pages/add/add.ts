import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {
  dataList = [];
  url: string = '../../assets/imgs/plus_PNG73.png';
  constructor(public db: DatabaseProvider, public navCtrl: NavController){
  }

  add(name: string, description: string, pricing: string){
    this.db.add(name, description, pricing, this.url);

    this.db.getCourses().then((data: any) => {
      console.log(data);
      this.dataList = data;
    }, (error) => {
      console.log(error);
    });
  }

  insertImage(event: any){
    if(event.target.files && event.target.files[0]){
      let reader = new FileReader();

      reader.onload = (event:any) => {
        this.url = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
