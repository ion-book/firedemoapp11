import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    items: Observable<any[]>;
    itemsRef: AngularFireList<any>;

  constructor(public navCtrl: NavController, db: AngularFireDatabase, public alertCtrl: AlertController) {
    this.itemsRef = db.list('items');
    this.items = this.itemsRef.snapshotChanges();
  }

  addCar(){
    let prompt = this.alertCtrl.create({
      title: 'Add Item',
      inputs: [{
          name: 'text'
      }],
      buttons: [
          {
              text: 'Cancel'
          },
          {
              text: 'Add',
              handler: data => {
                this.addItem(data.text);
              }
          }
      ]
  });

  prompt.present();
  }

  editCar(key: string, oldString: string){
    
           let prompt = this.alertCtrl.create({
               title: 'Editar',
               inputs: [{
                   name: 'text',
                   value: oldString
               }],
               buttons: [
                   {
                       text: 'Cancel'
                   },
                   {
                       text: 'Save',
                       handler: data => {
                           this.updateItem(key,data.text);
                       }
                   }
               ]
           });
    
           prompt.present();       
    
       }

  addItem(newName: string) {
    this.itemsRef.push({ text: newName });
  }
  updateItem(key: string, newText: string) {
    this.itemsRef.update(key, { text: newText });
  }
  deleteItem(key: string) {    
    this.itemsRef.remove(key); 
  }
  deleteEverything() {
    this.itemsRef.remove();
  }
  
}
