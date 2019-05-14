import { Component, OnInit, Input } from '@angular/core'
import { Globals } from 'src/core/_helpers/globals';

@Component({
  selector: 'msg-table-empthy',
  templateUrl: './msg-table-empthy.component.html'
})
export class MsgTableEmpthyComponent implements OnInit {
  msg:string;
  constructor(private _global:Globals) { 
    this.msg=_global.empthyTable
  }

  ngOnInit() {
  }

}
