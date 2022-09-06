import { Component, OnInit } from '@angular/core';
import { PatientData } from '../PatientData';
import { ActivatedRoute, Router } from '@angular/router';

const server_url = "http://localhost:3001/"
const images_path = "http://localhost:3001/images/"

@Component({
  selector: 'app-actualizar-registro',
  templateUrl: './actualizar-registro.component.html',
  styleUrls: ['./actualizar-registro.component.css']
})
export class ActualizarRegistroComponent implements OnInit {


  public patient: PatientData;
  id: any;

  constructor(private route: ActivatedRoute, private router: Router) { 
    this.patient = new PatientData('', '', 0, '', '', '');
  }
  
  ngOnInit(): void {

    this.route.paramMap.subscribe(params => { this.id = params.get('id') })
    fetch(server_url + 'patients/findOneById', {
      method: 'POST',
      body: JSON.stringify({ 'id': this.id }),
      headers: { 'Content-Type': 'application/json' }
    }).then(res => {
      res.json().then(res => {
        this.patient.nombre = res.data.nombre
        this.patient.edad = res.data.edad
        this.patient.rut = res.data.rut
        this.patient.enfermedad = res.data.enfermedad
        this.patient.fotoPersonal = res.data.fotoPersonal
        this.patient.sexo = res.data.sexo
        // console.log(res.data)
      })
    }).catch(err => { console.log(err) })
  }

  submit (){
    let data = {'id':this.id, 'rut':this.patient.rut, 'nombre':this.patient.nombre, 'edad':this.patient.edad, 'sexo':this.patient.sexo, 'enfermedad':this.patient.enfermedad}
    fetch(server_url + 'patients/update', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
  }).then(() => {
    this.router.navigateByUrl('/resgistro/detalle/' + this.id)
      
  }).catch(err => { console.log(err)})
  }

}
