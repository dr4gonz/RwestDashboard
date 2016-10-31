import {
  Component,
  OnInit,
  HostBinding
} from '@angular/core';
import {default as routerAnimations} from '../route_animations';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../slider.css'],
  animations: [routerAnimations('routeAnimations')]
})
export class HomeComponent implements OnInit {

  @HostBinding('@routeAnimations')
  public animatePage = true;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
