import {AfterViewInit, Component, OnInit, Renderer2} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'dashboard';
  weather: any
  currentTemperature: any
  apparentTemperature: any
  dailyMaxTemperature: any
  dailyMinTemperature: any
  sunrise: any
  sunset: any

  constructor(private http: HttpClient, private renderer: Renderer2) {}

  ngOnInit() {
    this.http.get("https://api.open-meteo.com/v1/forecast?latitude=48.3679&longitude=14.5169&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current=temperature_2m,apparent_temperature&timezone=Europe%2FBerlin&forecast_days=1").subscribe(response => {
      this.weather = response;
      this.currentTemperature = this.weather.current.temperature_2m;
      this.apparentTemperature = this.weather.current.apparent_temperature;
      this.dailyMaxTemperature = this.weather.daily.temperature_2m_max[0];
      this.dailyMinTemperature = this.weather.daily.temperature_2m_min[0];
      this.sunrise = this.weather.daily.sunrise[0];
      this.sunset = this.weather.daily.sunset[0];
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
