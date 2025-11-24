import axios from 'axios';
import { env } from '@/utils/env';

export default axios.create({
  baseURL: env('APP_API_URL'),
  headers: {
    'Content-type': 'application/json'
  }
});
