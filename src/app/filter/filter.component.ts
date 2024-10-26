import { Component, Input, Output, EventEmitter, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShipInfo } from '../user';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() resetTrigger: boolean = false;

  @Input() shipData: ShipInfo[] = [];
  @Output() filterChange = new EventEmitter<any>();

  filterCriteria = {
    from_: null,
    to: null,
    location: null,
    nameOfShip: null,
    severity: null,
    supportNeededBool: null,
  };

  uniqueFrom: string[] = [];
  uniqueTo: string[] = [];
  uniqueLocation: string[] = [];
  uniqueNameOfShip: string[] = [];

  ngOnInit(): void {
    this.populateUniqueOptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('he')
    if (changes['resetTrigger'] && changes['resetTrigger'].currentValue) {
      console.log(changes['restTrigger'])
      this.resetFilter();
    }
  }

  populateUniqueOptions(): void {
    this.uniqueFrom = [...new Set(this.shipData.map(ship => ship.from_))].filter(Boolean);
    this.uniqueTo = [...new Set(this.shipData.map(ship => ship.to))].filter(Boolean);
    this.uniqueLocation = [...new Set(this.shipData.map(ship => ship.location))].filter(Boolean);
    this.uniqueNameOfShip = [...new Set(this.shipData.map(ship => ship.nameOfShip))].filter(Boolean);
  }

  applyFilter(): void {
    this.filterChange.emit(this.filterCriteria);
  }

  resetFilter(): void {
    this.filterCriteria = {
      from_: null,
      to: null,
      location: null,
      nameOfShip: null,
      severity: null,
      supportNeededBool: null,
    };
    this.applyFilter(); 
  }
}
