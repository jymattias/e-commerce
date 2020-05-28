import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-commerce';
  mostrar: boolean;

  constructor(){
    this.mostrar = false;
  }

  ngOnInit(): void {

  }

  mostrarNav() {
    this.mostrar = true;
  }
  
}
