import {DatePipe} from "@angular/common";

export class DateUtils {
    private static datePipe: DatePipe = new DatePipe('en-US');
    public static DATETIME_FORMAT = 'dd/MM/yyyy HH:mm';
    public static VN_DATETIME_FORMAT = 'HH:mm dd/MM/yyyy';
    public static DATE_FORMAT = 'dd/MM/yyyy';
    public static TIME_FORMAT = 'HH:mm';

    public static format(date: Date, format?: string): string {
        if (!format) {
            format = this.VN_DATETIME_FORMAT;
        }
        return this.datePipe.transform(date, format);
    }
}
