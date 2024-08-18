import { HttpClient, HttpResponse } from '@angular/common/http';
import { ElementRef, Injectable, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { ModalService } from './modal/modal.service';

@Injectable({
  providedIn: 'root'
})
export class FileViewService {
  displayImage
  displayPdf
  private modalService$: ModalService
  constructor(
    private http: HttpClient,
    private dom: DomSanitizer

  ) { }
  /**
  * view file
  */
  @ViewChild('contentimglg') contentimglg: ElementRef;
  @ViewChild('contentpdflg') contentpdflg: ElementRef;
  @ViewChild('editorShowFormModal') editorShowFormModal: ElementRef
  
  viewEditorContent(content){
    this.modalService$.openLg(this.editorShowFormModal)
  }

  viewFile(baseUrl) {
    let type = 'ir';
    let fileExtension = baseUrl.split('.')[1]
    this.withoutApiHit(fileExtension,baseUrl)
    // this.http.get(`${environment.url}${baseUrl}`)
    //   .subscribe((data: HttpResponse<Blob>) => {
    //     console.log(data)
    //     this.displayData(data, fileExtension, baseUrl)
    //   }, err => {
    //     console.log(err['error']['text'])
    //     this.displayData(err['error']['text'], fileExtension, baseUrl)

    //   });
  }
  displayData(data, fileExtension, baseUrl) {
    console.log(data)
    if (
      fileExtension == fileExtensionType.GIF ||
      fileExtension == fileExtensionType.GIF.toUpperCase() ||
      fileExtension == fileExtensionType.JPEG ||
      fileExtension == fileExtensionType.JPG ||
      fileExtension == fileExtensionType.JPG.toUpperCase() ||
      fileExtension == fileExtensionType.PNG ||
      fileExtension == fileExtensionType.PNG.toUpperCase()
    ) {
      var blob = new Blob([data]);
      var url = URL.createObjectURL(blob);
      this.displayImage = this.dom.bypassSecurityTrustUrl(url);
      // this.openLg(this.contentimglg, 'xl');
      /**
       * to view image in new tab
       */

      var image = new Image();
      var body = document.createElement('body');
      image.src = url;
      if (image.height == image.width) {
        image.setAttribute(
          'style',
          'max-height:100vh;max-width:100vw;min-width:60vw;min-height:60vh'
        );
      } else if (image.width > image.height) {
        //3/2
        if (
          image.width / image.height >= 1.5 &&
          image.width / image.height < 1.7
        ) {
          image.setAttribute(
            'style',
            'max-height:80vh;max-width:120vw;min-width:60vw;min-height:40vh'
          );
        }
        //16/9
        else if (image.width / image.height >= 1.7) {
          image.setAttribute(
            'style',
            'max-height:90vh;max-width:160vw;min-width:80vw;min-height:45vh'
          );
        } else {
          image.setAttribute(
            'style',
            'max-height:70vh;max-width:110vw;min-width:50vw;min-height:30vh'
          );
        }
      } else if (image.height > image.width) {
        //3/2
        if (
          image.height / image.width >= 1.5 &&
          image.height / image.width < 1.7
        ) {
          image.setAttribute(
            'style',
            'max-height:120vh;max-width:80vw;min-width:40vw;min-height:60vh'
          );
        }
        //16/9
        else if (image.height / image.width >= 1.7) {
          image.setAttribute(
            'style',
            'max-height:160vh;max-width:90vw;min-width:45vw;min-height:80vh'
          );
        } else {
          image.setAttribute(
            'style',
            'max-height:110vh;max-width:70vw;min-width:30vw;min-height:50vh'
          );
        }
      }

      body.appendChild(image);
      var w = window.open('');
      w.document.write(body.outerHTML);
      w.document.close();
    } else if (
      fileExtension == fileExtensionType.PDF ||
      fileExtension == fileExtensionType.PDF.toUpperCase()
    ) {
      var blob = new Blob([data], { type: 'application/pdf' });
      var url = URL.createObjectURL(blob);
      this.displayPdf = this.dom.bypassSecurityTrustResourceUrl(url);
      var embed = document.createElement('embed');
      embed.src = url;
      embed.setAttribute('style', 'min-height:100%;min-width:100%;');
      var w = window.open('');
      w.document.write(embed.outerHTML);
      w.document.close();
      // this.openLg(this.contentpdflg, 'xl');
    } else {
      //  console.log(fileItem);
      var a = document.createElement('a');
      var blob = new Blob([data]);
      console.log(blob);
      a.href = window.URL.createObjectURL(blob);
      a.download = baseUrl
      a.click();
    }
  }
  withoutApiHit(fileExtension, baseUrl) {
    if (
      fileExtension == fileExtensionType.GIF ||
      fileExtension == fileExtensionType.GIF.toUpperCase() ||
      fileExtension == fileExtensionType.JPEG ||
      fileExtension == fileExtensionType.JPG ||
      fileExtension == fileExtensionType.JPG.toUpperCase() ||
      fileExtension == fileExtensionType.PNG ||
      fileExtension == fileExtensionType.PNG.toUpperCase()
    ) {
      // var blob = new Blob([data]);
      // var url = URL.createObjectURL(blob);
      // this.displayImage = this.dom.bypassSecurityTrustUrl(url);
      // this.openLg(this.contentimglg, 'xl');
      /**
       * to view image in new tab
       */

      var image = new Image();
      var body = document.createElement('body');
      image.src = environment.base_url + baseUrl;
      if (image.height == image.width) {
        image.setAttribute(
          'style',
          'max-height:100vh;max-width:100vw;min-width:60vw;min-height:60vh'
        );
      } else if (image.width > image.height) {
        //3/2
        if (
          image.width / image.height >= 1.5 &&
          image.width / image.height < 1.7
        ) {
          image.setAttribute(
            'style',
            'max-height:80vh;max-width:120vw;min-width:60vw;min-height:40vh'
          );
        }
        //16/9
        else if (image.width / image.height >= 1.7) {
          image.setAttribute(
            'style',
            'max-height:90vh;max-width:160vw;min-width:80vw;min-height:45vh'
          );
        } else {
          image.setAttribute(
            'style',
            'max-height:70vh;max-width:110vw;min-width:50vw;min-height:30vh'
          );
        }
      } else if (image.height > image.width) {
        //3/2
        if (
          image.height / image.width >= 1.5 &&
          image.height / image.width < 1.7
        ) {
          image.setAttribute(
            'style',
            'max-height:120vh;max-width:80vw;min-width:40vw;min-height:60vh'
          );
        }
        //16/9
        else if (image.height / image.width >= 1.7) {
          image.setAttribute(
            'style',
            'max-height:160vh;max-width:90vw;min-width:45vw;min-height:80vh'
          );
        } else {
          image.setAttribute(
            'style',
            'max-height:110vh;max-width:70vw;min-width:30vw;min-height:50vh'
          );
        }
      }

      body.appendChild(image);
      var w = window.open('');
      w.document.write(body.outerHTML);
      w.document.close();
    }else if (
      fileExtension == fileExtensionType.PDF ||
      fileExtension == fileExtensionType.PDF.toUpperCase()
    ) {
      // var blob = new Blob([data], { type: 'application/pdf' });
      // var url = URL.createObjectURL(blob);
      // this.displayPdf = this.dom.bypassSecurityTrustResourceUrl(url);
      var embed = document.createElement('embed');
      embed.src = environment.base_url+ baseUrl;
      embed.setAttribute('style', 'min-height:100%;min-width:100%;');
      var w = window.open('');
      w.document.write(embed.outerHTML);
      w.document.close();
      // this.openLg(this.contentpdflg, 'xl');
    } else {
      //  console.log(fileItem);
      var a = document.createElement('a');
      // var blob = new Blob([data]);
      // console.log(blob);
      // a.href = window.URL.createObjectURL(blob);
      a.download =  environment.base_url+ baseUrl
      a.click();
    }
  }

}
export enum fileExtensionType {
  PNG = 'png',
  JPEG = 'jpeg',
  JPG = 'jpg',
  GIF = 'gif',
  DOCX = 'docx',
  DOC = 'doc',
  PDF = 'pdf',
  PPT = 'ppt',
  PPTX = 'pptX',
  XLSX = 'xlsx',
  XLS = 'xls',
  ICO = 'ico',
}
