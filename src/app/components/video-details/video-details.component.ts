import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';
@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {
  video: any;

  constructor(private videoService: VideoService, private route: ActivatedRoute) {}
  id: string = '';
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    this.videoService.getVideoById(this.id).subscribe(
      (response: any) => {
        console.log(response);
        this.video = response.results;
      },
      (error) => {
        console.error('Failed to fetch video details:', error);
      }
    );
  }
}
