import { Component, OnInit } from '@angular/core';
import * as http from '@angular/common/http';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
  imports:[FormsModule,NgFor ]
})
export class DynamicFormComponent implements OnInit {
  camposDoForm: any[] = [];
  formData: any = {};

  constructor(private http: http.HttpClient) { }

  ngOnInit(): void {
    console.log('Inicializando DynamicFormComponent...');
    this.http.get<any>('https://restcountries.com/v3.1/all').subscribe(
      data => {
        console.log('Dados recebidos:', data);
        const firstCountry = data[0];
        this.camposDoForm = Object.keys(firstCountry).map(key => ({
          tipo: 'text',
          nome: key,
          rotulo: key
        }));
      },
      error => {
        console.error('Erro ao buscar dados da API:', error);
      }
    );
  }

  submitForm() {
    console.log('Formulário enviado com sucesso!', this.formData);
  }
}
