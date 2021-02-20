import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ItemFakeService } from '../item.fake.service';

@Component({
  selector: 'app-items-crud',
  templateUrl: './items-crud.component.html',
  styleUrls: ['./items-crud.component.scss']
})
export class ItemsCrudComponent implements OnInit {

  public item: Item = {
    id: null,
    name: ""
  }

  public dataSource: Item[];
  public items: Item[];

  public displayedColumns = ['id', 'name', 'action'];

  public formTitle: string = 'Novo Item';
  public formButtonLabel: string = 'Cadastrar';
  public action: string = 'create';

  constructor(private itemService: ItemFakeService, private snackBar: MatSnackBar) { 

  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.dataSource = this.itemService.getAll();
    this.items = [...this.dataSource];
  }

  saveItem() {
    if (this.item.name == null || this.item.name.trim().length == 0) {
      this.showMessage('O nome do item é obrigatório!', 'danger');
    } else {
      if (this.item.id != null && this.item.id > 0) {
        if (this.itemService.update(this.item)) {
          this.resetItem();
          this.getItems();
  
          this.showMessage('Item alterado com sucesso!');
        } else {
          this.showMessage('Não foi possível alterar o item!', 'danger');
        }
      } else {
        if (this.itemService.create(this.item)) {
          this.resetItem();
          this.getItems();
  
          this.showMessage('Item cadastrado com sucesso!');
        } else {
          this.showMessage('Não foi possível cadastrar o item!', 'danger');
        }
      }
    }
  }

  setItemToUpdate(itemId: number) {
    const _item = this.itemService.get(itemId);

    if (_item != undefined && _item != null) {
      this.item = _item;
  
      this.action = 'update';
      this.formTitle = 'Alterar Item';
      this.formButtonLabel = 'Alterar';
    }
  }
  
  deleteItem(itemId: number) {
    if (this.itemService.delete(itemId)) {
      this.getItems();
      this.showMessage('Item deleetado com sucesso!');
    } else {
      this.showMessage('Não foi possível deletar o item!', 'danger');
    }
  }

  resetItem() {
    this.item = {
      id: null,
      name: ""
    };

    this.action = 'create';
    this.formTitle = 'Novo Item';
    this.formButtonLabel = 'Cadastrar';
  }

  filterList(value: string) {
    if (value.trim().length > 0) {
      this.items = this.dataSource.filter(item => {  
        return (item.name || '').toLocaleLowerCase().includes(value.trim().toLocaleLowerCase());
      });
    } else {
      this.items = [...this.dataSource];
    }
  }

  showMessage(msg: string, type: string = 'success'): void {
    let panelClass = 'blue-snackbar';
    
    if (type == 'danger' || type == 'red') {
      panelClass = 'red-snackbar';
    }

    this.snackBar.open(msg, '', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [ panelClass ]
    });
  }
}
