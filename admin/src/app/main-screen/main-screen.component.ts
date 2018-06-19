import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Restaurant } from '../Restaurant';
import { AngularFirestore } from 'angularfire2/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FirebaseService } from '../firebase-service/firebase.service';
import { AddEditScreenComponent } from '../add-edit-screen/add-edit-screen.component';

import { AuthService } from '../servises/auth.service';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  isLoading = false
  restaurants: Array<Restaurant> = []
  toShowAll = 'הצג הכל'
  // filter array
  locations = [];
  public isEdit:boolean =  false;
  idEdit = ""

  businessTypes = []

  constructor(public authService: AuthService, private firebase: AngularFirestore, private firebaseService: FirebaseService, public dialog: MatDialog) { }

  ngOnInit() {
    // display resturant.
    this.isLoading = true
    this.firebaseService.getAllRestaurant().then((res: any[]) => {
      for (let i = 0; i < res.length; i++) {
        this.restaurants.push(new Restaurant(res[i]))
      }
      this.fillFilterArrays()
      this.isLoading = false
    })
    // this.firebase.collection('resturant').valueChanges()
    //   .subscribe(
    //     res => {
    //       
    //     },
    //     err => { console.log(err) }
    //   )
  }
  //----------------------------------------------------------------------------
  //this function is called once the user has selected a location filter
  setLocationFilter(event) {
    let selected = event.target.value.trim() // on howm the even accure
    for (let i = 0; i < this.restaurants.length; i++) {
      this.restaurants[i].showOnScreen = true
      if(selected == this.toShowAll) continue// continue  for the next iter
      if(this.restaurants[i].city.trim() != selected.trim()) {
          this.restaurants[i].showOnScreen = false
      }
    }
  }

  //this function is called once the user has selected a type of business filter
  setTypeFilter(event) {
    let selected = event.target.value.trim() // on howm the even accure
    for (let i = 0; i < this.restaurants.length; i++) {
      this.restaurants[i].showOnScreen = true
      if (selected == this.toShowAll) continue// continue  for the next iter
      if (this.restaurants[i].TypeOfBusiness.trim() != selected.trim()) {
        this.restaurants[i].showOnScreen = false
      }
    }
  }

  // this function called once at the page load in order to fill the filter arrays
  fillFilterArrays() {
    this.locations.push({name: this.toShowAll, value: this.toShowAll})
    this.businessTypes.push({name: this.toShowAll, value: this.toShowAll})
    for(let i = 0 ; i < this.restaurants.length ; i++) {
      let city = this.restaurants[i].city.trim()
      let type = this.restaurants[i].TypeOfBusiness.trim()
      if (city != null && city.trim().length > 0 && this.toInclude(this.locations, city.trim())) {
        this.locations.push({ name: city, value: city })
      }
      if (type != null && type.trim().length > 0 && this.toInclude(this.locations, type.trim())) {
        this.businessTypes.push({ name: type, value: type })
      }
    }
  }

  // this function return true if the 2nd argument is in the array
  toInclude(array: Array<{ name: string, value: string }>, toFind: string): boolean {
    for (let i = 0; i < array.length; i++) {
      if (array[i].name === toFind || array[i].value === toFind) return false
    }
    return true
  }



  //this function opens the popup messege
  openDialog(item): void {
    let dialogRef = this.dialog.open(MainScreenPopupComponent, {
      width: '250px',
      data: {originalComponent: this}
    });
    dialogRef.componentInstance.id = item.id;
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

  toArray(item){
    const arr = [];
    for(let key in item){
      arr.push(key)
    }
    return arr;
  }

  toObject(arr){

  }

  edit(item) {
    this.isEdit = true;
    this.idEdit = item.id 
  }

  save(item){
    this.firebaseService.save(item);
    this.isEdit = false
  }
  logout() {
    this.authService.logout();
  }
}




@Component({
  selector: 'main-screen-popup',
  templateUrl: './main-screen-popup.component.html',

})

export class MainScreenPopupComponent {

  public id: string;
  
  constructor(
    public dialogRef: MatDialogRef<MainScreenPopupComponent>, private fbService: FirebaseService,
    @Inject(MAT_DIALOG_DATA) public data: any, private firebase: AngularFirestore) { }

  delete() {
    this.fbService.delete(this.id)
    this.data.originalComponent.restaurants = this.data.originalComponent.restaurants.filter(res => res.id !== this.id)
    this.dialogRef.close();
  }

  


}
















