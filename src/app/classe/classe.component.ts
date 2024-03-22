import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.css'
})
export class ClasseComponent implements OnInit {

  listclass=['Terminal S1','Terminal S2', 'Premiere S1','Premiere S2'];
  public addclasseForm:any= FormGroup;
  afficheadd:any;
  afficheupdate:any;
  currentname:string='Liste des classes';
  currentindex:any;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initaddclasseForm();
  }
  initaddclasseForm($name?:any) {
    this.addclasseForm = this.formBuilder.group({
      libelle:[$name,Validators.required]
    });
  }
  add(){
    this.listclass.unshift(this.addclasseForm.value.libelle);
    this.action('ok');
  }
  action($name:any,$val?:any){
    this.afficheadd=undefined;
    this.afficheupdate=undefined;
    this.currentindex=undefined;
    if($name=='add'){
      this.afficheadd='ok';
      this.currentname='Ajouter une classe';
    }
    if($name=='update'){
      this.currentname='Modifier une classe';
      this.currentindex=$val;
      this.initaddclasseForm(this.listclass[this.currentindex]);
      this.afficheupdate='ok';
    }
    if($name=='delete'){
      this.currentindex=$val;
      this.listclass.splice(this.currentindex, 1);
    }
    if($name=='ok'){
      this.initaddclasseForm();
    }
  }
  update(){
    this.listclass[this.currentindex]=this.addclasseForm.value.libelle;
    this.action('ok');
  }
}
