import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input'
import { MatCardModule } from '@angular/material/card'
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms'
import { MatTableModule } from '@angular/material/table'
import { MatButtonModule } from '@angular/material/button'
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cadastro/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent {

  nomeBusca: string = '';
  listaCliente: Cliente[] = [];
  colunasTable: string[] = ["id", "nome", "cpf", "dataNascimento", "email", "acoes"]
  snack: MatSnackBar = inject(MatSnackBar);

  constructor(
    private service: ClienteService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.listaCliente = this.service.pesquisarCliente('');
  }

  pesquisar() {
    this.listaCliente = this.service.pesquisarCliente(this.nomeBusca)
  }

  preparaEditar(id: string) {
    this.router.navigate(['/cadastro'], { queryParams: { "id": id } })
  }

  preparaDeletar(cliente: Cliente) {
    cliente.deletando = true;
  }

  deletar(cliente: Cliente) {
    this.service.deletar(cliente);
    this.listaCliente = this.service.pesquisarCliente('');
    this.snack.open('Item deletado com sucesso', 'ok');
  }

}
