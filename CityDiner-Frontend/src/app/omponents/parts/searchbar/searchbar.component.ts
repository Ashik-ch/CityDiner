import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  searchTerm = ''

  constructor(activateRoute: ActivatedRoute, private route: Router) {
    activateRoute.params.subscribe(params => {
      if (params['searchTerm']) this.searchTerm = params['searchTerm'];
    })
  }

  ngOnInit(): void { }

  search(searchs: string): void {
    if (searchs) this.route.navigateByUrl('/search/' + searchs)
    else this.route.navigateByUrl('/search')
  }

}
