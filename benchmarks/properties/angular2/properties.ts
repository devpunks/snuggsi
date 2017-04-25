import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { PropertiesComponent } from 'app/properties.component';

@NgModule({
    imports: [ BrowserModule ],
    declarations: [ PropertiesComponent ],
    bootstrap: [ PropertiesComponent ]
})
export class PropertiesModule {}
