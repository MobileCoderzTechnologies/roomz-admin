import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor(
    private $loadingService: LoadingService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.$loadingService.isLoading.next(true);

    const adminAccessToken = localStorage.getItem('adminAccessToken');
    if (adminAccessToken) {
      const Authorization = `Bearer ${adminAccessToken}`;
      req = req.clone({ setHeaders: { Authorization } });
    }
    return next.handle(req).pipe(
      delay(5),
      finalize(
        () => {
          this.$loadingService.isLoading.next(false);
        }
      )
    );
  }
}
