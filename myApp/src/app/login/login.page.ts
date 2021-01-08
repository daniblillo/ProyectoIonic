import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User} from '../user/user.class';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
user: User = new User();
  constructor(private router:Router, private service: AuthService) { }

  ngOnInit() {
  }

  async onLogin(){
    const user = await this.service.onLogin(this.user).then(res=>{
  
        console.log("Sesión iniciada");
        this.router.navigateByUrl('home');
      
    }  ).catch(err=>alert('Datos incorrectos'));

  }

  ionViewWillEnter() {
    

  }
}
