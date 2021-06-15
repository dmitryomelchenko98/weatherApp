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
          this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=bfa48bbbc6ab686a8bada69cd058492b&lang=ru`)
            .subscribe((res) => {
              this.respons = res
              this.loading = false
            })
        }
      );
    } 
  }

  getWeatherByCity(city: any) {
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bfa48bbbc6ab686a8bada69cd058492b&lang=ru&units=metric`)
    .subscribe((res)=>{
      this.respons = res
    },
    (err) => {
      alert("Введенный город не найдет, попробуйте ввести другое значение!")
    })
    this.citySearch = true
  }
  getWeatherByCityFur(city: any) {
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bfa48bbbc6ab686a8bada69cd058492b&lang=ru&units=imperial`)
    .subscribe((res)=>{
      this.respons = res
    },
    (err) => {
      alert("Введенный город не найдет, попробуйте ввести другое значение!")
    })
  }

  onInput(event: any) {
    this.citySearchInput = event.target.value
  }
}
