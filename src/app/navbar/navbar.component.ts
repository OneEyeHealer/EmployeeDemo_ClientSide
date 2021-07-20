import { Component, OnInit } from '@angular/core';
import { ExportService } from './../_service/export.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private exportService: ExportService) {}

  ngOnInit(): void {}
  isOpen = false;
  OnExportData = () => {
    this.exportService.onGet().subscribe(
      (response) => {
        console.log(response);
        this.DownloadExcelFile(
          response,
          'application/xlsx',
          `Data_export_${new Date().getTime()}.xlsx`
        );
      },
      (error) => {
        console.log(error);
      }
    );
  };
  DownloadExcelFile = (blob: any, type: string, fileName: string) => {
    const url = window.URL.createObjectURL(blob); // accessing the blob directly.
    // create invisible dom ele for working in all browsers.
    const anchor = document.createElement('a');
    anchor.setAttribute('style', 'display: none;');
    document.body.appendChild(anchor);

    // create file, attach to invisible ele and open invisible ele.
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    return url;
  };
}
