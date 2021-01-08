import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController} from "@ionic/angular";
import { NavController } from "@ionic/angular";
import { PeliculasService, pelis } from '../services/peliculas.service';
import { ActivatedRoute} from '@angular/router';

import {PeliculasInterfaz} from '../../models/peliculas.interface';
@Component({
  selector: 'app-info-pelis',
  templateUrl: './info-pelis.page.html',
  styleUrls: ['./info-pelis.page.scss'],
})
export class InfoPelisPage implements OnInit {
  peli:PeliculasInterfaz={
    id:'',
    Titulo:'',
    Genero:'',
    Duracion:'',
    Director:'',
    Descripcion:'',
    Calificacion:'',
    img:''
      }
      peliId=null;
  constructor(private route: ActivatedRoute, private nav: NavController, private peliservice: PeliculasService) { }
 
 
  ngOnInit() {
   
    this.peliId = this.route.snapshot.params['id'];
    if (this.peliId){
     
      this.loadTodo();
    } 
    
  }
  async loadTodo(){
   console.log(this.peliId);
this.peliservice.getTodo(this.peliId).subscribe(peli => {
       
      this.peli = peli;
  
    });
  }

  close(){
    this.nav.navigateForward('home');
  }

  async guardatfav(){
  console.log(this.peliId)
  if(this.peliId){
   
    this.peliservice.AddFavPelicula(this.peli, this.peliId).then(()=>{

    })
  }
}

  async savePelis(peliId){
    this.peliId = this.route.snapshot.params['id'];

    if(this.peliId){
      this.peliservice.updatePelicula(this.peli,this.peliId).then(()=>{
    
        this.nav.navigateForward('home');
      })
 
    }else{
      this.peliservice.addPelicula(this.peli).then(()=>{
  
       this.nav.navigateForward('home');
       });}
  }

  async RemovePeli() {
  
    this.peliservice.remove(this.peliId );
 
    this.nav.navigateForward('home');
  }
}