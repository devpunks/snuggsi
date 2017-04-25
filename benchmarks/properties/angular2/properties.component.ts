// http://www.edc4it.com/blog/web/helloworld-angular2.html
// http://www.thejavageek.com/2017/03/28/hello-world-app-angular-4/
//our root app component
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

@Component({
  selector: 'my-app',
  template: `
    <div>
      <h2>Hello {{name}}</h2>
    </div>
  `,
})
export class App {
  name:string;
  constructor() {
    this.name = `Angular! v${VERSION.full}`
  }
}

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule {}
