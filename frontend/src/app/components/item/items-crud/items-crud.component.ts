import { ItemService } from './../item.service';
import { Component, OnInit } from '@angular/core';
import { Item } from '../item';

@Component({
  selector: 'app-items-crud',
  templateUrl: './items-crud.component.html',
  styleUrls: ['./items-crud.component.scss']
})
export class ItemsCrudComponent implements OnInit {

  private item: Item = {
    id: 4,
    name: "Novo Item"
  }

  constructor(private itemService: ItemService) { 

  }

  ngOnInit(): void {
  }


  createItem() {
    this.itemService.create(this.item).subscribe(() => {
      this.itemService.showMessage('Item cadastrado com sucesso!');
    })
  }
}
