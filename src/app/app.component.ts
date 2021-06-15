import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { delay } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  measurements = true
  citySearch = true
  citySearchInput = ''
  respons: any
  lat: any
  lon: any
  loading = false

  constructor(private http: HttpClient) {}

  ngOnInit() {

    this.getWeatherGeolocation();
  
  }

  getWeatherGeolocation() {
    this.loading = true
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(  
         (position) => {
          this.lat= position.coords.latitude;
          this.lon = position.coords.longitude;
          this.http.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=bfa48bbbc6ab686a8bada69cd058492b&lang=ru`)
            .subscribe((respons) => {
              this.respons = respons
              this.loading = false
            })
        }
      );
    } 
  }

  getWeatherByCity(city: any) {
    this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bfa48bbbc6ab686a8bada69cd058492b&lang=ru&units=metric`)
    .subscribe((respons)=>{
      this.respons = respons
    })
    this.citySearch = true
  }
  getWeatherByCityFur(city: any) {
    this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bfa48bbbc6ab686a8bada69cd058492b&lang=ru&units=imperial`)
    .subscribe((respons)=>{
      this.respons = respons
    })
  }

  onInput(event: any) {
    this.citySearchInput = event.target.value
  }
}
