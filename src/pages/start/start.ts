import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage{
  courseArray = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider, public action: ActionSheetController) {
  }

  ionViewDidEnter(){
    this.db.getCourses().then((data: any) => {
      console.log(data);
      this.courseArray = data;
    }, (error) => {
      console.log(error);
    });
  }

  nextPage(page: string){
    this.navCtrl.push(page);
  }

  details(i, id){
    const action = this.action.create({
      title: 'What action do you want to take with this course?',
      buttons: [
        {
          text: 'Edit The Course',
          handler: () =>{
              this.navCtrl.push('EditPage', {course: this.courseArray[i], index: i});
          }
        },
        {
          text: 'Delete The Course',
          handler: () =>{
            console.log(i + ' ' + id)
              this.db.delete(id);
          }
        }
      ]
    });
    action.present();
  }
}
