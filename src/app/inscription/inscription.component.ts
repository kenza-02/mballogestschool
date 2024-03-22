import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.css'
})
export class InscriptionComponent {
  listclass=['Terminal S1','Terminal S2', 'Premiere S1','Premiere S2'];
  listeleve=[{'prenom':'Mouhamadou','nom':'MBALLO','genre':'masculin','classe':'Terminal S1','date_naiss':'2002-04-03'}
  ,{'prenom':'Aissatou','nom':'KENZA','genre':'feminin','classe':'Terminal S2','date_naiss':'2003-05-06'}];
  public addeleveForm:any= FormGroup ;
  afficheadd:any;
  afficheupdate:any;
  currentname:string='Liste des eleves';
  currentindex:any;

  constructor(private formBuilder: FormBuilder){}

  ngOnInit(): void {
    this.initaddeleveForm();
  }
  initaddeleveForm($name?:any) {
    this.addeleveForm = this.formBuilder.group({
      nom:[$name?.nom,Validators.required],
      prenom:[$name?.prenom,Validators.required],
      genre:[$name?.genre,Validators.required],
      classe:[$name?.classe,Validators.required],
      date_naiss:[$name?.date_naiss,Validators.required]
    });
  }
  add(){
    const fd={'prenom':this.addeleveForm.value.prenom,'nom':this.addeleveForm.value.nom,'genre':this.addeleveForm.value.genre,
    'classe':this.addeleveForm.value.classe,'date_naiss':this.addeleveForm.value.date_naiss};
    this.listeleve.unshift(fd);
    this.action('ok');
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
      this.listeleve.splice(this.currentindex, 1);
    }
    if($name=='ok'){
      this.initaddeleveForm();
    }
  }
  update(){
    const fd={'prenom':this.addeleveForm.value.prenom,'nom':this.addeleveForm.value.nom,'genre':this.addeleveForm.value.genre,
    'classe':this.addeleveForm.value.classe,'date_naiss':this.addeleveForm.value.date_naiss};
    this.listeleve[this.currentindex]=fd;
    this.action('ok');
  }

}
