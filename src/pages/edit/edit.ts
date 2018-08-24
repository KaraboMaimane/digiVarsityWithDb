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
  id: number;
  key;
  courseArray: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, public db: DatabaseProvider) {
  }

  ionViewDidEnter(){
    this.courseArray = this.navParams.get('course');
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

  edit(name, description, pricing){
    this.db.update(this.courseArray.id, name,description, pricing, this.url).then(data =>{
      console.log(data);
    });
    this.navCtrl.push('StartPage');
  }


}
