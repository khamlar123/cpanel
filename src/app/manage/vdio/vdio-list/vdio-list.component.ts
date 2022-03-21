import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SubSink } from 'subsink';
import { VdioApiService } from '../api/vdio-api.service';

@Component({
  selector: 'app-vdio-list',
  templateUrl: './vdio-list.component.html',
  styleUrls: ['./vdio-list.component.css']
})
export class VdioListComponent implements OnInit, OnDestroy {
  private subs = new SubSink();
  vdioList: any[] = [
    {
      orderIndex: '',
      status: '',
      video_description: '',
      video_id: '',
      video_name: '',
      video_url: '',
    }
  ];

  masterVdioList: any[] = [
    {
      orderIndex: '',
      status: '',
      video_description: '',
      video_id: '',
      video_name: '',
      video_url: '',
    }
  ];

  searchValue = ''
  vdioUrl = "https://www.youtube.com/embed/"; 
  safeSrc: SafeResourceUrl[] = [];
  pos = 0;
  pageNumber = 1;
  vdioId = -1;

  vdioDetail = {
    orderIndex: "0",
    status: "0",
    video_description: "",
    video_id: "0",
    video_name: "",
    video_url: "",
  }

  updateStatus = false;
  tableCount = 10;

  constructor(
    private vdio: VdioApiService,
    private sanitizer: DomSanitizer,

  ) { }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadVdio();
  }

  loadVdio():void{
    this.subs.sink = this.vdio.loadVdio('listAllVideo').subscribe(res => {
       this.vdioList = res.data;
       this.masterVdioList = res.data;
       this.pushVdioList(res.data);
     })
   }

   pushVdioList(vdio):void{
    vdio.forEach(e => {
      this.safeSrc.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.getYoutubeUrl(e.video_url)))
    });
  }

  getYoutubeUrl(value: string): string{
    const skipLink =  value.split("?v=");
    return this.vdioUrl+skipLink[1];
  }

  deleteVdio(id):void{
    if (confirm("Are you sure to delete vdio Id" + " " + id)) {

    this.subs.sink =  this.vdio.deleteVdio('deleteVideo',id).subscribe(res => {

      if(res.status === "1"){
        this.vdioList =  this.vdioList.filter(f => f.video_id !== id)
      }
        
      },(err) => err,
      ()=> {

      })
    }

  }

  hasUpdate(value: any):void{
    const updateModal = {
      orderIndex: value.orderIndex,
      status: value.status,
      video_description: value.video_description,
      video_name: value.video_name,
      video_url: value.video_url,
      video_id : this.vdioList[this.vdioList.length -1].video_id+=1,
    }

    this.vdioList.push(updateModal);
 
      
  }

  tableCountFunc(): any{
    return (this.vdioList)? this.vdioList.slice(0, this.tableCount) : null;
   }

   searchFunc():void{
    if(this.searchValue !== ''){
        this.vdioList =  this.masterVdioList.filter(f => 
          f.video_name.includes(this.searchValue.toLocaleLowerCase()) || 
          f.video_description.includes(this.searchValue.toLowerCase())
        );
    }else{
      this.vdioList =  this.masterVdioList;
    }
  }




}
