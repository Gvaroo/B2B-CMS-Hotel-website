import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-image-gallery-dialog',
  templateUrl: './image-gallery-dialog.component.html',
  styleUrls: ['./image-gallery-dialog.component.css'],
})
export class ImageGalleryDialogComponent implements OnInit {
  item: Observable<any>;
  defaultImage: string = this.data.defaultImage;
  defaultImageId: number = 0;
  images: any[] = [];
  maxLength: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<ImageGalleryDialogComponent>,
    private auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getImages().subscribe((item: any) => {
      this.images = item.images;
      this.maxLength = this.images.length;
      for (var i = 0; i < this.images.length; i++) {
        if (this.images[i] == this.defaultImage) {
          this.defaultImageId = i;
          break;
        }
      }
    });
  }

  getImages() {
    return (this.item = this.auth.afs
      .collection('users')
      .doc(this.data.id)
      .collection('hotels')
      .doc(this.data.hotelName)
      .valueChanges());
  }
  navigateNext() {
    this.defaultImageId++;
    if (this.defaultImageId == this.images.length) {
      this.defaultImageId = 0;
    }
  }
  navigateBefore() {
    this.defaultImageId--;
    if (this.defaultImageId < 0) {
      this.defaultImageId = 0;
    }
  }
  closeDialog() {
    this.matDialogRef.close();
  }
}
