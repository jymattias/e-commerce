import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ServerService } from '../server.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  form: FormGroup;
  currentUser: any = {idUsuario: null, nombre: "", email: "", password: "", telefono:"", imagenUsuario:"", domicilio:"", codigoPostal:"", tipo:"", rol:"" }; 

  constructor(private fb: FormBuilder,
              private server: ServerService,
              private snack: MatSnackBar) { }
              

  ngOnInit(): void {
    this.form = this.fb.group({
      idUsuario: [this.currentUser.idUsuario, Validators.required],
      nombre: [this.currentUser.nombre, Validators.required],
      email: [this.currentUser.email, Validators.required],
      password: [this.currentUser.password, Validators.required],
      telefono: [this.currentUser.telefono],
      imagenUsuario: [this.currentUser.imagenUsuario],
      domicilio: [this.currentUser.domicilio],
      codigoPostal: [this.currentUser.codigoPostal],
      tipo: [this.currentUser.tipo],
      rol: [this.currentUser.rol]
    });
  };

  private updateForm() {
    this.form.setValue({
      idUsuario: [this.currentUser.idUsuario],
      nombre: [this.currentUser.nombre],
      email: [this.currentUser.email],
      password: [this.currentUser.password],
      telefono: [this.currentUser.telefono],
      imagenUsuario: [this.currentUser.imagenUsuario],
      domicilio: [this.currentUser.domicilio],
      codigoPostal: [this.currentUser.codigoPostal],
      tipo: [this.currentUser.tipo],
      rol: [this.currentUser.rol]
    });
  }

  AddUser(){
    const newUser = {
      nombre: this.form.get("nombre").value,
      email: this.form.get("email").value,
      password: this.form.get("password").value,
      telefono: this.form.get("telefono").value,
      domicilio: this.form.get("domicilio").value,
      codigoPostal: this.form.get("codigoPostal").value,
      tipo: "estandar",
      rol: "cliente"
    }
    this.server.addUsers(newUser).then((res: any) => {
      if (res.status == "ok") {
        this.snack.open('Usuario agregado exitosamente!', '', {
          duration: 3000
        });
      }
      else {
        this.snack.open('Ocurrio un error', '', {
          duration: 3000
        });
      }
    });
    this.updateForm();
  }
}
