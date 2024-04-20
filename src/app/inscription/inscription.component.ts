import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  listclass:any=[];
  listeleve:any=[];
  public addeleveForm:any= FormGroup ;
  afficheadd:any;
  afficheupdate:any;
  currentname:string='Liste des eleves';
  currentindex:any;
  urlpost='inscriptions';

  constructor(private formBuilder: FormBuilder,private crud:CrudService){}

  ngOnInit(): void {
    this.initaddeleveForm();
    this.getlisteleve();
    this.getlistclass();
  }
  getlistclass(){
    this.listclass=[];
    this.crud.get('classes').subscribe((data)=>{
      this.listclass=data;
    });
  }
  getlisteleve(){
    this.listeleve=[];
    this.crud.get(this.urlpost).subscribe((data)=>{
      this.listeleve=data;
    });
  }
  initaddeleveForm($name?:any) {
    this.addeleveForm = this.formBuilder.group({
      nom:[$name?.nom,Validators.required],
      prenom:[$name?.prenom,Validators.required],
      genre:[$name?.genre,Validators.required],
      classe:[$name?.classe?._id,Validators.required],
      date_naiss:[$name?.date_naiss,Validators.required]
    });
  }
  add(){
    this.crud.post(this.urlpost,this.addeleveForm.value).subscribe({
      next:(data:any)=>{
        this.listeleve.unshift(data);
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
      this.currentname='Ajouter un eleve';
    }
    if($name=='update'){
      this.currentname='Modifier un eleve';
      this.currentindex=$val;
      this.initaddeleveForm(this.listeleve[this.currentindex]);
      this.afficheupdate='ok';
    }
    if($name=='delete'){
      this.currentindex=$val;
      this.crud.delete(this.urlpost,this.listeleve[this.currentindex].id).subscribe({
        next:(data:any)=>{
          this.listeleve.splice(this.currentindex, 1);
        },
        error:(error)=>{
          alert("Erreur au niveau de la suppression");
        }
      });
    }
    if($name=='ok'){
      this.initaddeleveForm();
    }
  }
  update(){
    this.crud.put(this.urlpost,this.addeleveForm.value,this.listeleve[this.currentindex].id).subscribe({
      next:(data:any)=>{
        this.listeleve[this.currentindex]=data;
        this.action('ok');
      },
      error:(error)=>{
        alert("Erreur au niveau de la modification");
      }
    });
  }

}
