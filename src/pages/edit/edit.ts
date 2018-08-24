import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage{
  url: string = '../../assets/imgs/plus_PNG73.png';
  id;
  key;
  courseArray = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public db: DatabaseProvider) {
  }

  ionViewDidEnter(){
    this.courseArray = this.navParams.get('course');
    this.id = this.navParams.get('index');
    console.log(this.id);
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

  edit(name, description, pricing, image){
    this.db.update(this.id, name,description, pricing, this.url)
  }


}
