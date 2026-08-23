import { Component } from '@angular/core';
import { Menu } from '../../components/menu/menu';
import { Header } from '../../components/header/header';

@Component({
  imports: [Menu, Header],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
