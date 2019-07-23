import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { NewField } from '../field.model';
/**
 * @title Table with pagination
 */

@Component({
  selector: 'app-field-list',
  templateUrl: './field-list.component.html',
  styleUrls: ['./field-list.component.css']
})
export class FieldListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'date', 'price', 'type', 'other', 'author', 'actions'];

  dataSource: MatTableDataSource<NewField>;
  listData: NewField[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private router: Router,
              private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getAllFields().subscribe(data => {
      this.listData = data;
      this.dataSource = new MatTableDataSource<NewField>(this.listData)
      this.dataSource.paginator = this.paginator;
    })
  }

  back(): void {
    this.router.navigate(['/main'])
  }
}

