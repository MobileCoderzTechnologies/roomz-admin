import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private $http: HttpService
  ) { }


  getPropertyList(
    page: number = 1,
    pageSize: number,
    sort: string,
    search?: string): Observable<PropertyList> {
    let params = new HttpParams();
    params = params.set('page', page.toString());
    params = params.set('pageSize', pageSize.toString());
    params = params.set('sort', sort);
    if (search) {
      params = params.set('search', search);
    }
    return this.$http.get('property-list', params);
  }

  deleteProperty(propertyId: string): Observable<{ message: string, status: number }> {
    return this.$http.delete(`delete-property/${propertyId}`);
  }

  toggleStatusOfProperty(propertyId: string, status: number): Observable<{ status: number, message: string }> {
    return this.$http.put(`block-property/${propertyId}`, { status });
  }

  getPropertyDetails(id: number): Observable<any> {
    return this.$http.get(`property-details/${id}`);
  }
}

// interface UserList {
//   'users': User[];
//   'totalNumber': number;
//   'perPage': number;
//   'currentPage': number;
//   'firstPage': number;
//   'isEmpty': boolean;
//   'totalPages': number;
//   'lastPage': number;
//   'hasMorePages': boolean;
//   'hasPages': boolean;
// };

interface PropertyList {
  'properties': {
    'meta': {
      'total': number;
      'per_page': number;
      'current_page': number;
      'last_page': number;
      'first_page': number;
    };
    'data': any;
  };
}
