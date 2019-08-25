import constant from "../../constant";

export type Annotations = {
  TEMPERATURE: {
    "LOWER LIMIT": number;
    "UPPER LIMIT": number;
  },
  HUMIDITY: {
    "LOWER LIMIT": number;
    "UPPER LIMIT": number;
  },
  CO2: { "UPPER LIMIT": number; },
  LUX: {
    "LOWER LIMIT": number;
    "UPPER LIMIT": number;
  },
  PRESSURE: { "LOWER LIMIT": number; },
  "COLOR TEMPERATURE": {
    "LOWER LIMIT": number;
    "UPPER LIMIT": number;
  },
  SNACK: { "LOWER LIMIT": number; }
}

const annotations: Annotations = {
  TEMPERATURE: {
    "LOWER LIMIT": constant.TEMP_LOWER_LIMIT,
    "UPPER LIMIT": constant.TEMP_UPPER_LIMIT
  },
  HUMIDITY: {
    "LOWER LIMIT": constant.HUM_LOWER_LIMIT,
    "UPPER LIMIT": constant.HUM_UPPER_LIMIT
  },
  CO2: { "UPPER LIMIT": constant.CO2_UPPER_LIMIT },
  LUX: {
    "LOWER LIMIT": constant.LUX_LOWER_LIMIT,
    "UPPER LIMIT": constant.LUX_UPPER_LIMIT
  },
  PRESSURE: { "LOWER LIMIT": constant.PRESSURE_LOWER_LIMIT },
  "COLOR TEMPERATURE": {
    "LOWER LIMIT": constant.COLOR_TEMP_LOWER_LIMIT,
    "UPPER LIMIT": constant.COLOR_TEMP_UPPER_LIMIT
  },
  SNACK: { "LOWER LIMIT": constant.SNACK_LOWER_LIMIT }
};

export default annotations;
