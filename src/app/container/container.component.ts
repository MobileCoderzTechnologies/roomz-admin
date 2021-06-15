import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CHANGE_PASSWORD_ROUTE, DASHBOARD_ROUTE, LOGIN_ROUTE, USER_ROUTE } from '../constants/route.constants';
import { DialogService } from '../modules/dialog/service/dialog.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, AfterViewInit {

  dashboardRoute = DASHBOARD_ROUTE;
  userRoute = USER_ROUTE;
  changePasswordRoute = CHANGE_PASSWORD_ROUTE;

  mode = 'side';
  opened = true;

  isLoading = false;
  isHandset = new BehaviorSubject<boolean>(false);
  @ViewChild('drawer') drawer: MatDrawer;
  constructor(
    private $loader: LoadingService,
    private $router: Router,
    private $dialogService: DialogService
  ) {
    if (window.innerWidth < 980) {
      this.isHandset.next(true);
    }
    fromEvent(window, 'resize').subscribe(data => {
      if (window.innerWidth < 980) {
        this.isHandset.next(true);
      } else {
        this.isHandset.next(false);
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.isHandset
      .pipe(
        delay(0)
      )
      .subscribe((data) => {
        if (data) {
          this.mode = 'over';
          this.opened = false;
        } else {
          this.mode = 'side';
          this.opened = true;
        }
      });
  }

  onClickRoomzLogo(): void {
    if (this.mode === 'over') {
      this.drawer.toggle();
    }
  }


  logOut(): void {
    this.$dialogService.confirm(
      status => {
        if (status) {
          localStorage.removeItem('adminAccessToken');
          this.$router.navigateByUrl(LOGIN_ROUTE.url);
        }
      },
      'Are you sure?'
    );
  }

}
