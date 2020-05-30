import { Component, OnInit, TemplateRef, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ServerService } from '../server.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


export interface UserData {
  idUsuario: number;
  nombre: string;
  email: string;
  telefono: string;
  domicilio: string;
  codigoPostal: string;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})

export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['idUsuario', 'nombre', 'email', 'telefono', 'domicilio', 'codigoPostal', 'action'];
  dataSource: MatTableDataSource<UserData>;
  form: FormGroup;
  modalRef: BsModalRef;
  users: any[] = [];
  currentUser: any = {idUsuario: null, nombre: "", email: "", password: "", telefono:"", imagenUsuario:"", domicilio:"", codigoPostal:"", tipo:"", rol:"" };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  modalCallback: () => void;

  constructor(private fb: FormBuilder,
              private modalService: BsModalService,
              private server: ServerService,
              private snackBar: MatSnackBar,
              private http: HttpClient,
              public dialog: MatDialog) { }

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
    this.getUsers();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

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

  private getUsers() {
    this.server.getUsers().then((res: any) => {
      console.log('Response', res);
      this.users = res;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  editUser(user, template) {
    this.currentUser = user;
    this.updateForm();
    this.modalCallback = this.updateUser.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  updateUser() {
    const eventData = {
      idUsuario: this.form.get('idUsuario').value,
      nombre: this.form.get("nombre").value,
      email: this.form.get("email").value,
      password: this.form.get("password").value,
      telefono: this.form.get("telefono").value,
      domicilio: this.form.get("domicilio").value,
      codigoPostal: this.form.get("codigoPostal").value,
      tipo: "estandar",
      rol: "cliente"
    };
    this.modalRef.hide();
    this.server.updateUser(eventData).then(() => {
      this.getUsers();
    });
  }

  confirmarBorrado(index, template)
  {
    this.currentUser = index;
    this.updateForm();
    this.modalCallback = this.deleteUser.bind(this);
    this.modalRef = this.modalService.show(template);
  }

  deleteUser() {
    this.modalRef.hide();
    this.server.deleteUser(this.currentUser).then(() => {
      this.getUsers();
    });
  }

  onCancel() {
    this.modalRef.hide();
  }

}
