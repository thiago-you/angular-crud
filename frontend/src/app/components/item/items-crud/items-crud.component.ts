import { Component, OnInit } from '@angular/core';
import { ItemService } from './../item.service';
import { Item } from '../item';

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

  public items: Item[];
  public displayedColumns = ['id', 'name', 'action'];

  public formTitle: string = 'Novo Item';
  public formButtonLabel: string = 'Cadastrar';
  public action: string = 'create';

  constructor(private itemService: ItemService) { 

  }

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this.itemService.getAll().subscribe(items => {
      this.items = items;
    });
  }

  saveItem() {
    if (this.item.id != null && this.item.id > 0) {
      this.itemService.update(this.item).subscribe(() => {
        this.resetItem();
        this.getItems();

        this.itemService.showMessage('Item alterado com sucesso!');
      });
    } else {
      this.itemService.create(this.item).subscribe(() => {
        this.resetItem();
        this.getItems();

        this.itemService.showMessage('Item cadastrado com sucesso!');
      });
    }
  }

  setItemToUpdate(itemId: Number) {
    this.itemService.get(itemId).subscribe(item => {
      this.item = item;

      this.action = 'update';
      this.formTitle = 'Alterar Item';
      this.formButtonLabel = 'Alterar';
    });
  }
  
  deleteItem(itemId: Number) {
    this.itemService.delete(itemId).subscribe(() => {
      this.getItems();
      this.itemService.showMessage('Item deleetado com sucesso!');
    });
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
}
