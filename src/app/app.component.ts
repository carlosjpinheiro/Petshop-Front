import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Pet } from './pet';
import { PetService } from './pet.service';
import { PetAddCliente } from './petaddcliente';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Petshop Enterra Osso';
  
  public pets: Pet[];
  public editPetNr: number = 0;
  public editingPet = false;

  public clientes: Cliente[];
  public editClienteNr: number = 0;
  public editingCliente = false;

  public clienteToPetModel: PetAddCliente = {
    clienteID:'',
    petId:''
  }

  tipoTratamento = [
    "BANHO",
    "TOSA",
    "ADESTRAMENTO",
    "VETERINARIO",
    "EXAME",
    "VACINA"
  ]

  constructor(
    private petService: PetService,
    private clienteService: ClienteService
  ) {}

  ngOnInit(): void{
    this.getPets();
    this.getClientes();
  }

  //CRUD dos pets

  public getPets():void{
    this.petService.getPets().subscribe(
      (response: Pet[])=>{
        this.pets = response;
      }, (error: HttpErrorResponse) => {alert(error.message)}
    )
  }

  public onAddPet(addForm: NgForm): void{
    this.petService.addPet(addForm.value).subscribe(
      (response: Pet)=>{
        console.log(response);
        this.getPets();     
        addForm.reset();   
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public onUpdatePet(addForm: NgForm): void{
    addForm.value["id"] = this.pets[this.editPetNr].id
    this.petService.updatePet(addForm.value).subscribe(
      (response: Pet)=>{
        console.log(response);
        this.getPets();     
        addForm.reset();   
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public onDeletePet(): any{
    this.petService.deletePet(this.pets[this.editPetNr].id).subscribe(
      (response: any)=>{
        this.getPets();        
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  
  public onSetClienteToPet(clienteId: string, petId: string){    
    this.clienteToPetModel.clienteID = clienteId
    this.clienteToPetModel.petId = petId
    
    this.petService.addClienteToPet(this.clienteToPetModel).subscribe(
      (response: Pet)=>{
        console.log(response);
        this.getPets();
        alert(`${response.nome} vinculado a ${response.clienteResponsavel.nome} com sucesso!`)
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )

  }

  //CRUD dos clientes

  public getClientes():void{
    this.clienteService.getClientes().subscribe(
      (response: Cliente[])=>{
        this.clientes = response;
      }, (error: HttpErrorResponse) => {alert(error.message)}
    )
  }

  public onAddCliente(addForm: NgForm): void{
    this.clienteService.addCliente(addForm.value).subscribe(
      (response: Cliente)=>{
        console.log(response);
        this.getClientes();     
        addForm.reset();   
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public onUpdateCliente(addForm: NgForm): void{
    addForm.value["id"] = this.clientes[this.editClienteNr].id
    this.clienteService.updateCliente(addForm.value).subscribe(
      (response: Cliente)=>{
        console.log(response);
        this.getClientes();     
        addForm.reset();   
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  public onDeleteCliente(): any{
    this.clienteService.deleteCliente(this.clientes[this.editClienteNr].id).subscribe(
      (response: any)=>{
        this.getClientes();        
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }

  // metodos acessórios

  public pegaDono(pet: Pet | null): string{

    if(!pet?.clienteResponsavel || pet == null) {
      return '';
    } else {
      return pet.clienteResponsavel.nome;
    }
  }

  public lancaPetForm(p: string){
    this.editingPet = true;
    this.editPetNr = parseInt(p)   
    
  }

  public lancaClienteForm(p: string){
    this.editingCliente = true;
    this.editClienteNr = parseInt(p)
    console.log(this.clientes[this.editClienteNr].nome);
    
  }

  public limpaFormPet(addForm: NgForm){
    addForm.reset();
  }

  public limpaFormCliente(addFormCliente: NgForm){    
    addFormCliente.reset();
  }
  
  public onOpenModal(): void{
    const container = document.querySelector('#main-container')
    
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-primary'
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle','modal');
    button.setAttribute('data-bs-target','#setClienteToPetModal');  
    
    container?.appendChild(button);
    button.click();
  }


}
