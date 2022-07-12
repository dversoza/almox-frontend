import { MeasurementUnit } from './measurement-unit.model';

export class Product {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public measurement_unit?: MeasurementUnit,
    public quantity?: number,
  ) { }
}
