import { Component, OnInit, Inject } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import {RolePermissionService} from '../../../services/role-permission/role-permission.service';
import swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'ngx-admin-role-permission',
  templateUrl: './admin-role-permission.component.html',
  styles: [`
    nb-card {
      transform: translate3d(0, 0, 0);
    }
  `],
})
export class AdminRolePermissionComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public myForm: FormGroup;
  public editForm: FormGroup;

  id: number;
  data: any[];
  model: any;
  dataPermission: any[];
  item: any[];
  rolePermission: any = {};

  constructor(private roleService: RolePermissionService, private fb: FormBuilder) { }

  ngOnInit() {
    this.roleService.getRole().subscribe(data => {
      this.data = data.roles;
      this.dtTrigger.next();
      // console.log(data);
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      language: {
        'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json',
      },
    };
    this.roleService.getPermission().subscribe( data => {
      this.dataPermission = data.permission;
      // console.log(data);
    });
    this.myForm = this.fb.group({
      id: [null, Validators.required],
      name: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(4)]],
      display_name: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(4)]],
      description: [null],
      permission: this.fb.array([]),
    });
    this.editForm = this.fb.group({
      id: [null, Validators.required],
      name: [null, [Validators.required, Validators.maxLength(15), Validators.minLength(4)]],
      display_name: [null, [Validators.required, Validators.maxLength(20), Validators.minLength(4)]],
      description: [null],
      permission: this.fb.array([]),
    });
  }
  post(model: any) {
    // console.log(model);
    /*this.roleService.postRolePermission(model).subscribe( data => {
      console.log(data);
      this.data.push(data.role);
      $('#myModal').modal('hide');
      swal('¡Buen trabajo!', '¡Hiciste clic en el botón!', 'success');
    });
    this.myForm.reset();*/
  }
  onChange(per: string, isChecked: boolean) {
    const perFormArray = <FormArray>this.myForm.controls.permission;

    if (isChecked) {
      perFormArray.push(new FormControl(per));
    } else {
      const index = perFormArray.controls.findIndex(x => x.value == per);
      perFormArray.removeAt(index);
    }
  }
  onChangeEdit(per: string, isChecked: boolean) {
    const perFormArray = <FormArray>this.editForm.controls.permission;

    if (isChecked) {
      perFormArray.push(new FormControl(per));
    } else {
      const index = perFormArray.controls.findIndex(x => x.value == per)
      perFormArray.removeAt(index);
    }
  }
  show(formData) {
    // console.log('formData', formData);
    const perFormArray = <FormArray>this.editForm.controls.permission;
    this.id = formData.id;
    this.editForm.controls['id'].setValue(formData.id);
    this.editForm.controls['name'].setValue(formData.name);
    this.editForm.controls['display_name'].setValue(formData.display_name);
    this.editForm.controls['description'].setValue(formData.description);
  }
  remove(model: any) {
    this.id = model.id;
    const index = this.data.indexOf(model);
    swal({
      title: '¿Estás seguro?',
      text: 'Una vez eliminada, ¡no podrá recuperar este archivo!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, ¡bórralo!'
    }).then((willDelete) => {
      if (willDelete.value) {
        this.roleService.deleteRole(this.id).subscribe(data => {
          // console.log(data);
          if (index > -1) {
            this.data.splice(index, 1);
          }
           swal(
            'Poof!',
            '¡Tu archivo ha sido eliminado!',
            'success'
          )
        });
      }
    });
  }
}
