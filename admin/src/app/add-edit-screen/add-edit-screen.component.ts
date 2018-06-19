import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseService } from '../firebase-service/firebase.service';

@Component({
  selector: 'app-add-edit-screen',
  templateUrl: './add-edit-screen.component.html',
  styleUrls: ['./add-edit-screen.component.css']
})
export class AddEditScreenComponent implements OnInit {
  title = 'app';
  public resColl
  constructor(private afs: AngularFirestore){
     
  } 

  $key: string;
  namePlace: string;
  Address: string;
  phone: string='';
  lastmodi: string='';
  email: string='';
  restauranttype: string='';
  Description: string='';
  opening: string='';
 
  /*opening: {openHour: number, openMin: number, closeHour: number, closeMin: number}={
    openHour: 0, openMin: 0, closeHour: 0, closeMin: 0
  }*/
  sensitivePreferences: {gfMenu: boolean,sensitivity?: string,preferences?: string, accessibility: boolean, kosher: boolean}={
    gfMenu: false/*Gluten free menu*/,sensitivity: "",preferences: "", accessibility: false, kosher: false
  }
  linksUrl:{ website?: string, logo?: string ,facebook?:  string;}={
    website: "", logo:"",   facebook:  ""
  }
 /* location_in_map:{x:number, y: number}={
    x:0, y:0
  }*/
  
  priceRange:  string='';
  
  city: string ;
  facilities:  string='';
  moreInfo:  string='';
  TypeOfBusiness :  string='';
  
 
public save(){
    let obj = {
      namePlace: this.namePlace,
      Address:this.Address,
      city: this.city,
      phone: this.phone,
      lastmodi:this.lastmodi,
      email: this.email,
      opening: this.opening,
      Description:this.Description,
      restauranttype: this.restauranttype,
      TypeOfBusiness:this.TypeOfBusiness,

      
     sensitivePreferences:  this.sensitivePreferences,
      links:  this.linksUrl,
      priceRange: this.priceRange,      
      facilities: this.facilities,
      moreInfo: this.moreInfo

      /*location_in_map: this.location_in_map,
    */
    }
    this.resColl = this.afs.collection("resturant").doc(this.namePlace).set(obj);
    //this.resColl.add(obj)
  }
  ngOnInit() {
    this.resColl = this.afs.collection("resturant");
  }
}


