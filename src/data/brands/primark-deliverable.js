import primarkBase from './primark.js';
import primarkV2Run from './primark-v2-run.js';
import { buildWeatherMachineBrand } from '../weatherMachine.js';

const primarkDeliverable = buildWeatherMachineBrand(primarkBase, primarkV2Run);

export default primarkDeliverable;
