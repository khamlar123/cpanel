import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { MainService } from 'src/service/main.service';


@Injectable({
  providedIn: 'root'
})
export class VdioApiService {
  private vdioUrl = this.service.getEnpoin() + '/api/video.api.php';


  constructor(
    private http: HttpClient,
    private service: MainService
    ) { }


  protected header(method: string):any{
    const token = localStorage.getItem("token")
    const headers = new HttpHeaders({'content-type': 'application/json', 'Content-Type': 'multipart/form-data;'})

    .set('token', token+'')
    .set('method', method);
    return headers;
  }

  loadVdio(method: string):Observable<any>{
    const pram = {
    }
    return this.http.post(this.vdioUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')));
  }

  deleteVdio(method: string, id: string):Observable<any>{
    const pram = {
      "video_id":id
    }
    return this.http.post(this.vdioUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')));
  }

  addNewVdio(method: string, model: any):Observable<any>{
    return this.http.post(this.vdioUrl,model, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')));
  }

  getVdioDetail(method: string, id: string):Observable<any>{
    const pram = {
      "video_id":id
    }
    return this.http.post(this.vdioUrl,pram, {headers:this.header(method)})
    .pipe(catchError((err) => of ('server error')));
  }


  addNewVdioFile(method: string, model:any, file: File):Observable<any>{

    const status = 1;
    const addNewModel = new FormData();
    addNewModel.append('file', file);
    addNewModel.append('video_description', model.video_description);
    addNewModel.append('video_name', model.video_name);
    addNewModel.append('status', status.toString());
    addNewModel.append('orderIndex', model.orderIndex.toString());
    addNewModel.append('video_url', model.video_url);

    const token = localStorage.getItem("token")
    const httpParams = new HttpHeaders().set('token' , `${token}`).set('Method', `${method}`)


    return this.http.post<any>(this.vdioUrl, addNewModel,  {headers: httpParams}).pipe(take(1));
  }


}
