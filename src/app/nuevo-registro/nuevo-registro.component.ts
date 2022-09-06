import { Component, OnInit } from '@angular/core';
import { PatientData } from '../PatientData';
import { Router } from '@angular/router';

const server_url = "http://localhost:3001/"
const images_path = "http://localhost:3001/images/"


@Component({
  selector: 'app-nuevo-registro',
  templateUrl: './nuevo-registro.component.html',
  styleUrls: ['./nuevo-registro.component.css']
})
export class NuevoRegistroComponent implements OnInit {

  public patient: PatientData;
  public img: any = []



  constructor(private router: Router) {
    this.patient = new PatientData('', '', 0, '', '', '');
  }


  ngOnInit(): void { }

  submit() {
    const formData = new FormData()
    formData.append('file', this.img[0])
    console.log(this.img)
    fetch(server_url + 'patients/uploadImage', { method: 'POST', body: formData })
      .then(res => {
        res.json().then(res => {
          let url = images_path + res.filename

          let data = {
            'rut': this.patient.rut,
            'nombre': this.patient.nombre,
            'edad': this.patient.edad,
            'sexo': this.patient.sexo,
            'fotoPersonal': url,
            'enfermedad': this.patient.enfermedad
          }

          fetch(server_url + 'patients', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
          })
            .then(() => {
              this.router.navigateByUrl('registro/listar-todos')
            })
            .catch(err => { console.log(err) })
        })
          .catch(err => { console.log(err) })
      })
      .catch(err => { console.log(err) })
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0]
    this.img.push(file)
    console.log(file)

  }
}

