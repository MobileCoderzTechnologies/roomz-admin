import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { PROPERTY_STATUS } from 'src/app/constants/property.constant';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { DialogService } from 'src/app/modules/dialog/service/dialog.service';
import { PROPERTY_DETAIL_ROUTE } from '../../constants/route.constant';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {

  propertyDetailRoute = PROPERTY_DETAIL_ROUTE;

  properties: any[];
  totalProperties = 1;

  // tslint:disable-next-line: max-line-length
  columnToDisplay = ['sn', 'image', 'name', 'city', 'no_of_beds', 'no_of_bedrooms', 'no_of_bathrooms', 'no_of_guests', 'moreInfo', 'action'];

  page = 1;
  limit = 10;
  sort = '';
  search = '';

  isLoading = false;
  totalCount = 0;



  searchElement: HTMLElement;
  constructor(
    private $propertyService: PropertyService,
    private $alert: AlertService,
    private $dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.getPropertyList();
  }

  private getPropertyList(): void {
    this.isLoading = true;
    this.$propertyService.getPropertyList(
      this.page,
      this.limit,
      this.sort,
      this.search
    ).subscribe(data => {
      this.properties = data.properties.data;
      this.totalCount = data.properties.meta.total;
      this.properties = this.properties.map(e => {
        if (e.status === PROPERTY_STATUS.blocked) {
          e.status = false;
        }
        else {
          e.status = true;
        }
        return e;
      });
      this.totalProperties = data.properties.meta.total;
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }


  onSearch(search: string): void {
    this.search = search;
    this.getPropertyList();
  }

  pageChange(event: PageEvent): void {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getPropertyList();
  }

  sortChange(sort: Sort): void {
    const sortBy = sort.active;
    if (sort.direction === 'asc') {
      this.sort = sortBy;
    } else if (sort.direction === 'desc') {
      this.sort = `-${sortBy}`;
    } else {
      return;
    }
    this.getPropertyList();
  }

  // statusChange(isActive: boolean, propertyId: string): void {
  //   this.$propertyService.toggleStatusOfProperty(propertyId).subscribe(data => {
  //     this.$alert.success(data.message);
  //     this.getPropertyList();
  //   });
  // }

  deleteUser(propertyId: string): void {
    this.$dialogService.confirm(
      (status) => {
        if (status) {
          this.deleting(propertyId);
        }
      },
      'Are You Sure?',
      'It will permanently deleted !'
    );
  }

  deleting(propertyId: string): void {
    this.$propertyService.deleteProperty(propertyId).subscribe(data => {
      this.$alert.info(data.message);
      this.getPropertyList();
    });
  }

}
