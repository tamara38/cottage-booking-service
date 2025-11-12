import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { NgxChartsModule, LegendPosition } from '@swimlane/ngx-charts';
import { BookingsService } from '../services/bookings.service';
import { CottageService } from '../services/cottage.service';
import { Booking } from '../models/Booking';
import { Cottage } from '../models/cottage';


@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [ CommonModule, NgxChartsModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit{
  
  ngOnInit(): void {
    this.bookingService.getAll().subscribe(data => {
      this.bookings = data;
      this.cottageService.getAllCottages().subscribe(data =>{
      this.cottages = data;
      this.prepareBarChart();
      this.preparePieChart();
    });
    });
    

    
  }

  private bookingService = inject(BookingsService)
  private cottageService = inject(CottageService)
  bookings: Booking[] = []
  cottages: Cottage[] = []

  barChartData: any[] = [];
  pieChartData: any[] = [];
  
  barChartView: [number, number] = [700, 400]; 
  barChartColorScheme = { domain: ['#4caf50', '#ff9800', '#f44336'] }; 
  pieChartView: [number, number] = [400, 400]; 
  pieChartColorScheme = { domain: ['#2196f3', '#9c27b0'] };
  



  

  prepareBarChart() {
    const statuses = ['completed', 'accepted', 'pending'];

    this.barChartData = statuses.map(status => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      series: []
    }));

    for (let month = 1; month <= 12; month++) {
      this.cottages.forEach(c => {
        statuses.forEach((status, idx) => {
          const count = this.bookings.filter(b =>
            b.cottage === c.idC &&
            b.status === status &&
            new Date(b.startDate).getMonth() + 1 === month
          ).length;

          this.barChartData[idx].series.push({
            name: `${c.name} M${month}`,
            value: count
          });
        });
      });
    }
  }

  preparePieChart() {
    this.pieChartData = this.cottages.map(c => {
      const weekend = this.bookings.filter(b =>
        b.cottage === c.idC &&
        this.isWeekend(new Date(b.startDate))
      ).length;

      const weekday = this.bookings.filter(b =>
        b.cottage === c.idC &&
        !this.isWeekend(new Date(b.startDate))
      ).length;

      return {
        name: c.name,
        series: [
          { name: 'Weekend', value: weekend },
          { name: 'Weekday', value: weekday }
        ]
      };
    });
  }

  isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6;
  }
}