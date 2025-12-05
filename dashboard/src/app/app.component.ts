import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'dashboard';
  weather: any

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get("https://api.open-meteo.com/v1/forecast?latitude=48.3679&longitude=14.5169&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current=temperature_2m,apparent_temperature&timezone=Europe%2FBerlin&forecast_days=1").subscribe(response => {
      this.weather = response;
    });
  }
}
