import constant from "../../constant";

export type ChartAnnotationOption = {
  type: string;
  scaleID: string;
  mode: string;
  value: number;
  borderWidth: number;
  borderColor: string;
  label: {
    enabled: boolean;
    backgroundColor: string;
    fontSize: number;
    content: string;
  }
};

export type ChartAnnotationOptions = {
  annotation: {
    annotations: ChartAnnotationOption[]
  }
};

export type Annotations = {
  TEMPERATURE?: Annotation,
  HUMIDITY?: Annotation,
  CO2?: Annotation,
  LUX?: Annotation,
  PRESSURE?: Annotation,
  "COLOR TEMPERATURE": Annotation,
  SNACK?: Annotation
};

export type Annotation = {
  "LOWER LIMIT"?: number;
  "UPPER LIMIT"?: number;
  [propName: string]: number | undefined;
};

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
