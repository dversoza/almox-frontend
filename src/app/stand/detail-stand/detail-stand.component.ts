import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product/services';
import { Product, Stand } from 'src/app/shared';
import { StandDetail, StandService } from '../services/stand.service';

@Component({
  selector: 'app-detail-stand',
  templateUrl: './detail-stand.component.html',
  styleUrls: ['./detail-stand.component.css']
})
export class DetailStandComponent implements OnInit {
  stand!: StandDetail;

  constructor(
    private standService: StandService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getStand();
  }

  public getStand(): void {
    const standId = this.route.snapshot.params.id;
    this.standService.getStand(standId).subscribe((stand) => {
      this.stand = stand;
    });
  }
}
