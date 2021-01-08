import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../user/user.class';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
user:User = new User();

  constructor(private authSvc: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onRegister(){
    const user= await this.authSvc.onRegister(this.user).then(res=>{
      console.log("Creado existosamente");
      this.router.navigateByUrl('/');
      alert("¡Se ha creado el usuario " + this.user.email + "!");
    }).catch(err=>alert('Datos incorrectos'));
  
  }
}
