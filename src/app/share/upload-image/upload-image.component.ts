import { Component, OnInit,Input ,Output, EventEmitter,ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent implements OnInit {

  
  @Input() old_image:string = '';
  public new_image:any;
  @Output() image = new EventEmitter<any>();

  
  @ViewChild('FileSelectInputDialog') FileSelectInputDialog:any;

  public OpenAddFilesDialog() {
   
    const e: HTMLElement = this.FileSelectInputDialog.nativeElement;
    e.click();
  } 
  changeFileListener(event:any){

    if(event.target.files.length){
      this.handleReaderLoaded(event);
    }
    
  }

  handleReaderLoaded(e:any) {
   
 
   var file = e.target.files[0];
   var myReader = new FileReader();
 
   if(this.new_image){
     this.new_image={};
   }
 
   myReader.onloadend = (e) => {
     
     this.new_image = { name: file.name, type: file.type, lastModified: file.lastModified, size: file.size, img: myReader.result?.toString()  };
      
      setTimeout(() => {
        this.image.emit(this.new_image);
        console.log('emit');
        
      }, 100);
     
     
   }
 
   myReader.readAsDataURL(file);
 }


  constructor() { }

  ngOnInit(): void {
  }




}

