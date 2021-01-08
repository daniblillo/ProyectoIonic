import { Component, OnInit } from '@angular/core';
import { PeliculasService, pelis } from '../services/peliculas.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from "@ionic/angular";
import { PeliculasInterfaz } from '../../models/peliculas.interface';
@Component({
  selector: 'app-agregar-peliculas',
  templateUrl: './agregar-peliculas.page.html',
  styleUrls: ['./agregar-peliculas.page.scss'],
})
export class AgregarPeliculasPage implements OnInit {

  peli:PeliculasInterfaz={
   
  Titulo:'',
  Genero:'',
  Duracion:'',
  Director:'',
  Descripcion:'',
  Calificacion:'',
  img:''
  }
peliId= null;

  constructor(private route:ActivatedRoute, private nav:NavController, private peliservice:PeliculasService,
    private loading: LoadingController) { }

  ngOnInit() {
    this.peliId=this.route.snapshot.params['id'];
  
  }
  close(){
    this.nav.navigateForward('/home');
  }
 async savePelis(peliId){

console.log(peliId+"id");
   if(this.peliId){
     this.peliservice.updatePelicula(this.peli, this.peliId).then(()=>{

       this.nav.navigateForward('/');
     })

   }else{
      this.peliservice.addPelicula(this.peli).then(()=>{

      this.nav.navigateForward('/home');
      });}
 }

  async onRemoveTo(idTodo:string) {
    this.peliservice.remove(idTodo);
  }

  async loadTodo(){
    const loading = await this.loading.create({
      message: 'Loading....'
    });
    await loading.present();

    this.peliservice.getTodo(this.peliId).subscribe(peli => {
      loading.dismiss();
      this.peli=peli;
    });
  }

}