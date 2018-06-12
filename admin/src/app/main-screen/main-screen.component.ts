import { Component, OnInit, Inject } from '@angular/core';
import { Restaurant } from '../Restaurant';
import { AngularFirestore } from 'angularfire2/firestore';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  restaurants: Array<Restaurant> = []
  toShowAll = 'הצג הכל'
// filter array
  locations = [ ]

  businessTypes = [ ]

  constructor(private firebase: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit() {
    // display resturant
    this.firebase.collection('resturant').valueChanges()
      .subscribe(
        res => {
          for (let i = 0; i < res.length; i++) {
            this.restaurants.push(new Restaurant(res[i]))
          }
          this.fillFilterArrays()
        },
        err => { console.log(err) }
      )
  }
  //----------------------------------------------------------------------------
//this function is called once the user has selected a location filter
  setLocationFilter(event) {
    let selected = event.target.value // on howm the even accure
    for (let i = 0; i < this.restaurants.length; i++){
      this.restaurants[i].showOnScreen = true
      if(selected == this.toShowAll) continue// continue  for the next iter
      if(this.restaurants[i].address != selected) {
          this.restaurants[i].showOnScreen = false
      }
    }
  }

  //this function is called once the user has selected a type of business filter
  setTypeFilter(event) {
    let selected = event.target.value // on howm the even accure
    for (let i = 0; i < this.restaurants.length; i++){
      this.restaurants[i].showOnScreen = true
      if(selected == this.toShowAll) continue// continue  for the next iter
      if(this.restaurants[i].TypeOfBusiness != selected) {
          this.restaurants[i].showOnScreen = false
      }
    }
  }

  // this function called once at the page load in order to fill the filter arrays
  fillFilterArrays() {
    this.locations.push({name: this.toShowAll, value: this.toShowAll})
    this.businessTypes.push({name: this.toShowAll, value: this.toShowAll})
    for(let i = 0 ; i < this.restaurants.length ; i++) {
      let city = this.restaurants[i].address
      let type = this.restaurants[i].TypeOfBusiness
      if(city != null && city.trim().length > 0 && this.toInclude(this.locations, city.trim())) {
        this.locations.push({name: city, value: city})
      }
      if(type != null && type.trim().length > 0 && this.toInclude(this.locations, type.trim())) {
        this.businessTypes.push({name: type, value: type})
      }
    }
  }

  // this function return true if the 2nd argument is in the array
  toInclude(array: Array<{name: string, value: string}>, toFind: string): boolean {
    for(let i = 0 ; i < array.length ; i++) {
      if(array[i].name === toFind || array[i].value === toFind) return false
    }
    return true
  }



  //this function opens the popup messege
  openDialog(): void {
    let dialogRef = this.dialog.open(MainScreenPopupComponent, {
      width: '250px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }  
}
  @Component({
    selector: 'main-screen-popup',
    templateUrl: './main-screen-popup.component.html',
    
  })

  export class MainScreenPopupComponent{

    constructor(
      public dialogRef: MatDialogRef<MainScreenPopupComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) { }

      onNoClick(): void {
        this.dialogRef.close();
      }

  }

  

 
  
    
  
  
    
   
  
   
 

 

