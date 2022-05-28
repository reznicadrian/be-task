import { PageOptionsDto } from '../common/pagination/page-options.dto';

export interface PaginationInterface {
  pageOptionsDto: PageOptionsDto;
  itemCount: number;
}
