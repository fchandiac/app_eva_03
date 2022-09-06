import { Component, OnInit } from '@angular/core';
import { PatientData } from '../PatientData';
import { ActivatedRoute, Router } from '@angular/router';

const server_url = "http://localhost:3001/"
const images_path = "http://localhost:3001/images/"

@Component({
  selector: 'app-detalle-registro',
  templateUrl: './detalle-registro.component.html',
  styleUrls: ['./detalle-registro.component.css']
})
export class DetalleRegistroComponent implements OnInit {


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
        this.patient.sexo = res.data.sexo
        this.patient.enfermedad = res.data.enfermedad
        this.patient.fotoPersonal = res.data.fotoPersonal
        // console.log(res.data)
      })
    }).catch(err => { console.log(err) })
  }

  destroy() {
    fetch(server_url + 'patients', {
      method: 'DELETE',
      body: JSON.stringify({ 'id': this.id }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(()=> {
      this.router.navigateByUrl('registro/listar-todos')
    })
    .catch(err => {console.log(err)})
  }
   
  


}
