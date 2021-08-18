import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NOTICE_GUESTS_BA, PROPERTY_STATUS } from 'src/app/constants/property.constant';
import { AlertService } from 'src/app/modules/alert/alert.service';
import { PROPERTY_LIST_ROUTE } from '../../constants/route.constant';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  propertyId: number;

  propertyListRoute = PROPERTY_LIST_ROUTE;
  propertyStatus = PROPERTY_STATUS;

  property: any;

  currentSlide = 0;

  propertyImages: { image_url }[] = [];

  amenityNormal = [];
  amenitySpace = [];
  amenitySafety = [];


  houseRules = [];

  guestNotice = NOTICE_GUESTS_BA;

  advanceNotice = NOTICE_GUESTS_BA;

  noOfBedrooms = 0;
  noOfBedroomArr = [];
  bedIds = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  groupBeds: {
    [key: string]: any[]
  } = {};

  constructor(
    private $activatedRoute: ActivatedRoute,
    private $alert: AlertService,
    private $propertyService: PropertyService
  ) { }

  ngOnInit(): void {
    this.$activatedRoute.params.subscribe(params => {
      this.propertyId = Number(params.id);
    });

    this.getProperty();
  }

  private getProperty(): void {
    this.$propertyService.getPropertyDetails(this.propertyId).subscribe(data => {
      this.property = data.data[0];
      this.propertyImages.push({ image_url: this.property.cover_photo });
      this.propertyImages.push(...this.property.images);

      this.amenityNormal = this.property?.amenities.filter(e => e.amenity_name.type === 'normal');
      this.amenitySafety = this.property?.amenities.filter(e => e.amenity_name.type === 'safety');
      this.amenitySpace = this.property?.amenities.filter(e => e.amenity_name.type === 'space');

      this.houseRules = this.property?.rules;

      this.noOfBedrooms = this.property?.no_of_bedrooms;

      console.log(this.property);

      this.onGroupBeds(this.property?.beds);
    });
  }


  private onGroupBeds(beds: any[]): void {
    beds.forEach(bed => {

      if (!this.groupBeds[bed.serial_number]) {
        this.noOfBedroomArr.push(bed.serial_number);
        this.groupBeds[bed.serial_number] = [bed];
      }
      else {
        this.groupBeds[bed.serial_number].push(bed);
      }
    });

    console.log(this.noOfBedroomArr);
    console.log(this.groupBeds);
  }

  checkBedExists(bedroomNo: number, bedId): number {
    const bedExist = this.groupBeds[bedroomNo].find(e => e.bed_type.id === bedId);
    if (bedExist) {
      return bedExist.count;
    }

    return 0;
  }

  navigateLeft(): void {
    if (this.currentSlide !== 0) {
      this.currentSlide = this.currentSlide - 1;
    }
    else {
      this.currentSlide = this.propertyImages.length - 1;
    }
  }

  navigateRight(): void {
    if (this.currentSlide !== this.propertyImages.length - 1) {
      this.currentSlide = this.currentSlide + 1;
    }
    else {
      this.currentSlide = 0;
    }
  }

  onAction(event): void {
    this.$propertyService.toggleStatusOfProperty(this.property?.uid).subscribe(data => {
      console.log(data);
    });
  }

}
