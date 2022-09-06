import { Component, OnInit } from '@angular/core';

const server_url = "http://localhost:3001/"
const images_path = "http://localhost:3001/images/"

@Component({
  selector: 'app-listar-registros',
  templateUrl: './listar-registros.component.html',
  styleUrls: ['./listar-registros.component.css']
})
export class ListarRegistrosComponent implements OnInit {

  public patients: any = []

  constructor() { }

  ngOnInit(): void {

    fetch(server_url + 'patients', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      res.json().then(res => {
        this.patients = res.data
      //  console.log(this.patients)
        
      })
    }).catch(err => { console.log(err) })
  }

}
