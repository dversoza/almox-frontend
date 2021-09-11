import { NgModule } from '@angular/core';

// Directives
import { SortDirective } from './directives';

// Pipes

@NgModule({
  declarations: [SortDirective],
  exports: [SortDirective],
})
export class SharedModule {}
