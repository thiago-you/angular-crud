import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemFakeService {

  /**
   * Fake Data Source for testing
   */
  private dataSouce = [
    {
        "id": 1,
        "name": "Lucca Feijó"
    },
    {
        "id": 2,
        "name": "Rogério do Ingá"
    },
    {
        "id": 3,
        "name": "Maurilio dos Anjos"
    },
    {
        "id": 4,
        "name": "Thiago You"
    },
    {
        "id": 5,
        "name": "Paulo Pereira"
    },
    {
        "id": 6,
        "name": "Rafael Valoto"
    },
    {
        "id": 7,
        "name": "Jonathan Vidal Braz"
    }
  ];

  constructor() {}

  create(item: Item): boolean {
    let isCreated = false;

    let maxId = 0;
    this.dataSouce.forEach(_item => {
      if (_item.id > maxId) {
        maxId = _item.id;
      }
    });
    
    if (maxId > 0) {
      isCreated = true;
      item.id = ++maxId;

      this.dataSouce.push(JSON.parse(JSON.stringify(item)));
    } else {
      isCreated = true;
      item.id = 1;

      this.dataSouce.push(JSON.parse(JSON.stringify(item)));
    }

    return isCreated;
  }

  getAll(): Item[] {
    return this.dataSouce;
  }

  get(id: number): Item {
    const item = this.dataSouce.filter(item => {
      return item.id == id;
    })[0];

    return JSON.parse(JSON.stringify(item));
  }
  
  update(item: Item): boolean {
    let isUpdated = false;

    let index = -1;
    this.dataSouce.forEach((_item, key) => {
      if (_item.id == (item.id as number)) {
        index = key;
      }
    });
    
    if (index > -1) {
      isUpdated = true;
      this.dataSouce[index] = JSON.parse(JSON.stringify(item));
    }

    return isUpdated;
  }
  
  delete(id: number): boolean {
    let isDeleted = false;

    let index = -1;
    this.dataSouce.forEach((item, key) => {
      if (item.id == id) {
        index = key;
      }
    });
    
    if (index > -1) {
      isDeleted = true;
      this.dataSouce.splice(index, 1);
    }

    return isDeleted;
  }
}
