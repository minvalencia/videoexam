import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  videos: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  nextPage: string = 'http://';
  url = '';
  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit() {
    this.fetchVideos();
  }

  fetchVideos() {
    if(this.searchTerm == ''){
      this.url = `/titles/x/upcoming?page=${this.currentPage}&limit=${this.pageSize}`;
    }else{
      this.url = `/titles/search/title/${this.searchTerm}?page=${this.currentPage}&limit=${this.pageSize}`;
    }
    console.log(this.url);
    this.videoService.getVideos(this.url).subscribe(
      (response: any) => {
        console.log(response)
        this.videos = [];
        this.videos = response.results;
        this.currentPage = response.page;
        this.nextPage = response.next;
      },
      (error) => {
        console.error('Failed to fetch videos:', error);
      }
    );
  }

  goToDetails(id: string) {
    this.router.navigate(['/videos', id]);
  }

  loadMoreVideos(){
    this.url = this.nextPage;
    this.videoService.getVideos(this.url).subscribe(
      (response: any) => {
        console.log(response)
        this.videos = this.videos.concat(response.results);
        this.currentPage = response.page;
        this.nextPage = response.next;
      },
      (error) => {
        console.error('Failed to fetch videos:', error);
      }
    );
  }

  onScroll() {
    this.loadMoreVideos();
  }
}
