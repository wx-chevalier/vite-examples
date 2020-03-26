import { PickerTimeProps } from 'antd/es/date-picker/generatePicker';
import { Omit } from 'antd/es/_util/type';
import { Dayjs } from 'dayjs';
import * as React from 'react';

import { DatePicker } from './DatePicker';

export interface TimePickerProps
  extends Omit<PickerTimeProps<Dayjs>, 'picker'> {}

export const TimePicker = React.forwardRef<any, TimePickerProps>(
  (props, ref) => {
    return <DatePicker {...props} picker="time" mode={undefined} ref={ref} />;
  },
);

TimePicker.displayName = 'TimePicker';
