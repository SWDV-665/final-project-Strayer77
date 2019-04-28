import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HuntService } from '../../providers/hunt-service/hunt-service';
import { Hunt } from '../../models/hunt.model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-new-hunt',
  templateUrl: 'new-hunt.html',
})
export class NewHuntPage {
  formGroup: FormGroup;
  hunt: Hunt;
  date: Date = new Date();
  coveysFound: number;
  birdsTaken: number;
  content: string = '';
  myPhoto: any;

  constructor(public navCtrl: NavController, private huntService: HuntService, private camera: Camera) {
    this.formGroup = new FormGroup({
      content: new FormControl(),
      date: new FormControl(),
      coveysFound: new FormControl(),
      birdsTaken: new FormControl(),
      myPhoto: new FormControl()
    })
  }

  //saves hunts in the new hunt page
  //invokes the method from the hunt service provider page
  saveHunt(hunt: Hunt) {
    this.huntService.saveHunt(hunt);
    //use navctrl to pop current view off of stack and return to view
    //below that one on the stack - in this case the home page
    this.navCtrl.pop();
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false
    }
    
    this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):
    this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
    // Handle error
    });
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.myPhoto = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }

  
  
}
