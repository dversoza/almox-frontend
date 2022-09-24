import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StandDetail, StandService, StandStock } from '../services/stand.service';

@Component({
  selector: 'app-detail-stand',
  templateUrl: './detail-stand.component.html',
  styleUrls: ['./detail-stand.component.css'],
})
export class DetailStandComponent implements OnInit {
  stand!: StandDetail;

  loading = true;

  constructor(private standService: StandService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getStand();
  }

  public getStand(): void {
    const standId = this.route.snapshot.params.id;
    this.standService.getStand(standId).subscribe({
      next: (stand: StandDetail) => {
        this.stand = stand;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  public normalizedProductMeasurementUnit(stand_stock: StandStock): string | undefined {
    if (stand_stock.stock == 1) {
      return stand_stock.measurement_unit?.toLowerCase();
    } else {
      return `${stand_stock.measurement_unit}s`.toLowerCase();
    }
  }
}
