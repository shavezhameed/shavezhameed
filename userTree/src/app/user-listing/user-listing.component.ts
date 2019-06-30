import { Component, OnInit } from '@angular/core';
import {GetusersService} from '../getusers.service';
import {NestedTreeControl} from '@angular/cdk/tree'
import {MatTreeNestedDataSource} from '@angular/material/tree'
@Component({
  selector: 'app-user-listing',
  templateUrl: './user-listing.component.html',
  styleUrls: ['./user-listing.component.scss']
})
export class UserListingComponent implements OnInit {
  public userlist:any = [];
  public newUserList = [];
  public userDetail = [];

  treeControl = new NestedTreeControl(node => node['children']);
  dataSource = new MatTreeNestedDataSource();

  constructor(private _user: GetusersService) {}

  ngOnInit() {
    this._user.getUsers().subscribe((result) => {
      this.userlist = result
      this.newUserList = this.unFlatten(this.userlist);
      this.dataSource.data = this.newUserList;
    });
  }

// create an array with a new property children

unFlatten(users){
    let userTree = [],
     mappedUserArr = {},
     userElem,
     mappedUserElem; 

// create a hash table
for(let i = 0; i < users.length; i++) {
  userElem = users[i];
  mappedUserArr[userElem.id] = userElem;
  mappedUserArr[userElem.id]['children'] = [];
}
for (let id in mappedUserArr) {
  if (mappedUserArr.hasOwnProperty(id)) {
    mappedUserElem = mappedUserArr[id];
    if (mappedUserElem.parentId !=0) {
      mappedUserArr[mappedUserElem['parentId']]['children'].push(mappedUserElem);
    }
    else {
      userTree.push(mappedUserElem);
    }
  }
}
return userTree;
  }

hasChild = (_: number, node) => !!node['children'] && node['children'].length > 0;

displayDetail(user){
    this.userDetail = user;
}

}
