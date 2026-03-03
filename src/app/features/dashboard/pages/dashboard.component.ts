import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { DashboardService } from '../services/dashboard.service';
import { DashboardResponse, MallDashboard, ShopDashboard } from '../models/dashboard.model';

Chart.register(...registerables);

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild('dashboardChart', { static: false }) chartRef!: ElementRef<HTMLCanvasElement>;

  data!: DashboardResponse;
  loading = true;
  chart!: Chart;

  years: number[] = [];
  selectedYear: number = new Date().getFullYear();

  constructor(private dashboardService: DashboardService,
              private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Initialiser 5 dernières années
    const currentYear = new Date().getFullYear();
    for (let i = 0; i < 5; i++) {
      this.years.push(currentYear - i);
    }
    this.loadDashboard(this.selectedYear);
  }

  ngOnDestroy(): void {
    if (this.chart) this.chart.destroy();
  }

  get mallDashboard(): MallDashboard | null {
    return this.data?.type === 'mall' ? (this.data.dashboard as MallDashboard) : null;
  }

  get shopDashboard(): ShopDashboard | null {
    return this.data?.type === 'shop' ? (this.data.dashboard as ShopDashboard) : null;
  }

  onYearChange(year: number) {
    this.selectedYear = year;
    this.loadDashboard(year);
  }

  loadDashboard(year: number) {
    this.loading = true;
    this.dashboardService.getDashboard(year).subscribe(res => {
      this.data = res;
      this.loading = false;

      // ⚡ Utiliser ChangeDetector pour s'assurer que le canvas est rendu
      this.cd.detectChanges();

      // Créer le graphique après le rendu du canvas
      setTimeout(() => this.initChart(), 0);
    });
  }

  private initChart() {
    if (!this.chartRef || !this.chartRef.nativeElement) return;

    if (this.chart) this.chart.destroy();

    const labels = ['Jan', 'Fév', 'Mar', 'Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'];

    let datasetData: number[] = [];
    let label = '';

    if (this.data.type === 'mall') {
      datasetData = this.data.graphSubscriptions?.map(x => x.totalRevenue) || [];
      label = 'Revenu abonnements';
    } else if (this.data.type === 'shop') {
      datasetData = this.data.graphInvoices?.map(x => x.totalOrders) || [];
      label = 'Total commandes';
    }

    const config: ChartConfiguration = {
      type: 'bar' as ChartType,
      data: {
        labels,
        datasets: [{
          label,
          data: datasetData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: true } },
        scales: { y: { beginAtZero: true } }
      }
    };

    this.chart = new Chart(this.chartRef.nativeElement, config);
  }
}