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

  constructor(private itemService: ItemService) { 

  }

  ngOnInit(): void {
    this.itemService.getAll().subscribe(items => {
      this.items = items;
    });
  }


  createItem() {
    this.itemService.create(this.item).subscribe(() => {
      this.itemService.showMessage('Item cadastrado com sucesso!');
    })
  }
}
