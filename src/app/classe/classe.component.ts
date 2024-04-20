import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrl: './classe.component.css'
})
export class ClasseComponent implements OnInit {

  listclass:any=[];
  public addclasseForm:any= FormGroup;
  afficheadd:any;
  afficheupdate:any;
  currentname:string='Liste des classes';
  currentindex:any;
  urlpost='classes';

  constructor(private formBuilder: FormBuilder, private crud:CrudService){}

  ngOnInit(): void {
    this.getlistclass();
    this.initaddclasseForm();
  }
  initaddclasseForm($name?:any) {
    this.addclasseForm = this.formBuilder.group({
      libelle:[$name?.libelle,Validators.required]
    });
  }
  getlistclass(){
    this.listclass=[];
    this.crud.get(this.urlpost).subscribe((data)=>{
      this.listclass=data;
    });
  }
  add(){
    this.crud.post(this.urlpost,this.addclasseForm.value).subscribe({
      next:(data:any)=>{
        this.listclass.unshift(data);
        this.action('ok');
      },
      error:(error)=>{
          alert("Erreur lors de l'ajout");
      }
    });
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
      this.crud.delete(this.urlpost,this.listclass[this.currentindex].id).subscribe({
        next:(data:any)=>{
          this.listclass.splice(this.currentindex, 1);
        },
        error:(error)=>{
          alert("Erreur au niveau de la suppression");
        }
      });
    }
    if($name=='ok'){
      this.initaddclasseForm();
    }
  }
  update(){
    this.crud.put(this.urlpost,this.addclasseForm.value,this.listclass[this.currentindex].id).subscribe({
      next:(data:any)=>{
        this.listclass[this.currentindex]=data;
        this.action('ok');
      },
      error:(error)=>{
        alert("Erreur au niveau de la modification");
      }
    });
  }
}
