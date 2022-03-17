import { UploadEntity } from '../../models/upload-entity';

export interface UploadEntitiesResponse {
  per_page: number;
  current_page: number;
  last_page: number;
  total_records: number;
  uploads: UploadEntity[];
}
