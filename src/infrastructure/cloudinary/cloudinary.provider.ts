import { v2 } from 'cloudinary';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';

export const CloudinaryProvider = {
  provide: 'Cloudinary',
  inject: [EnvironmentConfigService],
  useFactory: (config: EnvironmentConfigService) => {
    return v2.config({
      cloud_name: config.getCloudinaryCloudName(),
      api_key: config.getCloudinaryApiKey(),
      api_secret: config.getCloudinaryApiSecret(),
    });
  },
};
