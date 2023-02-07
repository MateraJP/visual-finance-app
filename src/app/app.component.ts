import { Component } from '@angular/core';
import { LayerService } from './services/layer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'visual-financeiro-app';

  constructor(render: LayerService) {}
}
