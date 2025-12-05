import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {weatherCodes} from './weatherCodes';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    DatePipe
  ],
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'dashboard';
  weatherReport: any;
  weather: any;
  currentTemperature: any;
  dailyMaxTemperature: any;
  dailyMinTemperature: any;
  sunrise: any;
  sunset: any;

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngOnInit() {
    this.http.get("https://api.open-meteo.com/v1/forecast?latitude=48.3679&longitude=14.5169&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,snowfall_sum&current=temperature_2m,weather_code&timezone=Europe%2FBerlin&forecast_days=1").subscribe(response => {
      this.weatherReport = response;

      this.weather = weatherCodes[this.weatherReport.current.weather_code].name;
      this.currentTemperature = this.weatherReport.current.temperature_2m;
      this.dailyMaxTemperature = this.weatherReport.daily.temperature_2m_max[0];
      this.dailyMinTemperature = this.weatherReport.daily.temperature_2m_min[0];
      this.sunrise = this.weatherReport.daily.sunrise[0];
      this.sunset = this.weatherReport.daily.sunset[0];
    });
  }

  ngAfterViewInit() {
    const script = this.renderer.createElement('script');
    script.src = "https://www.mittag.io/e/js";
    script.async = true;
    script.defer = true;

    this.renderer.appendChild(document.body, script);
  }
}
